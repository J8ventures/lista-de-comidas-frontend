import { api } from './api';
import { Ingrediente, IngredienteCrear, GrupoNutricional } from '../types';

export const ingredientsService = {
  list: (grupo_nutricional?: GrupoNutricional) =>
    api
      .get<
        Ingrediente[]
      >('/ingredientes', { params: grupo_nutricional ? { grupo_nutricional } : {} })
      .then((r) => r.data),

  get: (id: string) => api.get<Ingrediente>(`/ingredientes/${id}`).then((r) => r.data),

  create: (data: IngredienteCrear) =>
    api.post<Ingrediente>('/ingredientes', data).then((r) => r.data),

  update: (id: string, data: Partial<IngredienteCrear>) =>
    api.put<Ingrediente>(`/ingredientes/${id}`, data).then((r) => r.data),

  delete: (id: string) => api.delete(`/ingredientes/${id}`),
};
