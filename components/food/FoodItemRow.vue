<template>
  <div class="food-row hover:bg-gray-100 cursor-pointer">
    <span>{{ food.foodName }}</span>
    <span>{{ food.amount }}</span>
  </div>
</template>

<script setup>
const props = defineProps({ food: Object });
</script>
