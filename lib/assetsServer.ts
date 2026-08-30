import 'server-only'
import fs from 'node:fs'
import path from 'node:path'

/** public/ 아래 실제 파일 존재 여부. 없으면 컴포넌트가 코드 생성 폴백으로 간다. */
export function hasAsset(publicPath: string): boolean {
  if (!publicPath.startsWith('/')) return false
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', publicPath.slice(1)))
  } catch {
    return false
  }
}
