/**
 * 전역 HTTP 클라이언트(Interceptor) 설정
 * fetch.create기반 토큰 자동 첨부 + 401처리 진행
 */

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie("accessToken");
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: "/api", // 프록시를 통해 백엔드로 전달 됨
    credentials: "include", // 쿠키 포함
    onRequest({ options }) {
      if (token.value) {
        options.headers = new Headers(options.headers || {});
        options.headers.set("Authorization", `Bearer ${token.value}`);
      }
    },
    onRequestError({ response }) {
      if (response?.status === 401) {
        navigateTo("/login");
      }
    },
  });

  return {
    provide: { api },
  };
});
