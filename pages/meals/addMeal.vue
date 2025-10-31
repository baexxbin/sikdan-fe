<template>
  <div class="p-6 space-y-4">
    <h2 class="text-xl font-bold">식단 추가</h2>

    <select v-model="mealTime" class="border p-2 rounded">
      <option value="BREAKFAST">아침</option>
      <option value="LUNCH">점심</option>
      <option value="DINNER">저녁</option>
      <option value="SNACK">간식</option>
      <option value="LATE_NIGHT">야식</option>
    </select>

    <input
      v-model="memo"
      placeholder="메모"
      class="border p-2 w-full rounded"
    />
    <input
      v-model="mealPhotoUrl"
      placeholder="사진 URL"
      class="border p-2 w-full rounded"
    />

    <div
      v-for="(item, i) in foodItems"
      :key="i"
      class="border p-3 rounded space-y-2"
    >
      <input
        v-model="item.foodName"
        placeholder="음식명"
        class="border p-2 w-full"
      />
      <input
        v-model="item.amount"
        placeholder="양(예: 100g)"
        class="border p-2 w-full"
      />
      <select v-model="item.nutrientType" class="border p-2 w-full">
        <option value="CARB">탄수화물</option>
        <option value="PROTEIN">단백질</option>
        <option value="FAT">지방</option>
        <option value="VITAMIN">비타민</option>
        <option value="MINERAL">무기질</option>
      </select>
      <button @click="removeFoodItem(i)" class="text-red-500">삭제</button>
    </div>

    <button @click="addFoodItem" class="text-blue-600">+ 음식 추가</button>
    <button
      @click="submitMeal"
      class="bg-green-500 text-white p-2 rounded w-full"
    >
      저장
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "#vue-router";
import { MealTime, type NutrientType } from "~/types/enums";

const { $api } = useNuxtApp();
const router = useRouter();

const mealTime = ref<MealTime>("BREAKFAST" as MealTime);
const memo = ref("");
const mealPhotoUrl = ref("");
const foodItems = ref([
  { foodName: "", amount: "", nutrientType: "CARB" as NutrientType },
]);

const addFoodItem = () =>
  foodItems.value.push({
    foodName: "",
    amount: "",
    nutrientType: "CARB" as NutrientType,
  });

const removeFoodItem = (index: number) => foodItems.value.splice(index, 1);

const submitMeal = async () => {
  try {
    await $api("/meals", {
      method: "POST",
      body: {
        mealTime: mealTime.value,
        memo: memo.value,
        mealPhotoUrl: mealPhotoUrl.value,
        foodItems: foodItems.value,
      },
    });
    alert("식단이 등록되었습니다!");
    router.push("/my-meal");
  } catch (e) {
    console.error("식단 등록 실패", e);
  }
};
</script>
