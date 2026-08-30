import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Flip)
  if (!CustomEase.get('sb')) CustomEase.create('sb', '0.16, 1, 0.3, 1')
}

export const EASE = 'sb'
export const DUR = { enter: 1.0, micro: 0.32 } as const

export { gsap, ScrollTrigger, SplitText, CustomEase, Flip }
