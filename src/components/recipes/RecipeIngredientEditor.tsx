import React from 'react';
import { Ingrediente, IngredienteRecetaCrear, RolIngrediente } from '../../types';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface RecipeIngredientEditorProps {
  ingredientes: Ingrediente[];
  value: IngredienteRecetaCrear[];
  onChange: (value: IngredienteRecetaCrear[]) => void;
}

const ROLES: RolIngrediente[] = ['requerido', 'reemplazable', 'opcional'];

export const RecipeIngredientEditor: React.FC<RecipeIngredientEditorProps> = ({
  ingredientes, value, onChange,
}) => {
  const addIngredient = () => {
    if (!ingredientes.length) return;
    onChange([...value, {
      id_ingrediente: ingredientes[0].id,
      rol: 'requerido',
      cantidad: 1,
      unidad: ingredientes[0].unidad,
      alternativas: [],
    }]);
  };

  const update = (idx: number, field: string, val: unknown) => {
    const next = [...value];
    if (field === 'id_ingrediente') {
      const ing = ingredientes.find(i => i.id === val);
      next[idx] = { ...next[idx], id_ingrediente: val as string, unidad: ing?.unidad ?? '' };
    } else {
      next[idx] = { ...next[idx], [field]: val };
    }
    onChange(next);
  };

  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  const addAlt = (idx: number) => {
    const next = [...value];
    if (!ingredientes.length) return;
    next[idx].alternativas.push({ id_ingrediente: ingredientes[0].id, cantidad: 1, unidad: ingredientes[0].unidad });
    onChange(next);
  };

  const updateAlt = (idx: number, altIdx: number, field: string, val: unknown) => {
    const next = [...value];
    const ing = ingredientes.find(i => i.id === val);
    if (field === 'id_ingrediente' && ing) {
      next[idx].alternativas[altIdx] = { ...next[idx].alternativas[altIdx], id_ingrediente: val as string, unidad: ing.unidad };
    } else {
      next[idx].alternativas[altIdx] = { ...next[idx].alternativas[altIdx], [field]: val };
    }
    onChange(next);
  };

  const removeAlt = (idx: number, altIdx: number) => {
    const next = [...value];
    next[idx].alternativas.splice(altIdx, 1);
    onChange(next);
  };

  const ingredientOptions = ingredientes.map(i => ({ value: i.id, label: `${i.nombre} (${i.unidad})` }));
  const roleOptions = ROLES.map(r => ({ value: r, label: r }));

  return (
    <div className="flex flex-col gap-4">
      {value.map((ri, idx) => (
        <div key={idx} className="border rounded-lg p-4 bg-gray-50">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Select label="Ingrediente" value={ri.id_ingrediente} onChange={e => update(idx, 'id_ingrediente', e.target.value)} options={ingredientOptions} />
            <Select label="Rol" value={ri.rol} onChange={e => update(idx, 'rol', e.target.value)} options={roleOptions} />
            <Input label="Cantidad" type="number" value={ri.cantidad} onChange={e => update(idx, 'cantidad', parseFloat(e.target.value))} min={0} step={0.1} />
            <Input label="Unidad" value={ri.unidad} onChange={e => update(idx, 'unidad', e.target.value)} />
          </div>

          {ri.rol === 'reemplazable' && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-600 mb-2">Alternativas</p>
              {ri.alternativas.map((alt, altIdx) => (
                <div key={altIdx} className="grid grid-cols-3 gap-2 mb-2 items-end">
                  <Select value={alt.id_ingrediente} onChange={e => updateAlt(idx, altIdx, 'id_ingrediente', e.target.value)} options={ingredientOptions} />
                  <Input type="number" value={alt.cantidad} onChange={e => updateAlt(idx, altIdx, 'cantidad', parseFloat(e.target.value))} min={0} step={0.1} />
                  <Button size="sm" variant="danger" onClick={() => removeAlt(idx, altIdx)}>Eliminar</Button>
                </div>
              ))}
              <Button size="sm" variant="ghost" onClick={() => addAlt(idx)}>+ Agregar alternativa</Button>
            </div>
          )}

          <div className="flex justify-between mt-3">
            <Badge label={ri.rol} />
            <Button size="sm" variant="danger" onClick={() => remove(idx)}>Eliminar</Button>
          </div>
        </div>
      ))}
      <Button variant="secondary" onClick={addIngredient} type="button">+ Agregar ingrediente</Button>
    </div>
  );
};
