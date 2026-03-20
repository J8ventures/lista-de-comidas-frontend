export type GrupoNutricional =
  | 'PROTEINAS'
  | 'CARBOHIDRATOS'
  | 'VERDURAS'
  | 'FRUTAS'
  | 'LACTEOS'
  | 'GRASAS'
  | 'LEGUMBRES'
  | 'CEREALES'
  | 'OTRO';

export type RolIngrediente = 'requerido' | 'reemplazable' | 'opcional';
export type TipoComida = 'desayuno' | 'almuerzo' | 'cena' | 'merienda';
export type TipoPlan = 'semanal' | 'quincenal';

export interface Ingrediente {
  id: string;
  nombre: string;
  grupo_nutricional: GrupoNutricional;
  unidad: string;
  creado_en?: string;
  actualizado_en?: string;
}

export interface Alternativa {
  id_ingrediente: string;
  ingrediente?: Ingrediente;
  cantidad: number;
  unidad: string;
}

export interface IngredienteReceta {
  id_ingrediente: string;
  ingrediente?: Ingrediente;
  rol: RolIngrediente;
  cantidad: number;
  unidad: string;
  alternativas: Alternativa[];
}

export interface Receta {
  id: string;
  nombre: string;
  descripcion: string;
  porciones: number;
  tiempo_preparacion: number;
  tiempo_coccion: number;
  ingredientes?: IngredienteReceta[];
  creado_en?: string;
  actualizado_en?: string;
}

export interface EntradaPlanComida {
  id: string;
  fecha: string;
  tipo_comida: TipoComida;
  id_receta: string;
  receta?: Receta;
  ingredientes_seleccionados: Record<string, string>;
}

export interface PlanComida {
  id: string;
  nombre: string;
  tipo: TipoPlan;
  fecha_inicio: string;
  fecha_fin: string;
  entradas?: EntradaPlanComida[];
  creado_en?: string;
  actualizado_en?: string;
}

export interface ArticuloCompra {
  ingrediente: Ingrediente;
  cantidad: number;
  unidad: string;
}

export interface ListaCompras {
  requeridos: ArticuloCompra[];
  opcionales: ArticuloCompra[];
}

export interface IngredienteCrear {
  nombre: string;
  grupo_nutricional: GrupoNutricional;
  unidad: string;
}

export interface IngredienteRecetaCrear {
  id_ingrediente: string;
  rol: RolIngrediente;
  cantidad: number;
  unidad: string;
  alternativas: { id_ingrediente: string; cantidad: number; unidad: string }[];
}

export interface RecetaCrear {
  nombre: string;
  descripcion?: string;
  porciones?: number;
  tiempo_preparacion?: number;
  tiempo_coccion?: number;
  ingredientes?: IngredienteRecetaCrear[];
}

export interface EntradaPlanCrear {
  fecha: string;
  tipo_comida: TipoComida;
  id_receta: string;
  ingredientes_seleccionados?: Record<string, string>;
}

export interface PlanComidaCrear {
  nombre: string;
  tipo: TipoPlan;
  fecha_inicio: string;
  fecha_fin: string;
  entradas?: EntradaPlanCrear[];
}
