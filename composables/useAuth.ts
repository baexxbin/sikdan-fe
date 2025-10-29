import { useApi } from "./useApi";
import { useMember } from "./useMember";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
  memberName: string;
}

interface LoginMemberInfoResponse {
  nickname: string;
}

export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.apiBase as string; // 명시적으로 타입 단언
  const member = useMember();

  // 로그인
  const login = async (payload: LoginRequest) => {
    try {
      // 1. 로그인 요청
      const data = await $fetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: payload,
        baseURL, // http://localhost:8000
      });

      // 2. 토큰 쿠키 저장
      const accessToken = useCookie("access_token");
      accessToken.value = data.accessToken;

      // 3. 로그인 유저 정보 조회
      const userData = await $fetch<LoginMemberInfoResponse>("/api/member/me", {
        headers: { Authorization: `Bearer ${data.accessToken}` },
        baseURL,
      });

      // 4. 전역 유저 상태 저장
      member.value = userData;

      return data;
    } catch (err: any) {
      console.error("로그인 실패: ", err);
      throw err;
    }
  };

  // 회원가입
  const register = async (payload: RegisterRequest) => {
    try {
      const data = await $fetch("/api/auth/register", {
        method: "POST",
        body: payload,
        baseURL,
      });
      return data;
    } catch (err: any) {
      console.error("회원가입 실패: ", err);
      throw err;
    }
  };

  // 로그아웃
  const logout = () => {
    const token = useCookie("access_token");
    token.value = null;

    // 전역 유저 정보 초기화
    const member = useMember();
    member.value = null;
  };

  return { login, register, logout };
};
