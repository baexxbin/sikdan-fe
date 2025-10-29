import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useCookie } from "#app";

export default defineNuxtRouteMiddleware((to) => {
  const accessToken = useCookie("access_token");

  // 인증 불필요한 공개 페이지
  const publicPaths = ["/login", "register", "/"];

  // public 경로시 통과
  if (publicPaths.includes(to.path)) return;

  // 인증 필요한 페이지인데 토큰이 없을 경우
  if (!accessToken.value) {
    console.warn("인증되지 않은 접근: ", to.path);
    return navigateTo("/login");
  }
});
