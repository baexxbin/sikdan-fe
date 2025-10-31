<template>
  <div v-if="meal" class="p-6 space-y-3">
    <h2 class="text-xl font-bold">식단 수정</h2>

    <input
      v-model="meal.memo"
      placeholder="메모"
      class="border p-2 w-full rounded"
    />

    <div
      v-for="(item, i) in meal.foodItems"
      :key="i"
      class="border p-3 rounded space-y-2"
    >
      <input v-model="item.foodName" class="border p-2 w-full" />
      <input v-model="item.amount" class="border p-2 w-full" />
      <select v-model="item.nutrientType" class="border p-2 w-full">
        <option value="CARB">탄수화물</option>
        <option value="PROTEIN">단백질</option>
        <option value="FAT">지방</option>
        <option value="VITAMIN">비타민</option>
        <option value="MINERAL">무기질</option>
      </select>
    </div>

    <button
      @click="updateMeal"
      class="bg-blue-500 text-white p-2 rounded w-full"
    >
      수정 완료
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { MealResponse } from "~/types/meal";

const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const meal = ref<MealResponse | null>(null);

const loadMeal = async () => {
  const id = route.params.id;
  const res = await $api<MealResponse>(`/meals/${id}`);
  meal.value = res;
};

onMounted(loadMeal);

const updateMeal = async () => {
  try {
    await $api(`/meals/${meal.value?.mealRecordId}`, {
      method: "PUT",
      body: meal.value,
    });
    alert("식단이 수정되었습니다!");
    router.push("my-meal");
  } catch (e) {
    console.error("식단 수정 실패", e);
  }
};
</script>
