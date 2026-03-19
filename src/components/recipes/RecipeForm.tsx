import React, { useState } from 'react';
import { RecipeCreate, RecipeIngredientCreate } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { RecipeIngredientEditor } from './RecipeIngredientEditor';
import { useIngredients } from '../../hooks/useIngredients';

interface RecipeFormProps {
  onSubmit: (data: RecipeCreate) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, onCancel, loading }) => {
  const { data: ingredients = [] } = useIngredients();
  const [form, setForm] = useState<Omit<RecipeCreate, 'ingredients'>>({
    name: '', description: '', servings: 2, prep_time: 15, cook_time: 30,
  });
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredientCreate[]>([]);

  const handle = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: field === 'name' || field === 'description' ? e.target.value : Number(e.target.value) }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...form, ingredients: recipeIngredients });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Input label="Name" value={form.name} onChange={handle('name')} required />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.description}
          onChange={handle('description')}
          rows={3}
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Input label="Servings" type="number" value={form.servings} onChange={handle('servings')} min={1} />
        <Input label="Prep time (min)" type="number" value={form.prep_time} onChange={handle('prep_time')} min={0} />
        <Input label="Cook time (min)" type="number" value={form.cook_time} onChange={handle('cook_time')} min={0} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Ingredients</p>
        <RecipeIngredientEditor ingredients={ingredients} value={recipeIngredients} onChange={setRecipeIngredients} />
      </div>
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>Create Recipe</Button>
      </div>
    </form>
  );
};
