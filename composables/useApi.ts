// 백엔드와 통신하는 공통 함수 역할
// 모든 API 호출을 공통적으로 처리하는 유틸리티: SSR 데이터용

import { ref, watchEffect, type Ref } from "vue";

/**
 * useApi: useFetch 래퍼
 * @param url - 호출할 엔드포인트
 * @param options - useFetch 옵션
 * @param fallback - data가 없을 경우 사용할 기본값 (기본 null)
 * @returns { data: Ref<T | null>, error: Ref<any> }
 */

export async function useApi<T = any>(
  url: string,
  options: any = {},
  fallback: T | null = null
) {
  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // JWT 토큰 쿠키에서 가져오기
  const token = useCookie("access_token")?.value;

  // useFetch 호출 (반환: { data: Ref<T | null | undefined>, error: Ref<any>, ... })
  const res = await useFetch<T>(url, {
    baseURL,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    ...options,
  });

  // 안전한 ref를 만들어 초기값(fallback) 할당
  const safeData = ref<T | null>(null);
  safeData.value = fallback;

  // useFetch의 data가 변경되면 safeData를 갱신
  watchEffect(() => {
    // data는 Ref<T | null | undefined> 일 수 있으므로 명시적으로 처리
    safeData.value = (res.data?.value ?? fallback) as T | null;
  });

  return {
    data: safeData,
    error: res.error,
  };
}
