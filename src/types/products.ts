import type { ProductCategory } from '@/domain/categories';

// Re-exportado por compatibilidad: el código existente que hace
// `import type { ProductCategory } from '@/types/products'` sigue funcionando,
// pero la definición real vive en '@/domain/categories'.
export type { ProductCategory };

export interface Product{
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    unit?: 'unidad' | 'kg' | 'paquete';
    stock?: number;
}
