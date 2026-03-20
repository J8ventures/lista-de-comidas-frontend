import React, { useState } from 'react';
import { PlanComidaCrear, TipoPlan } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

const TIPOS_PLAN: TipoPlan[] = ['semanal', 'quincenal'];

interface MealPlanFormProps {
  onSubmit: (data: PlanComidaCrear) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const MealPlanForm: React.FC<MealPlanFormProps> = ({ onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState<PlanComidaCrear>({
    nombre: '',
    tipo: 'semanal',
    fecha_inicio: '',
    fecha_fin: '',
    entradas: [],
  });

  const handle =
    (field: keyof PlanComidaCrear) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Input label="Nombre" value={form.nombre} onChange={handle('nombre')} required />
      <Select
        label="Tipo"
        value={form.tipo}
        onChange={handle('tipo')}
        options={TIPOS_PLAN.map((t) => ({ value: t, label: t }))}
      />
      <Input
        label="Fecha de inicio"
        type="date"
        value={form.fecha_inicio}
        onChange={handle('fecha_inicio')}
        required
      />
      <Input
        label="Fecha de fin"
        type="date"
        value={form.fecha_fin}
        onChange={handle('fecha_fin')}
        required
      />
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          Crear
        </Button>
      </div>
    </form>
  );
};
