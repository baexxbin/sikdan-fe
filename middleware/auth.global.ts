import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useCookie } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  const member = useState("member");
  const accessToken = useCookie("accessToken");

  // 인증 불필요한 공개 페이지
  const publicPaths = ["/login", "register", "/"];

  // public 경로시 통과
  if (publicPaths.includes(to.path)) return;

  // 인증 필요한 페이지인데 토큰이 없을 경우
  if (!accessToken.value) {
    console.warn("인증되지 않은 접근: ", to.path);
    return navigateTo("/login");
  }

  // 로그인 안 한 상태에서 보호된 페이지 접근 시 로그인 페이지로 이동
  if (!member.value && !accessToken.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});
