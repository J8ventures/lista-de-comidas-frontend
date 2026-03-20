import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './api';
import { recipesService } from './recipes.service';
import type { Receta, RecetaCrear } from '../types';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockReceta: Receta = {
  id: 'rec-1',
  nombre: 'Ensalada de Pollo',
  descripcion: 'Una ensalada saludable',
  porciones: 2,
  tiempo_preparacion: 10,
  tiempo_coccion: 0,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('recipesService.list', () => {
  it('fetches all recipes without params', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [mockReceta] });

    const result = await recipesService.list();

    expect(api.get).toHaveBeenCalledWith('/recetas', { params: undefined });
    expect(result).toEqual([mockReceta]);
  });

  it('fetches recipes filtered by ingredient id', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [mockReceta] });

    const result = await recipesService.list({ id_ingrediente: 'ing-1' });

    expect(api.get).toHaveBeenCalledWith('/recetas', { params: { id_ingrediente: 'ing-1' } });
    expect(result).toEqual([mockReceta]);
  });

  it('fetches recipes filtered by nutritional group', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [mockReceta] });

    const result = await recipesService.list({ grupo_nutricional: 'PROTEINAS' });

    expect(api.get).toHaveBeenCalledWith('/recetas', {
      params: { grupo_nutricional: 'PROTEINAS' },
    });
    expect(result).toEqual([mockReceta]);
  });
});

describe('recipesService.get', () => {
  it('fetches a single recipe by id', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockReceta });

    const result = await recipesService.get('rec-1');

    expect(api.get).toHaveBeenCalledWith('/recetas/rec-1');
    expect(result).toEqual(mockReceta);
  });
});

describe('recipesService.create', () => {
  it('posts a new recipe', async () => {
    const payload: RecetaCrear = { nombre: 'Ensalada de Pollo' };
    vi.mocked(api.post).mockResolvedValue({ data: mockReceta });

    const result = await recipesService.create(payload);

    expect(api.post).toHaveBeenCalledWith('/recetas', payload);
    expect(result).toEqual(mockReceta);
  });
});

describe('recipesService.update', () => {
  it('puts updated recipe data', async () => {
    const patch = { porciones: 4 };
    vi.mocked(api.put).mockResolvedValue({ data: { ...mockReceta, ...patch } });

    const result = await recipesService.update('rec-1', patch);

    expect(api.put).toHaveBeenCalledWith('/recetas/rec-1', patch);
    expect(result).toEqual({ ...mockReceta, ...patch });
  });
});

describe('recipesService.delete', () => {
  it('deletes a recipe by id', async () => {
    vi.mocked(api.delete).mockResolvedValue({ data: null });

    await recipesService.delete('rec-1');

    expect(api.delete).toHaveBeenCalledWith('/recetas/rec-1');
  });
});
