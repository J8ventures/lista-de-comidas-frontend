import React, { useState, useEffect } from 'react';
import { Ingredient, IngredientCreate, NutritionalGroup } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

const NUTRITIONAL_GROUPS: NutritionalGroup[] = [
  'PROTEINS', 'CARBOHYDRATES', 'VEGETABLES', 'FRUITS', 'DAIRY', 'FATS', 'LEGUMES', 'GRAINS', 'OTHER'
];

interface IngredientFormProps {
  initial?: Ingredient;
  onSubmit: (data: IngredientCreate) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const IngredientForm: React.FC<IngredientFormProps> = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState<IngredientCreate>({
    name: initial?.name ?? '',
    nutritional_group: initial?.nutritional_group ?? 'OTHER',
    unit: initial?.unit ?? '',
  });

  useEffect(() => {
    if (initial) setForm({ name: initial.name, nutritional_group: initial.nutritional_group, unit: initial.unit });
  }, [initial]);

  const handle = (field: keyof IngredientCreate) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Input label="Name" value={form.name} onChange={handle('name')} required />
      <Select
        label="Nutritional Group"
        value={form.nutritional_group}
        onChange={handle('nutritional_group')}
        options={NUTRITIONAL_GROUPS.map(g => ({ value: g, label: g }))}
      />
      <Input label="Unit (e.g. g, ml, unit)" value={form.unit} onChange={handle('unit')} required />
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>{initial ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};
