import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(process.cwd())
const src = resolve(root, 'dist', 'index.html')
const dst = resolve(root, 'dist', '404.html')

copyFileSync(src, dst)
console.log('Copied dist/index.html -> dist/404.html (SPA fallback)')
