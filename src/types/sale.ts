import type { Product } from "./products";

export interface SaleItem{
    product:Product;
    quantity:number;
    subtotal:number;
}

export  type PaymentMethod='efectivo'|'yape'|'plin'|'tarjeta';

export interface Sale{
    id:string;
    items:SaleItem[];
    total:number;
    amountPaid:number;
    change:number;
    paymentMethod:PaymentMethod;
    createdAt:Date;   
}