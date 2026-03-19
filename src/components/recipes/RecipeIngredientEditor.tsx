import React from 'react';
import { Ingredient, RecipeIngredientCreate, IngredientRole } from '../../types';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface RecipeIngredientEditorProps {
  ingredients: Ingredient[];
  value: RecipeIngredientCreate[];
  onChange: (value: RecipeIngredientCreate[]) => void;
}

const ROLES: IngredientRole[] = ['required', 'replaceable', 'optional'];

export const RecipeIngredientEditor: React.FC<RecipeIngredientEditorProps> = ({
  ingredients, value, onChange,
}) => {
  const addIngredient = () => {
    if (!ingredients.length) return;
    onChange([...value, {
      ingredient_id: ingredients[0].id,
      role: 'required',
      quantity: 1,
      unit: ingredients[0].unit,
      alternatives: [],
    }]);
  };

  const update = (idx: number, field: string, val: unknown) => {
    const next = [...value];
    if (field === 'ingredient_id') {
      const ing = ingredients.find(i => i.id === val);
      next[idx] = { ...next[idx], ingredient_id: val as string, unit: ing?.unit ?? '' };
    } else {
      next[idx] = { ...next[idx], [field]: val };
    }
    onChange(next);
  };

  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  const addAlt = (idx: number) => {
    const next = [...value];
    if (!ingredients.length) return;
    next[idx].alternatives.push({ ingredient_id: ingredients[0].id, quantity: 1, unit: ingredients[0].unit });
    onChange(next);
  };

  const updateAlt = (idx: number, altIdx: number, field: string, val: unknown) => {
    const next = [...value];
    const ing = ingredients.find(i => i.id === val);
    if (field === 'ingredient_id' && ing) {
      next[idx].alternatives[altIdx] = { ...next[idx].alternatives[altIdx], ingredient_id: val as string, unit: ing.unit };
    } else {
      next[idx].alternatives[altIdx] = { ...next[idx].alternatives[altIdx], [field]: val };
    }
    onChange(next);
  };

  const removeAlt = (idx: number, altIdx: number) => {
    const next = [...value];
    next[idx].alternatives.splice(altIdx, 1);
    onChange(next);
  };

  const ingredientOptions = ingredients.map(i => ({ value: i.id, label: `${i.name} (${i.unit})` }));
  const roleOptions = ROLES.map(r => ({ value: r, label: r }));

  return (
    <div className="flex flex-col gap-4">
      {value.map((ri, idx) => (
        <div key={idx} className="border rounded-lg p-4 bg-gray-50">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Select label="Ingredient" value={ri.ingredient_id} onChange={e => update(idx, 'ingredient_id', e.target.value)} options={ingredientOptions} />
            <Select label="Role" value={ri.role} onChange={e => update(idx, 'role', e.target.value)} options={roleOptions} />
            <Input label="Quantity" type="number" value={ri.quantity} onChange={e => update(idx, 'quantity', parseFloat(e.target.value))} min={0} step={0.1} />
            <Input label="Unit" value={ri.unit} onChange={e => update(idx, 'unit', e.target.value)} />
          </div>

          {ri.role === 'replaceable' && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-600 mb-2">Alternatives</p>
              {ri.alternatives.map((alt, altIdx) => (
                <div key={altIdx} className="grid grid-cols-3 gap-2 mb-2 items-end">
                  <Select value={alt.ingredient_id} onChange={e => updateAlt(idx, altIdx, 'ingredient_id', e.target.value)} options={ingredientOptions} />
                  <Input type="number" value={alt.quantity} onChange={e => updateAlt(idx, altIdx, 'quantity', parseFloat(e.target.value))} min={0} step={0.1} />
                  <Button size="sm" variant="danger" onClick={() => removeAlt(idx, altIdx)}>Remove</Button>
                </div>
              ))}
              <Button size="sm" variant="ghost" onClick={() => addAlt(idx)}>+ Add alternative</Button>
            </div>
          )}

          <div className="flex justify-between mt-3">
            <Badge label={ri.role} />
            <Button size="sm" variant="danger" onClick={() => remove(idx)}>Remove</Button>
          </div>
        </div>
      ))}
      <Button variant="secondary" onClick={addIngredient} type="button">+ Add ingredient</Button>
    </div>
  );
};
