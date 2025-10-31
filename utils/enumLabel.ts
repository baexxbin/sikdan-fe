import { MealTime, NutrientType } from "~/types/enums";

export const mealTimeLabels: Record<MealTime, string> = {
  [MealTime.BREAKFAST]: "아침",
  [MealTime.LUNCH]: "점심",
  [MealTime.DINNER]: "저녁",
  [MealTime.SNACK]: "간식",
  [MealTime.LATE_NIGHT]: "야식",
};

export const nutrientLabels: Record<NutrientType, string> = {
  [NutrientType.CARB]: "탄수화물",
  [NutrientType.PROTEIN]: "단백질",
  [NutrientType.FAT]: "지방",
  [NutrientType.VITAMIN]: "비타민",
  [NutrientType.MINERAL]: "무기질",
};
