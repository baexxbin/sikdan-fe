<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">
      {{ member?.nickname }}님의 식단 수정
    </h1>

    <!-- 날짜 선택 -->
    <div class="mb-4">
      <label for="date" class="mr-2 font-semibold">날짜 선택:</label>
      <VueDatePicker
        v-model="selectedDate"
        :format="'yyyy-MM-dd'"
        :enable-time-picker="false"
      />
    </div>

    <!-- 식단 목록 -->
    <div v-if="meals?.length" class="space-y-3">
      <MealCard
        v-for="meal in meals"
        :key="meal.mealRecordId"
        :meal="meal"
        @updateMeal="onMealUpdated"
        @editFood="onEditFood"
      />
    </div>
    <p v-else class="text-gray-500">해당 날짜의 식단이 없습니다.</p>

    <!-- 음식 수정 모달 (추후 구현 예정) -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { useNuxtApp } from "#app";
import { format } from "date-fns";
import { useRoute } from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import type { MealRecord, MealResponse } from "~/types/meal";
import { fetchMealRecordsByDate } from "~/api/meal";
import { useAuth } from "~/composables/useAuth";

import MealCard from "~/components/meal/MealCard.vue";

const { member, fetchUser } = useAuth();
const route = useRoute();

const selectedDate = ref<Date>(
  route.query.date ? new Date(route.query.date as string) : new Date()
);
const formattedDate = computed(() => format(selectedDate.value, "yyyy-MM-dd"));
const meals = ref<MealResponse[]>([]);

// 식단 불러오기
const loadMeals = async () => {
  try {
    const res = await fetchMealRecordsByDate(formattedDate.value);
    meals.value = res;
  } catch (err) {
    console.error("식단 불러오기 실패:", err);
  }
};

// 수정 후 다시 목록 갱신
const onMealUpdated = async () => {
  await loadMeals();
};

// 음식 수정 (아직 미구현)
const onEditFood = (food: any) => {
  console.log("음식 수정 클릭:", food);
};

onMounted(async () => {
  if (!member.value) await fetchUser();
  if (member.value) await loadMeals();
});

// 날짜 변경 시 자동 새로고침
watch(selectedDate, async () => {
  await loadMeals();
});
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>
