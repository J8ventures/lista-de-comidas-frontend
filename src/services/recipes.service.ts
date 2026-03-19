import { api } from './api';
import { Receta, RecetaCrear } from '../types';

export const recipesService = {
  list: (params?: { id_ingrediente?: string; grupo_nutricional?: string }) =>
    api.get<Receta[]>('/recetas', { params }).then(r => r.data),

  get: (id: string) =>
    api.get<Receta>(`/recetas/${id}`).then(r => r.data),

  create: (data: RecetaCrear) =>
    api.post<Receta>('/recetas', data).then(r => r.data),

  update: (id: string, data: Partial<RecetaCrear>) =>
    api.put<Receta>(`/recetas/${id}`, data).then(r => r.data),

  delete: (id: string) =>
    api.delete(`/recetas/${id}`),
};
