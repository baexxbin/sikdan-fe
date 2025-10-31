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

// 입력값 저장용 반응형 변수 선언
const email = ref("");
const password = ref("");
const router = useRouter();

// useAuth에서 login 함수 불러오기
const { login } = useAuth();

// 로그인 함수 정의
const onLogin = async () => {
  try {
    await login({ email: email.value, password: password.value });
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
