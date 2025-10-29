<template>
  <div class="login-page">
    <h1>로그인</h1>
    <form @submit.prevent="onLogin">
      <label>
        이메일
        <input v-model="email" type="email" required />
      </label>

      <label>
        비밀번호
        <input v-model="password" type="password" required />
      </label>

      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";
import { useMember } from "~/composables/useMember";
import type { LoginMemberInfoResponse } from "~/types/member";

// 입력값 저장용 반응형 변수 선언
const email = ref("");
const password = ref("");
const router = useRouter();

// useAuth에서 login 함수 불러오기
const { login } = useAuth();
const member = useMember();

// 로그인 함수 정의
const onLogin = async () => {
  try {
    // 1. 로그인 요청 -> JWT토큰 발급
    const loginResponse = await login({
      email: email.value,
      password: password.value,
    });

    // 2. 토큰으로 현재 로그인 유저 정보 조회
    const data = await $fetch<LoginMemberInfoResponse>("/api/member/me", {
      headers: { Authorization: `Bearer ${loginResponse.accessToken}` },
    });

    // 3. 유저 정보 전역 상태로 저장
    member.value = data;

    // 4. 홈으로 이동
    router.push("/");
  } catch (err) {
    console.error("로그인 실패:", err);
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
