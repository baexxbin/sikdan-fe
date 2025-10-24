import { useApi } from "./useApi";

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

export function useAuth() {
  // 로그인
  const login = async (payload: LoginRequest) => {
    const { data, error } = await useApi<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: payload,
    });

    if (error.value) throw error.value;

    // 토큰 쿠키 저장
    const accessToken = useCookie("access_token");
    accessToken.value = data.value?.accessToken;

    return data;
  };

  // 로그인
  const register = async (payload: RegisterRequest) => {
    const { data, error } = await useApi("/api/auth/register", {
      method: "POST",
      body: payload,
    });
    if (error.value) throw error.value;
    return data;
  };

  // 로그아웃
  const logout = () => {
    const token = useCookie("access_token");
    token.value = null;
  };

  return { login, register, logout };
}
