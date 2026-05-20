// types/catalog.ts

export interface Product {
  id: string; // uuid
  profile_id: string; // uuid de la tienda
  name: string;
  description: string | null;
  price: number; // precio base puro
  discount_percent: number; // ej: 10 para 10%
  image_url: string | null;
  category: string | null;
  is_available: boolean; // control de stock
  created_at?: string;
  updated_at?: string;
}

export interface ProductPublic {
  id: string; // uuid
  profile_id: string; // uuid de la tienda
  name: string;
  description: string | null;
  price: number; // precio base puro
  discount_percent: number; // ej: 10 para 10%
  image_url: string | null;
  categories: {
    name: string;
  }[] | null;
  is_available: boolean; // control de stock
  created_at?: string;
  updated_at?: string;
}

export interface ProductCatalog extends ProductPublic {
  category: {id:string, name: string} | null;
}