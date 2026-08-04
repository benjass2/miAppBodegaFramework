export type ProductCategory ='Abarrotes' | 'Bebidas' | 'Lácteos' | 'Snacks' | 'Limpieza' | 'Otros';

export interface Product{
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    unit?: 'unidad' | 'kg' | 'paquete';
    stock?: number;
}
