import { api } from './api';
import {
  PlanComida,
  PlanComidaCrear,
  EntradaPlanComida,
  EntradaPlanCrear,
  ListaCompras,
} from '../types';

export const mealPlansService = {
  list: () => api.get<PlanComida[]>('/planes-comida').then((r) => r.data),

  get: (id: string) => api.get<PlanComida>(`/planes-comida/${id}`).then((r) => r.data),

  create: (data: PlanComidaCrear) =>
    api.post<PlanComida>('/planes-comida', data).then((r) => r.data),

  update: (id: string, data: Partial<PlanComidaCrear>) =>
    api.put<PlanComida>(`/planes-comida/${id}`, data).then((r) => r.data),

  delete: (id: string) => api.delete(`/planes-comida/${id}`),

  addEntry: (idPlan: string, entrada: EntradaPlanCrear) =>
    api.post<EntradaPlanComida>(`/planes-comida/${idPlan}/entradas`, entrada).then((r) => r.data),

  getMealList: (id: string) =>
    api.get<EntradaPlanComida[]>(`/planes-comida/${id}/lista-comidas`).then((r) => r.data),

  getGroceryList: (id: string) =>
    api.get<ListaCompras>(`/planes-comida/${id}/lista-compras`).then((r) => r.data),
};
