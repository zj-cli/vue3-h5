import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => {
            return `vant/es/${name}/style`
          }
        }
      ]
    }),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: './',
  server: {
    host: '0.0.0.0',
    port: 4000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'xx',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/api', '/')
      }
    },
    overlay: false
  }
  // build: {
  //   outDir: ''
  // }
})
