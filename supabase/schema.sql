-- ============================================================
-- Schema: products
-- Correr esto en Supabase → SQL Editor → New query → Run
-- ============================================================

-- Enum de categorías: refleja PRODUCT_CATEGORIES de
-- src/domain/categories.ts. Si agregas una categoría nueva ahí,
-- agrégala también aquí con ALTER TYPE (ver nota al final).
create type product_category as enum (
  'Abarrotes', 'Bebidas', 'Lácteos', 'Snacks', 'Limpieza', 'Otros'
);

create type product_unit as enum ('unidad', 'kg', 'paquete');

create table products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(trim(name)) > 0),
  price       numeric(10, 2) not null check (price > 0),
  category    product_category not null,
  unit        product_unit,
  stock       integer check (stock is null or stock >= 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Mantiene updated_at al día en cada UPDATE, sin que la app tenga
-- que acordarse de mandarlo.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_set_updated_at
  before update on products
  for each row
  execute function set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security (RLS): Supabase la exige por defecto.
-- Sin una política, NADIE puede leer ni escribir, ni con la
-- anon key. Esta política es la más simple posible: acceso
-- público total. Sirve para un prototipo de una sola bodega.
--
-- ⚠️ Cuando agregues login de cajeros, esta política se reemplaza
-- por una que valide auth.uid() — lo vemos en una fase futura.
-- ------------------------------------------------------------
alter table products enable row level security;

create policy "Acceso público total a products (prototipo)"
  on products
  for all
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- Nota: si más adelante agregas una categoría nueva en
-- src/domain/categories.ts, replícala aquí con:
--   alter type product_category add value 'NuevaCategoria';
-- ------------------------------------------------------------
