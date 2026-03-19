import { api } from './api';
import { Recipe, RecipeCreate } from '../types';

export const recipesService = {
  list: (params?: { ingredient_id?: string; nutritional_group?: string }) =>
    api.get<Recipe[]>('/recipes', { params }).then(r => r.data),

  get: (id: string) =>
    api.get<Recipe>(`/recipes/${id}`).then(r => r.data),

  create: (data: RecipeCreate) =>
    api.post<Recipe>('/recipes', data).then(r => r.data),

  update: (id: string, data: Partial<RecipeCreate>) =>
    api.put<Recipe>(`/recipes/${id}`, data).then(r => r.data),

  delete: (id: string) =>
    api.delete(`/recipes/${id}`),
};
