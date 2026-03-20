import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './api';
import { ingredientsService } from './ingredients.service';
import type { Ingrediente, IngredienteCrear } from '../types';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockIngrediente: Ingrediente = {
  id: 'ing-1',
  nombre: 'Pollo',
  grupo_nutricional: 'PROTEINAS',
  unidad: 'kg',
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ingredientsService.list', () => {
  it('fetches all ingredients without filter', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [mockIngrediente] });

    const result = await ingredientsService.list();

    expect(api.get).toHaveBeenCalledWith('/ingredientes', { params: {} });
    expect(result).toEqual([mockIngrediente]);
  });

  it('fetches ingredients filtered by nutritional group', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [mockIngrediente] });

    const result = await ingredientsService.list('PROTEINAS');

    expect(api.get).toHaveBeenCalledWith('/ingredientes', {
      params: { grupo_nutricional: 'PROTEINAS' },
    });
    expect(result).toEqual([mockIngrediente]);
  });
});

describe('ingredientsService.get', () => {
  it('fetches a single ingredient by id', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: mockIngrediente });

    const result = await ingredientsService.get('ing-1');

    expect(api.get).toHaveBeenCalledWith('/ingredientes/ing-1');
    expect(result).toEqual(mockIngrediente);
  });
});

describe('ingredientsService.create', () => {
  it('posts a new ingredient', async () => {
    const payload: IngredienteCrear = {
      nombre: 'Pollo',
      grupo_nutricional: 'PROTEINAS',
      unidad: 'kg',
    };
    vi.mocked(api.post).mockResolvedValue({ data: mockIngrediente });

    const result = await ingredientsService.create(payload);

    expect(api.post).toHaveBeenCalledWith('/ingredientes', payload);
    expect(result).toEqual(mockIngrediente);
  });
});

describe('ingredientsService.update', () => {
  it('puts updated ingredient data', async () => {
    const patch = { nombre: 'Pechuga de Pollo' };
    vi.mocked(api.put).mockResolvedValue({ data: { ...mockIngrediente, ...patch } });

    const result = await ingredientsService.update('ing-1', patch);

    expect(api.put).toHaveBeenCalledWith('/ingredientes/ing-1', patch);
    expect(result).toEqual({ ...mockIngrediente, ...patch });
  });
});

describe('ingredientsService.delete', () => {
  it('deletes an ingredient by id', async () => {
    vi.mocked(api.delete).mockResolvedValue({ data: null });

    await ingredientsService.delete('ing-1');

    expect(api.delete).toHaveBeenCalledWith('/ingredientes/ing-1');
  });
});
