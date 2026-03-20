import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './api';
import { mealPlansService } from './meal-plans.service';
import type {
  PlanComida,
  PlanComidaCrear,
  EntradaPlanComida,
  EntradaPlanCrear,
  ListaCompras,
} from '../types';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockPlan: PlanComida = {
  id: 'plan-1',
  nombre: 'Plan Semanal',
  tipo: 'semanal',
  fecha_inicio: '2026-03-20',
  fecha_fin: '2026-03-26',
};

const mockEntrada: EntradaPlanComida = {
  id: 'entry-1',
  fecha: '2026-03-20',
  tipo_comida: 'almuerzo',
  id_receta: 'rec-1',
  ingredientes_seleccionados: {},
};

const mockListaCompras: ListaCompras = {
  requeridos: [],
  opcionales: [],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('mealPlansService.list', () => {
  it('fetches all meal plans', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [mockPlan] });

    const result = await mealPlansService.list();

    expect(api.get).toHaveBeenCalledWith('/planes-comida');
    expect(result).toEqual([mockPlan]);
  });
});

describe('mealPlansService.get', () => {
  it('fetches a single meal plan by id', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockPlan });

    const result = await mealPlansService.get('plan-1');

    expect(api.get).toHaveBeenCalledWith('/planes-comida/plan-1');
    expect(result).toEqual(mockPlan);
  });
});

describe('mealPlansService.create', () => {
  it('posts a new meal plan', async () => {
    const payload: PlanComidaCrear = {
      nombre: 'Plan Semanal',
      tipo: 'semanal',
      fecha_inicio: '2026-03-20',
      fecha_fin: '2026-03-26',
    };
    vi.mocked(api.post).mockResolvedValue({ data: mockPlan });

    const result = await mealPlansService.create(payload);

    expect(api.post).toHaveBeenCalledWith('/planes-comida', payload);
    expect(result).toEqual(mockPlan);
  });
});

describe('mealPlansService.update', () => {
  it('puts updated meal plan data', async () => {
    const patch = { nombre: 'Plan Actualizado' };
    vi.mocked(api.put).mockResolvedValue({ data: { ...mockPlan, ...patch } });

    const result = await mealPlansService.update('plan-1', patch);

    expect(api.put).toHaveBeenCalledWith('/planes-comida/plan-1', patch);
    expect(result).toEqual({ ...mockPlan, ...patch });
  });
});

describe('mealPlansService.delete', () => {
  it('deletes a meal plan by id', async () => {
    vi.mocked(api.delete).mockResolvedValue({ data: null });

    await mealPlansService.delete('plan-1');

    expect(api.delete).toHaveBeenCalledWith('/planes-comida/plan-1');
  });
});

describe('mealPlansService.addEntry', () => {
  it('posts a new entry to a meal plan', async () => {
    const payload: EntradaPlanCrear = {
      fecha: '2026-03-20',
      tipo_comida: 'almuerzo',
      id_receta: 'rec-1',
    };
    vi.mocked(api.post).mockResolvedValue({ data: mockEntrada });

    const result = await mealPlansService.addEntry('plan-1', payload);

    expect(api.post).toHaveBeenCalledWith('/planes-comida/plan-1/entradas', payload);
    expect(result).toEqual(mockEntrada);
  });
});

describe('mealPlansService.getMealList', () => {
  it('fetches the meal list for a plan', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [mockEntrada] });

    const result = await mealPlansService.getMealList('plan-1');

    expect(api.get).toHaveBeenCalledWith('/planes-comida/plan-1/lista-comidas');
    expect(result).toEqual([mockEntrada]);
  });
});

describe('mealPlansService.getGroceryList', () => {
  it('fetches the grocery list for a plan', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockListaCompras });

    const result = await mealPlansService.getGroceryList('plan-1');

    expect(api.get).toHaveBeenCalledWith('/planes-comida/plan-1/lista-compras');
    expect(result).toEqual(mockListaCompras);
  });
});
