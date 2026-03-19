import { api } from './api';
import { MealPlan, MealPlanCreate, MealPlanEntry, MealPlanEntryCreate, GroceryList } from '../types';

export const mealPlansService = {
  list: () =>
    api.get<MealPlan[]>('/meal-plans').then(r => r.data),

  get: (id: string) =>
    api.get<MealPlan>(`/meal-plans/${id}`).then(r => r.data),

  create: (data: MealPlanCreate) =>
    api.post<MealPlan>('/meal-plans', data).then(r => r.data),

  update: (id: string, data: Partial<MealPlanCreate>) =>
    api.put<MealPlan>(`/meal-plans/${id}`, data).then(r => r.data),

  delete: (id: string) =>
    api.delete(`/meal-plans/${id}`),

  addEntry: (planId: string, entry: MealPlanEntryCreate) =>
    api.post<MealPlanEntry>(`/meal-plans/${planId}/entries`, entry).then(r => r.data),

  getMealList: (id: string) =>
    api.get<MealPlanEntry[]>(`/meal-plans/${id}/meal-list`).then(r => r.data),

  getGroceryList: (id: string) =>
    api.get<GroceryList>(`/meal-plans/${id}/grocery-list`).then(r => r.data),
};
