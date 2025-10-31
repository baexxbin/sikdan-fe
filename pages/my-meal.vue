<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useApi } from "~/composables/useApi";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { METHODS } from "http";

interface FoodItem {
  foodName: string;
  amount: string;
  nutrientType: string;
}

interface MealResponse {
  mealId: number;
  mealType: string;
  mealPhotoUrl?: string;
  description: string;
  foodItems: FoodItem[];
}

const meals = ref<MealResponse[]>([]);
const selectedDate = ref(new Date());

// 음식 추가 폼용 데이터
const newMealType = ref("BREAKFAST");
const foodItems = ref<FoodItem[]>([
  { foodName: "", amount: "", nutrientType: "" },
]);

// API 호출 함수
const fetchMeals = async (date: Date) => {
  const formatted = date.toISOString().split("T")[0]; // yyyy-mm-dd
  const { data } = await useApi<MealResponse[]>(`/api/meals?date=${formatted}`);
  meals.value = data.value || [];
};

// 식단 추가
const addMeal = async () => {
  const formatted = selectedDate.value.toISOString().split("T")[0];
  const payload = {
    mealDate: formatted,
    mealType: newMealType.value,
    foodItems: foodItems.value,
  };

  await useApi("/api/meals", {
    method: "POST",
    body: payload,
  });

  alert("식단이 등록되었습니다!");
  await fetchMeals(selectedDate.value);
  resetForm();
};

// 식단 수정
const editMeal = async (mealId: number) => {
  const updated = prompt("추가할 식단 내용을 입력하세요:");
  if (!updated) return;

  await useApi(`/api/meals/${mealId}`, {
    method: "PUT",
    body: { description: updated },
  });
  alert("식단이 수정되었습니다!");
  await fetchMeals(selectedDate.value);
};

// 식단 삭제
const deleteMeal = async (mealId: number) => {
  if (!confirm("정말 삭제하시겠습니까?")) return;

  await useApi(`/api/meals/${mealId}`, { METHODS: "DELETE" });
  alert("식단이 삭제되었습니다!");
  await fetchMeals(selectedDate.value);
};

// 음식 항목 추가
const addFoodItem = () => {
  foodItems.value.push({ foodName: "", amount: "", nutrientType: "" });
};

// 음식 항목 삭제
const removeFoodItem = (index: number) => {
  foodItems.value.splice(index, 1);
};

// 폼 초기화
const resetForm = () => {
  newMealType.value = "BREAKFAST";
  foodItems.value = [{ foodName: "", amount: "", nutrientType: "" }];
};

// 최초 마운트 시 오늘 식단 불러오기
onMounted(() => fetchMeals(selectedDate.value));

// 날짜 변경 시 마다 다시 요청
watch(selectedDate, (newDate) => fetchMeals(newDate));
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-semibold mb-4">🍱 나의 식단 기록</h1>

    <!-- 달력 -->
    <div class="mb-6">
      <Datepicker v-model="selectedDate" />
    </div>

    <!-- 식단 목록 -->
    <div v-if="meals.length > 0" class="space-y-4">
      <div
        v-for="meal in meals"
        :key="meal.mealId"
        class="p-4 rounded-lg shadow bg-white"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">{{ meal.mealType }}</span>
          <div>
            <button @click="editMeal(meal.mealId)" class="text-blue-500 mr-2">
              수정
            </button>
            <button @click="deleteMeal(meal.mealId)" class="text-red-500">
              삭제
            </button>
          </div>
        </div>

        <table class="w-full border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2">음식 이름</th>
              <th class="p-2">양</th>
              <th class="p-2">영양소</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in meal.foodItems" :key="idx">
              <td class="p-2">{{ item.foodName }}</td>
              <td class="p-2">{{ item.amount }}</td>
              <td class="p-2">{{ item.nutrientType }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="text-gray-500 text-center mt-6">
      선택한 날짜의 식단 기록이 없습니다 😢
    </div>

    <!-- 식단 추가 폼 -->
    <div class="mt-10 p-4 border rounded-lg bg-white">
      <h2 class="text-lg font-semibold mb-4">🍚 식단 추가</h2>

      <div class="mb-4">
        <label>식사 구분</label>
        <select v-model="newMealType" class="ml-2 border p-1">
          <option value="BREAKFAST">아침</option>
          <option value="LUNCH">점심</option>
          <option value="DINNER">저녁</option>
          <option value="SNACK">간식</option>
          <option value="LATE_NIGHT">야식</option>
        </select>
      </div>

      <div v-for="(item, index) in foodItems" :key="index" class="mb-3">
        <input
          v-model="item.foodName"
          placeholder="음식 이름"
          class="border p-1 mr-2"
        />
        <input v-model="item.amount" placeholder="양" class="border p-1 mr-2" />
        <input
          v-model="item.nutrientType"
          placeholder="영양소"
          class="border p-1 mr-2"
        />
        <button
          @click="removeFoodItem(index)"
          class="text-red-500"
          v-if="foodItems.length > 1"
        >
          삭제
        </button>
      </div>

      <button @click="addFoodItem" class="bg-gray-200 px-3 py-1 rounded mr-2">
        음식 추가
      </button>
      <button
        @click="addMeal"
        class="bg-green-500 text-white px-3 py-1 rounded"
      >
        등록
      </button>
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
}
</style>
