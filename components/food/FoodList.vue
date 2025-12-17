<template>
  <div class="food-list">
    <FoodItemRow
      v-for="food in foods"
      :key="food.foodItemId"
      :food="food"
      @click="$emit('editFood', food)"
    />
    <FoodAddButton :mealRecordId="mealRecordId" />
  </div>
</template>

<script setup>
import FoodItemRow from "./FoodItemRow.vue";
import FoodAddButton from "./FoodAddButton.vue";
const props = defineProps({ foods: Array, mealRecordId: Number });
</script>
