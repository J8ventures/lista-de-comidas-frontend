import React, { useState } from 'react';
import { IngredienteReceta } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface ReplaceableIngredientSelectorProps {
  open: boolean;
  replaceableIngredients: IngredienteReceta[];
  onConfirm: (selected: Record<string, string>) => void;
  onCancel: () => void;
}

export const ReplaceableIngredientSelector: React.FC<ReplaceableIngredientSelectorProps> = ({
  open,
  replaceableIngredients,
  onConfirm,
  onCancel,
}) => {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(replaceableIngredients.map((ri) => [ri.id_ingrediente, ri.id_ingrediente]))
  );

  const handleConfirm = () => {
    const allCovered = replaceableIngredients.every((ri) => selected[ri.id_ingrediente]);
    if (!allCovered) return;
    onConfirm(selected);
  };

  return (
    <Modal open={open} onClose={onCancel} title="Seleccionar ingredientes alternativos" size="md">
      <div className="flex flex-col gap-4">
        {replaceableIngredients.map((ri) => (
          <div key={ri.id_ingrediente}>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {ri.ingrediente?.nombre ?? ri.id_ingrediente} -- {ri.cantidad} {ri.unidad}
            </p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={ri.id_ingrediente}
                  value={ri.id_ingrediente}
                  checked={selected[ri.id_ingrediente] === ri.id_ingrediente}
                  onChange={() =>
                    setSelected((s) => ({ ...s, [ri.id_ingrediente]: ri.id_ingrediente }))
                  }
                />
                {ri.ingrediente?.nombre ?? ri.id_ingrediente} (original)
              </label>
              {ri.alternativas.map((alt) => (
                <label key={alt.id_ingrediente} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={ri.id_ingrediente}
                    value={alt.id_ingrediente}
                    checked={selected[ri.id_ingrediente] === alt.id_ingrediente}
                    onChange={() =>
                      setSelected((s) => ({ ...s, [ri.id_ingrediente]: alt.id_ingrediente }))
                    }
                  />
                  {alt.ingrediente?.nombre ?? alt.id_ingrediente} -- {alt.cantidad} {alt.unidad}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="flex gap-3 justify-end mt-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </div>
      </div>
    </Modal>
  );
};
