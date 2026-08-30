/**
 * Web Audio 합성 사운드.
 * 오디오 파일 없이 노이즈 버스트 + 밴드패스로 사각거림을 만든다.
 * 외부 오디오 URL 금지. 기본 OFF — 최초 클릭에서만 AudioContext를 만든다.
 */

type Ctx = { ac: AudioContext; master: GainNode; noise: AudioBuffer }

let ctx: Ctx | null = null

function makeNoise(ac: AudioContext): AudioBuffer {
  const len = Math.floor(ac.sampleRate * 0.6)
  const buf = ac.createBuffer(1, len, ac.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
  return buf
}

export function ensureAudio(): Ctx | null {
  if (typeof window === 'undefined') return null
  if (ctx) return ctx
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  const ac = new AC()
  const master = ac.createGain()
  master.gain.value = 0
  master.connect(ac.destination)
  ctx = { ac, master, noise: makeNoise(ac) }
  return ctx
}

export function setMuted(muted: boolean) {
  const c = ctx
  if (!c) return
  c.ac.resume().catch(() => {})
  c.master.gain.cancelScheduledValues(c.ac.currentTime)
  c.master.gain.linearRampToValueAtTime(muted ? 0 : 0.22, c.ac.currentTime + 0.25)
}

type BurstOpts = { freq?: number; q?: number; dur?: number; gain?: number; rate?: number }

/** 노이즈 버스트 한 번 — 사각거림/틱/후시 전부 여기서 파생된다 */
export function burst({ freq = 2400, q = 3, dur = 0.14, gain = 0.5, rate = 1 }: BurstOpts = {}) {
  const c = ctx
  if (!c) return
  const src = c.ac.createBufferSource()
  src.buffer = c.noise
  src.playbackRate.value = rate
  const bp = c.ac.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = freq
  bp.Q.value = q
  const g = c.ac.createGain()
  const t = c.ac.currentTime
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(gain, t + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(bp).connect(g).connect(c.master)
  src.start(t)
  src.stop(t + dur + 0.05)
}

export const tick = () => burst({ freq: 3200, q: 6, dur: 0.06, gain: 0.35 })
export const click = () => burst({ freq: 1600, q: 2.5, dur: 0.12, gain: 0.5 })
export const whoosh = () => burst({ freq: 700, q: 0.8, dur: 0.5, gain: 0.32, rate: 0.7 })

/** 스크롤 속도에 비례해 사각거림의 playbackRate·게인을 변조한다 */
export function scrollRustle(velocity: number) {
  const v = Math.min(Math.abs(velocity) / 2500, 1)
  if (v < 0.06) return
  burst({
    freq: 2000 + v * 1800,
    q: 1.6,
    dur: 0.1 + v * 0.1,
    gain: 0.08 + v * 0.18,
    rate: 0.85 + v * 0.4, // 0.85 ~ 1.25
  })
}
