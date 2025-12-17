<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
  >
    <div class="bg-white rounded-lg p-6 w-[400px] shadow-lg">
      <h2 class="text-lg font-semibold mb-4">식단 수정</h2>

      <div class="mb-3">
        <label class="block text-sm font-medium mb-1">식사 시간</label>
        <input
          v-model="form.mealTime"
          class="border rounded px-3 py-2 w-full"
        />
      </div>

      <div class="mb-3">
        <label class="block text-sm font-medium mb-1">사진 URL</label>
        <input
          v-model="form.mealPhotoUrl"
          class="border rounded px-3 py-2 w-full"
        />
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button
          class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          @click="emit('close')"
        >
          취소
        </button>
        <button
          class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          @click="handleSubmit"
        >
          수정 완료
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { MealResponse, MealRequest } from "~/types/meal";
import { updateMealRecord } from "~/api/meal";

const props = defineProps<{
  meal: MealResponse;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "updated", updatedMeal: MealResponse): void;
}>();

/**
 *  수정용 form 상태
 *  - MealResponse -> MealRequest 형태로 변환
 **/
const form = ref<MealRequest>({
  mealDate: props.meal.mealDate,
  mealTime: props.meal.mealTime,
  memo: props.meal.memo,
  mealPhotoUrl: props.meal.mealPhotoUrl,
  foodItems: props.meal.foodItems.map((f) => ({
    foodName: f.foodName,
    amount: f.amount,
    nutrientType: f.nutrientType,
    sourceType: f.sourceType,
  })),
});

/**
 * props.meal 변경 시 form 동기화
 */
watch(
  () => props.meal,
  (newMeal) => {
    form.value = {
      mealDate: newMeal.mealDate,
      mealTime: newMeal.mealTime,
      memo: newMeal.memo,
      mealPhotoUrl: newMeal.mealPhotoUrl,
      foodItems: newMeal.foodItems.map((f) => ({
        foodName: f.foodName,
        amount: f.amount,
        nutrientType: f.nutrientType,
        sourceType: f.sourceType,
      })),
    };
  }
);

/**
 * 수정 요청
 */
const handleSubmit = async () => {
  try {
    const updatedMeal = await updateMealRecord(
      props.meal.mealRecordId,
      form.value
    );

    emit("updated", updatedMeal);
  } catch (err) {
    console.error("식단 수정 실패:", err);
  }
};
</script>
