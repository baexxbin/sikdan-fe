// 전역 사용자 상태 관리
// const member = useMember();로 접근해 로그인 유저 상태 공유 가능

import type { LoginMemberInfoResponse } from "~/types/member";

export const useMember = () =>
  useState<LoginMemberInfoResponse | null>("member", () => null);
