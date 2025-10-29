import type { LoginMemberInfoResponse } from "~/types/member";

export const useMember = () =>
  useState<LoginMemberInfoResponse | null>("member", () => null);
