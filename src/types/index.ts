export type NutritionalGroup =
  | 'PROTEINS' | 'CARBOHYDRATES' | 'VEGETABLES' | 'FRUITS'
  | 'DAIRY' | 'FATS' | 'LEGUMES' | 'GRAINS' | 'OTHER';

export type IngredientRole = 'required' | 'replaceable' | 'optional';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type PlanType = 'weekly' | 'biweekly';

export interface Ingredient {
  id: string;
  name: string;
  nutritional_group: NutritionalGroup;
  unit: string;
  created_at?: string;
  updated_at?: string;
}

export interface Alternative {
  ingredient_id: string;
  ingredient?: Ingredient;
  quantity: number;
  unit: string;
}

export interface RecipeIngredient {
  ingredient_id: string;
  ingredient?: Ingredient;
  role: IngredientRole;
  quantity: number;
  unit: string;
  alternatives: Alternative[];
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  servings: number;
  prep_time: number;
  cook_time: number;
  ingredients?: RecipeIngredient[];
  created_at?: string;
  updated_at?: string;
}

export interface MealPlanEntry {
  id: string;
  date: string;
  meal_type: MealType;
  recipe_id: string;
  recipe?: Recipe;
  selected_ingredients: Record<string, string>;
}

export interface MealPlan {
  id: string;
  name: string;
  type: PlanType;
  start_date: string;
  end_date: string;
  entries?: MealPlanEntry[];
  created_at?: string;
  updated_at?: string;
}

export interface GroceryItem {
  ingredient: Ingredient;
  quantity: number;
  unit: string;
}

export interface GroceryList {
  required: GroceryItem[];
  optional: GroceryItem[];
}

export interface IngredientCreate {
  name: string;
  nutritional_group: NutritionalGroup;
  unit: string;
}

export interface RecipeIngredientCreate {
  ingredient_id: string;
  role: IngredientRole;
  quantity: number;
  unit: string;
  alternatives: { ingredient_id: string; quantity: number; unit: string }[];
}

export interface RecipeCreate {
  name: string;
  description?: string;
  servings?: number;
  prep_time?: number;
  cook_time?: number;
  ingredients?: RecipeIngredientCreate[];
}

export interface MealPlanEntryCreate {
  date: string;
  meal_type: MealType;
  recipe_id: string;
  selected_ingredients?: Record<string, string>;
}

export interface MealPlanCreate {
  name: string;
  type: PlanType;
  start_date: string;
  end_date: string;
  entries?: MealPlanEntryCreate[];
}
