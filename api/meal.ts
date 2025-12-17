import {
  type MealRecord,
  type MealUpdate,
  type FoodUpdate,
  type MealResponse,
} from "../types/meal";

//
// 날짜 기준 식단 전체 조회 (MyMeal.vue에서 사용)
// GET /meals/my-meal?date=YYYY-MM-DD
//
export const fetchMealRecordsByDate = async (
  date: string
): Promise<MealResponse[]> => {
  const { $api } = useNuxtApp();
  return await $api<MealResponse[]>(`/meals/my-meal?date=${date}`);
};

// 날짜+mealTime으로 해당 식단의 ID 조회
// GET /meals/record-id?date=YYYY-MM-DD&mealTime=BREAKFAST
//
export const fetchMealRecordId = async (
  date: string,
  mealTime: string
): Promise<number | null> => {
  try {
    const data = await $fetch<{ mealRecordId: number }>(
      `/api/meals/record-id?date=${date}&mealTime=${mealTime}`,
      { method: "GET" }
    );
    return data.mealRecordId;
  } catch (error) {
    console.error("식단 ID 조회 실패:", error);
    return null;
  }
};

//
// 특정 식단 상세 조회 (수정 페이지 진입 시 사용)
// GET /meals/{mealRecordId}
//
export const getMealRecord = async (
  mealRecordId: number
): Promise<MealResponse> => {
  return await $fetch<MealResponse>(`/api/meals/${mealRecordId}`);
};

//
// 식단 수정
// PUT /meals/{mealRecordId}
//
export const updateMealRecord = async (
  mealRecordId: number,
  payload: Partial<MealResponse>
): Promise<MealResponse> => {
  return await $fetch<MealResponse>(`/api/meals/${mealRecordId}`, {
    method: "PUT",
    body: payload,
  });
};

//
// 식단 삭제
// DELETE /meals/{mealRecordId}
//
export const deleteMealRecord = async (mealRecordId: number): Promise<void> => {
  await $fetch(`/api/meals/${mealRecordId}`, {
    method: "DELETE",
  });
};

//
// 음식 수정
//
export const updateFoodRecord = async (
  foodItemId: number,
  payload: Partial<{
    foodName: string;
    nutrientType: string;
    amount: string;
  }>
): Promise<void> => {
  return await $fetch<void>(`/api/meals/food/${foodItemId}`, {
    method: "PUT",
    body: payload,
  });
};

/**
 * 날짜+사용자+MealTime별 식단 ID 리스트 조회
 */
export const fetchMealIdsByDate = async (date: string): Promise<number[]> => {
  return await $fetch<number[]>(`/api/meals/ids?date=${date}`, {
    method: "GET",
  });
};
