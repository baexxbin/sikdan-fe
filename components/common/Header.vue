<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
import { useMember } from "~/composables/useMember";
import { useRouter } from "vue-router";

const { logout } = useAuth();
const member = useMember();
const router = useRouter();

const onLogout = () => {
  logout();
  router.push("/login");
};
</script>

<template>
  <header class="flex justify-between items-center p-4 bg-gray-100">
    <div v-if="member && member.nickname">
      <span>{{ member.nickname }}님</span>
      <button @click="onLogout" class="ml-2 text-red-500">로그아웃</button>
    </div>
  </header>
</template>
