import React from 'react';
import { Receta } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface RecipeDetailProps {
  receta: Receta;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ receta }) => (
  <div className="flex flex-col gap-6">
    <Card>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">{receta.nombre}</h1>
        {receta.descripcion && <p className="text-gray-600 mt-2">{receta.descripcion}</p>}
        <div className="flex gap-6 mt-4 text-sm text-gray-500">
          <span><strong>Porciones:</strong> {receta.porciones}</span>
          <span><strong>Prep:</strong> {receta.tiempo_preparacion} min</span>
          <span><strong>Cocción:</strong> {receta.tiempo_coccion} min</span>
        </div>
      </div>
    </Card>

    {receta.ingredientes && receta.ingredientes.length > 0 && (
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Ingredientes</h2>
          <div className="flex flex-col gap-3">
            {receta.ingredientes.map((ri, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Badge label={ri.rol} />
                <div>
                  <p className="text-sm font-medium">{ri.ingrediente?.nombre ?? ri.id_ingrediente}</p>
                  <p className="text-xs text-gray-500">{ri.cantidad} {ri.unidad}</p>
                  {ri.rol === 'reemplazable' && ri.alternativas.length > 0 && (
                    <div className="mt-1">
                      <p className="text-xs text-gray-400">Alternativas:</p>
                      {ri.alternativas.map((alt, ai) => (
                        <p key={ai} className="text-xs text-gray-500 ml-2">
                          - {alt.ingrediente?.nombre ?? alt.id_ingrediente} -- {alt.cantidad} {alt.unidad}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    )}
  </div>
);
