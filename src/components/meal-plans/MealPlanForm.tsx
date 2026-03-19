import React, { useState } from 'react';
import { MealPlanCreate, PlanType } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

const PLAN_TYPES: PlanType[] = ['weekly', 'biweekly'];

interface MealPlanFormProps {
  onSubmit: (data: MealPlanCreate) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const MealPlanForm: React.FC<MealPlanFormProps> = ({ onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState<MealPlanCreate>({
    name: '', type: 'weekly', start_date: '', end_date: '', entries: [],
  });

  const handle = (field: keyof MealPlanCreate) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Input label="Name" value={form.name} onChange={handle('name')} required />
      <Select label="Type" value={form.type} onChange={handle('type')} options={PLAN_TYPES.map(t => ({ value: t, label: t }))} />
      <Input label="Start date" type="date" value={form.start_date} onChange={handle('start_date')} required />
      <Input label="End date" type="date" value={form.end_date} onChange={handle('end_date')} required />
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>Create</Button>
      </div>
    </form>
  );
};
