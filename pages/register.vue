<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";

const email = ref("");
const password = ref("");
const nickname = ref("");
const memberName = ref("");
const { register } = useAuth();

const onRegister = async () => {
  try {
    await register({
      email: email.value,
      password: password.value,
      nickname: nickname.value,
      memberName: memberName.value,
    });
  } catch (err) {
    console.error("회원가입 실패:", err);
  }
};
</script>

<template>
  <div class="register-container">
    <h2>회원가입</h2>
    <input v-model="email" placeholder="이메일" />
    <input v-model="password" placeholder="비밀번호" type="password" />
    <input v-model="nickname" placeholder="닉네임" />
    <input v-model="memberName" placeholder="이름" />
    <button @click="onRegister">가입하기</button>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
