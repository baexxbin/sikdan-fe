// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    strict: true,
    shim: false
  },
  // Nitro/Vite proxy 설정(로컬 개발 시 CORS 회피)
  nitro: {
    devProxy: {
      // 서버사이드에서 useFetch 등으로 /api 호출 시 프록시
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  vite: {
    server: {
      // 브라우저에서 직접 호출할 경우 프록시
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
          // pathRewrite: {'^/api' : '/api'} // 필요 시
        }
      }
    }
  },
  // 편의: 전역 css, 플러그인, 모듈 등 추가
  css: [],
  modules: [
    // 예: '@pinia/nuxt' 등 필요 시 추가
  ],
  // 런타임에 자동 생성되는 타입을 쓰려면 필요 시 설정 추가
})
