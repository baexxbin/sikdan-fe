import { MealTime, NutrientType } from "./enums";

// export interface FoodItem {
//   foodName: string;
//   amount: string;
//   nutrientType: NutrientType;
//   sourceType: string;
// }

// export interface MealResponse {
//   mealRecordId: number;
//   mealDate: string;
//   mealTime: MealTime;
//   memo: string | null;
//   mealPhotoUrl?: string | null;
//   foodItems: FoodItem[] | null;
// }

// 요청용 DTO
export interface FoodItemRequest {
  foodName: string;
  amount: number;
  nutrientType: NutrientType;
  sourceType: string;
}

export interface MealRequest {
  mealDate: string;
  mealTime: MealTime;
  memo?: string;
  mealPhotoUrl?: string;
  foodItems: FoodItemRequest[];
}

// 응답용 DTO
export interface FoodItemResponse extends FoodItemRequest {
  foodItemId: number;
}

export interface MealResponse extends MealRequest {
  mealRecordId: number;
  createdAt: string;
  foodItems: FoodItemResponse[];
}

export interface FoodItem {
  foodItemId: number;
  mealRecorId: number;
  foodName: string;
  amount: string;
  nutrientType: string;
  sourceType?: string;
  createdAt: string;
}

export interface MealRecord {
  mealRecordId: number;
  memberId: number;
  mealDate: string; // ISO 형식 e.g. "2025-11-04"
  mealTime: string;
  memo?: string | null;
  mealPhotoUrl?: string | null;
  foodItems: FoodItem[];
  createdAt: string;
}

export interface MealUpdate {
  memo?: string | null;
  mealPhotoUrl?: string | null;
  mealDate?: string;
  mealTime?: MealTime;
}

export interface FoodUpdate {
  foodName?: string;
  amount?: string;
  nutrientType?: string;
  sourceType?: string;
}
