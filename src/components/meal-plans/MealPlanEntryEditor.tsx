import React, { useState } from 'react';
import { Receta, EntradaPlanCrear, TipoComida } from '../../types';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ReplaceableIngredientSelector } from './ReplaceableIngredientSelector';

const TIPOS_COMIDA: TipoComida[] = ['desayuno', 'almuerzo', 'cena', 'merienda'];

interface MealPlanEntryEditorProps {
  recetas: Receta[];
  onAdd: (entrada: EntradaPlanCrear) => Promise<void>;
  planId: string;
}

export const MealPlanEntryEditor: React.FC<MealPlanEntryEditorProps> = ({ recetas, onAdd }) => {
  const [fecha, setFecha] = useState('');
  const [tipoComida, setTipoComida] = useState<TipoComida>('almuerzo');
  const [idReceta, setIdReceta] = useState(recetas[0]?.id ?? '');
  const [showSelector, setShowSelector] = useState(false);
  const [loading, setLoading] = useState(false);

  const recetaSeleccionada = recetas.find(r => r.id === idReceta);
  const ingredientesReemplazables = recetaSeleccionada?.ingredientes?.filter(ri => ri.rol === 'reemplazable') ?? [];

  const handleAdd = async (ingredientesSeleccionados: Record<string, string> = {}) => {
    if (!fecha || !idReceta) return;
    setLoading(true);
    try {
      await onAdd({ fecha, tipo_comida: tipoComida, id_receta: idReceta, ingredientes_seleccionados: ingredientesSeleccionados });
      setFecha('');
    } finally {
      setLoading(false);
      setShowSelector(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredientesReemplazables.length > 0) {
      setShowSelector(true);
    } else {
      handleAdd({});
    }
  };

  const recetaOptions = recetas.map(r => ({ value: r.id, label: r.nombre }));
  const tipoComidaOptions = TIPOS_COMIDA.map(m => ({ value: m, label: m }));

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 border rounded-lg p-4 bg-gray-50">
        <p className="text-sm font-medium text-gray-700">Agregar comida</p>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Fecha" type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
          <Select label="Tipo de comida" value={tipoComida} onChange={e => setTipoComida(e.target.value as TipoComida)} options={tipoComidaOptions} />
        </div>
        <Select label="Receta" value={idReceta} onChange={e => setIdReceta(e.target.value)} options={recetaOptions} />
        <Button type="submit" loading={loading}>Agregar al plan</Button>
      </form>

      {showSelector && (
        <ReplaceableIngredientSelector
          open={showSelector}
          replaceableIngredients={ingredientesReemplazables}
          onConfirm={handleAdd}
          onCancel={() => setShowSelector(false)}
        />
      )}
    </>
  );
};
