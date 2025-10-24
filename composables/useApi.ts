// 모든 API 호출을 공통적으로 처리하는 유틸리티

export function useApi<T>(url: string, options: any = {}) {
  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // JWT 토큰을 예시로 포함 (필요 없으면 생략 가능)
  const token = useCookie("access_token")?.value;

  return useFetch<T>(url, {
    baseURL,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options, // method, body 등 필요 시 덮어쓰기
  });
}
