import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const { resolve } = require('path'); //vite 不支持require
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
     outDir: 'lib',
     lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'Walm',
      fileName: 'walm',
     },
     rollupOptions: {
       external:['vue'],
       output: {
        globals: {
          vue: 'Vue'
        }
       }
     }
  }
})
