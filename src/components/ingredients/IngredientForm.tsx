import React, { useState, useEffect } from 'react';
import { Ingrediente, IngredienteCrear, GrupoNutricional } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

const GRUPOS_NUTRICIONALES: GrupoNutricional[] = [
  'PROTEINAS',
  'CARBOHIDRATOS',
  'VERDURAS',
  'FRUTAS',
  'LACTEOS',
  'GRASAS',
  'LEGUMBRES',
  'CEREALES',
  'OTRO',
];

interface IngredientFormProps {
  initial?: Ingrediente;
  onSubmit: (data: IngredienteCrear) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const IngredientForm: React.FC<IngredientFormProps> = ({
  initial,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [form, setForm] = useState<IngredienteCrear>({
    nombre: initial?.nombre ?? '',
    grupo_nutricional: initial?.grupo_nutricional ?? 'OTRO',
    unidad: initial?.unidad ?? '',
  });

  useEffect(() => {
    if (initial)
      setForm({
        nombre: initial.nombre,
        grupo_nutricional: initial.grupo_nutricional,
        unidad: initial.unidad,
      });
  }, [initial]);

  const handle =
    (field: keyof IngredienteCrear) =>
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
        label="Grupo nutricional"
        value={form.grupo_nutricional}
        onChange={handle('grupo_nutricional')}
        options={GRUPOS_NUTRICIONALES.map((g) => ({ value: g, label: g }))}
      />
      <Input
        label="Unidad (ej. g, ml, unidad)"
        value={form.unidad}
        onChange={handle('unidad')}
        required
      />
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          {initial ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
};
