import { api } from './api';
import { Ingredient, IngredientCreate, NutritionalGroup } from '../types';

export const ingredientsService = {
  list: (nutritional_group?: NutritionalGroup) =>
    api.get<Ingredient[]>('/ingredients', { params: nutritional_group ? { nutritional_group } : {} }).then(r => r.data),

  get: (id: string) =>
    api.get<Ingredient>(`/ingredients/${id}`).then(r => r.data),

  create: (data: IngredientCreate) =>
    api.post<Ingredient>('/ingredients', data).then(r => r.data),

  update: (id: string, data: Partial<IngredientCreate>) =>
    api.put<Ingredient>(`/ingredients/${id}`, data).then(r => r.data),

  delete: (id: string) =>
    api.delete(`/ingredients/${id}`),
};
