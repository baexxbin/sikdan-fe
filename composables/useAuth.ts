// 로그인 상태 관리

import { useState } from "#app";

import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  LoginMemberInfoResponse,
} from "~/types/auth";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const member = useMember(); // 전역 상태 사용자 (useState기반)
  const accessToken = useCookie("accessToken", {
    maxAge: 60 * 60 * 1,
    sameSite: "lax",
    path: "/",
  }); // JWT 저장용 쿠키

  /**
   * 로그인
   * - 로그인 요청 후 토큰 쿠키에 저장
   * - 사용자 정보(fetchUser) 즉시 갱신
   */
  const login = async (payload: { email: string; password: string }) => {
    try {
      // 1. 로그인 요청
      const data = await $api<{ accessToken: string }>("/auth/login", {
        method: "POST",
        body: payload,
      });

      // 2. 토큰 쿠키 저장
      accessToken.value = data.accessToken;

      // 3. 로그인된 사용자 정보 불러오기
      await fetchUser();
    } catch (err: any) {
      console.error("로그인 실패: ", err);
      throw err;
    }
  };

  /**
   * 사용자 정보 조회
   * - 로그인 후 사용자 정보 전역 상태로 저장
   * - 토큰이 없으면 null 처리
   */
  const fetchUser = async () => {
    if (!accessToken.value) {
      member.value = null;
      return;
    }

    try {
      const res = await $api<{ nickname: string }>("/member/me");
      member.value = res;
    } catch (err: any) {
      console.warn("사용자 정보 불러오기 실패:", err);
      member.value = null;

      // 인증 실패 시 쿠키 초기화, 로그인 페이지로 이동
      if (err?.status === 401) {
        accessToken.value = null;
        navigateTo("/login");
      }
    }
  };

  // 회원가입
  const register = async (payload: {
    memberName: string;
    email: string;
    password: string;
    nickname: string;
  }) => {
    try {
      // 1. 회원가입 요청
      await $api("/auth/register", {
        method: "POST",
        body: payload,
      });

      // 2. 회원가입 후 바로 로그인 처리
      await login({ email: payload.email, password: payload.password });
    } catch (err: any) {
      console.error("회원가입 실패:", err);
      throw err;
    }
  };

  // 로그아웃
  // - 쿠키와 전역 상태 초기화
  const logout = () => {
    accessToken.value = null;
    member.value = null;

    navigateTo("/login");
  };

  /**
   * 앱 처음 로드시 자동 로그인 복구
   * - 새로고침  시 쿠키에 남은 토큰 기반으로 복구
   */
  onNuxtReady(async () => {
    if (accessToken.value && !member.value) {
      await fetchUser();
    }
  });

  return { member, login, fetchUser, register, logout };
};
