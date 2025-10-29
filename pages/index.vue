<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">
      {{ member?.nickname }}님, 오늘의 식단 👇
    </h1>

    <div v-if="meals?.length">
      <ul>
        <li v-for="meal in meals" :key="meal.mealId" class="mb-2">
          🍽️ {{ meal.mealType }} - {{ meal.description }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>아직 등록된 식단이 없습니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/useApi";

const member = ref<{ nickname: string } | null>(null);
const meals = ref<any[]>([]);

onMounted(async () => {
  try {
    // 사용자 정보 불러오기
    const { data: me } = await useApi<{ nickname: string }>("/api/member/me");
    member.value = me.value;

    // 오늘의 식단 불러오기
    const { data: todayMeals } = await useApi<any[]>(
      "/api/meals/today",
      {},
      []
    );
    meals.value = todayMeals.value ?? [];
  } catch (err) {
    console.error("데이터 로드 실패: ", err);
  }
});
</script>
