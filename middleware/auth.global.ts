import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useCookie } from "#app";

export default defineNuxtRouteMiddleware((to) => {
  // 로그인 없이 접근 가능한 경로 목록
  const publicPaths = ["/login", "register", "/"];

  // public 경로시 통과
  if (publicPaths.includes(to.path)) return;

  // 쿠키에서 토큰 확인
  const token = useCookie("access_token").value;

  // 토큰 없으면 로그인 페이지로 이동
  if (!token) {
    return navigateTo("/login");
  }
});
