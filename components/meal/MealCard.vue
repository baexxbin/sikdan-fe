<template>
  <div
    class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
  >
    <div class="flex justify-between items-center mb-2">
      <div>
        <p class="font-semibold">{{ meal.mealTime }}</p>
        <p class="text-sm text-gray-500">{{ meal.mealDate }}</p>
      </div>

      <button @click="openEditModal">수정</button>
    </div>

    <div v-if="meal.mealPhotoUrl" class="mb-2">
      <img :src="meal.mealPhotoUrl" alt="사진" class="w-full rounded" />
    </div>

    <p class="mb-4">{{ meal.memo || "메모 없음" }}</p>

    <div>
      <h4 class="font-medium mb-1">음식 목록</h4>
      <ul class="space-y-1">
        <li
          v-for="food in meal.foodItems"
          :key="food.foodItemId"
          class="cursor-pointer hover:bg-gray-100 p-2"
          @click="onEditFood(food)"
        >
          🍽️ {{ food.foodName }} — {{ food.amount }}
        </li>
      </ul>
    </div>

    <MealEditModal
      v-if="isModalOpen"
      :meal="meal"
      @close="closeEditModal"
      @updated="onUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MealResponse, FoodItemResponse } from "~/types/meal";
import MealEditModal from "./MealEditModal.vue";

const props = defineProps<{
  meal: MealResponse;
}>();

const emits = defineEmits<{
  (e: "updateMeal", updated: MealResponse): void;
  (e: "editFood", food: FoodItemResponse): void;
}>();

const isModalOpen = ref(false);

const openEditModal = () => {
  isModalOpen.value = true;
};

const closeEditModal = () => {
  isModalOpen.value = false;
};

const onUpdated = (updatedMeal: MealResponse) => {
  emits("updateMeal", updatedMeal);
  isModalOpen.value = false;
};

const onEditFood = (food: FoodItemResponse) => {
  emits("editFood", food);
};
</script>
