import React, { useState } from 'react';
import { RecetaCrear, IngredienteRecetaCrear } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { RecipeIngredientEditor } from './RecipeIngredientEditor';
import { useIngredients } from '../../hooks/useIngredients';

interface RecipeFormProps {
  onSubmit: (data: RecetaCrear) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, onCancel, loading }) => {
  const { data: ingredientes = [] } = useIngredients();
  const [form, setForm] = useState<Omit<RecetaCrear, 'ingredientes'>>({
    nombre: '', descripcion: '', porciones: 2, tiempo_preparacion: 15, tiempo_coccion: 30,
  });
  const [recetaIngredientes, setRecetaIngredientes] = useState<IngredienteRecetaCrear[]>([]);

  const handle = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: field === 'nombre' || field === 'descripcion' ? e.target.value : Number(e.target.value) }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...form, ingredientes: recetaIngredientes });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Input label="Nombre" value={form.nombre} onChange={handle('nombre')} required />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.descripcion}
          onChange={handle('descripcion')}
          rows={3}
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Input label="Porciones" type="number" value={form.porciones} onChange={handle('porciones')} min={1} />
        <Input label="Tiempo de preparación (min)" type="number" value={form.tiempo_preparacion} onChange={handle('tiempo_preparacion')} min={0} />
        <Input label="Tiempo de cocción (min)" type="number" value={form.tiempo_coccion} onChange={handle('tiempo_coccion')} min={0} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Ingredientes</p>
        <RecipeIngredientEditor ingredientes={ingredientes} value={recetaIngredientes} onChange={setRecetaIngredientes} />
      </div>
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" loading={loading}>Crear receta</Button>
      </div>
    </form>
  );
};
