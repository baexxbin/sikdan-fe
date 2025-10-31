<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">
      {{ member?.nickname }}님의 식단 기록
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
      <div
        v-for="meal in meals"
        :key="meal.mealRecordId"
        class="border p-3 rounded shadow-sm"
      >
        <strong>{{ meal.mealTime }}</strong> — {{ meal.memo || "메모 없음" }}
        <img
          v-if="meal.mealPhotoUrl"
          :src="meal.mealPhotoUrl"
          alt="식단 이미지"
          class="mt-2 rounded-lg max-h-48 object-cover"
        />

        <ul class="mt-2 list-disc list-inside text-sm text-gray-600">
          <li v-for="food in meal.foodItems" :key="food.foodName">
            {{ food.foodName }} ({{ nutrientLabels[food.nutrientType] }}) -
            {{ food.amount }}
          </li>
        </ul>
      </div>
    </div>
    <p v-else class="text-gray-500">등록된 식단이 없습니다.</p>

    <!-- 버튼 영역 -->
    <div class="mt-6 flex gap-3">
      <NuxtLink
        :to="`/meals/addMeal?date=${selectedDate}`"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ➕ 식단 추가
      </NuxtLink>
      <NuxtLink
        :to="`/meals/editMeal?date=${selectedDate}`"
        class="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        ✏️ 식단 수정
      </NuxtLink>
      <NuxtLink
        :to="`/meals/deleteMeal?date=${selectedDate}`"
        class="bg-red-500 text-white px-4 py-2 rounded"
      >
        🗑️ 식단 삭제
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useNuxtApp } from "#app";
import { format } from "date-fns"; // 날짜 포맷용 유틸
import type { MealResponse } from "~/types/meal";
import { mealTimeLabels, nutrientLabels } from "~/utils/enumLabel";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const { $api } = useNuxtApp();

const selectedDate = ref(new Date()); // 초기값: 오늘 날짜
const meals = ref<MealResponse[]>([]);
const member = useMember();

// 날짜 포맷 변환 함수
const formatDate = (date: Date) => format(date, "yyy-MM-dd");

// 컴포넌트 마운트 시 사용자 정보 가져오기
onMounted(async () => {
  await loadMeals();
});

// 식단 불러오기
const loadMeals = async () => {
  try {
    const formattedDate = formatDate(selectedDate.value);
    const res = await $api<MealResponse[]>(
      `/meals/my-meal?date=${formattedDate}`
    );
    meals.value = res;
  } catch (e: any) {
    console.error("식단 로드 실패", e);
  }
};

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
