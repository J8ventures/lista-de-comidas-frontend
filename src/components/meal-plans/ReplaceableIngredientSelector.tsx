import React, { useState } from 'react';
import { RecipeIngredient } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface ReplaceableIngredientSelectorProps {
  open: boolean;
  replaceableIngredients: RecipeIngredient[];
  onConfirm: (selected: Record<string, string>) => void;
  onCancel: () => void;
}

export const ReplaceableIngredientSelector: React.FC<ReplaceableIngredientSelectorProps> = ({
  open, replaceableIngredients, onConfirm, onCancel,
}) => {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(replaceableIngredients.map(ri => [ri.ingredient_id, ri.ingredient_id]))
  );

  const handleConfirm = () => {
    const allCovered = replaceableIngredients.every(ri => selected[ri.ingredient_id]);
    if (!allCovered) return;
    onConfirm(selected);
  };

  return (
    <Modal open={open} onClose={onCancel} title="Select alternative ingredients" size="md">
      <div className="flex flex-col gap-4">
        {replaceableIngredients.map(ri => (
          <div key={ri.ingredient_id}>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {ri.ingredient?.name ?? ri.ingredient_id} -- {ri.quantity} {ri.unit}
            </p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={ri.ingredient_id}
                  value={ri.ingredient_id}
                  checked={selected[ri.ingredient_id] === ri.ingredient_id}
                  onChange={() => setSelected(s => ({ ...s, [ri.ingredient_id]: ri.ingredient_id }))}
                />
                {ri.ingredient?.name ?? ri.ingredient_id} (original)
              </label>
              {ri.alternatives.map(alt => (
                <label key={alt.ingredient_id} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={ri.ingredient_id}
                    value={alt.ingredient_id}
                    checked={selected[ri.ingredient_id] === alt.ingredient_id}
                    onChange={() => setSelected(s => ({ ...s, [ri.ingredient_id]: alt.ingredient_id }))}
                  />
                  {alt.ingredient?.name ?? alt.ingredient_id} -- {alt.quantity} {alt.unit}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="flex gap-3 justify-end mt-2">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
};
