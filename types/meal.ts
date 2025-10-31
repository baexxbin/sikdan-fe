import { MealTime, NutrientType } from "./enums";

export interface FoodItem {
  foodName: string;
  amount: string;
  nutrientType: NutrientType;
  sourceType: string;
}

export interface MealResponse {
  mealRecordId: number;
  mealDate: string;
  mealTime: MealTime;
  memo: string | null;
  mealPhotoUrl?: string | null;
  foodItems: FoodItem[] | null;
}
