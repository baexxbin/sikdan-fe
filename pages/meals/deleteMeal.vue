<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">식단 삭제</h2>
    <p>정말 이 식단을 삭제하시겠습니까?</p>
    <button @click="deleteMeal" class="bg-red-500 text-white p-2 rounded mt-4">
      삭제하기
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const { $api } = useNuxtApp();

const router = useRouter();
const route = useRoute();

const deleteMeal = async () => {
  const id = route.params.id;
  if (!confirm("정말 삭제하시겠습니까?")) return;

  try {
    await $api(`/meals/${id}`, { method: "DELETE" });
    alert("삭제 완료!");
    router.push("/my-meal");
  } catch (e) {
    console.error("삭제 실패", e);
  }
};
</script>
