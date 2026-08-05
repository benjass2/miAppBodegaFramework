-- ============================================================
-- Seed opcional: carga los mismos 19 productos que tenías en
-- src/services/mockProducts.ts, para no arrancar con la tabla vacía.
-- Correr DESPUÉS de schema.sql.
-- ============================================================

insert into products (name, price, category, unit, stock) values
  ('Arroz Superior Costeño 1kg', 4.80, 'Abarrotes', 'paquete', 50),
  ('Aceite Primor Clásico 1L', 9.50, 'Abarrotes', 'unidad', 50),
  ('Leche Gloria Azul 390g', 4.20, 'Lácteos', 'unidad', 50),
  ('Inca Kola 1.5L Retornable', 5.50, 'Bebidas', 'unidad', 50),
  ('Coca Cola 600ml Personal', 3.00, 'Bebidas', 'unidad', 50),
  ('Papitas Lays Clásicas 160g', 6.00, 'Snacks', 'unidad', 50),
  ('Detergente Opal 800g', 8.20, 'Limpieza', 'unidad', 50),
  ('Fideos Tallarín Don Vittorio 500g', 3.20, 'Abarrotes', 'paquete', 50),
  ('Azúcar Rubia Cartavio 1kg', 4.50, 'Abarrotes', 'paquete', 50),
  ('Sal Marina EMSA 1kg', 2.00, 'Abarrotes', 'paquete', 50),
  ('Galletas Oreo Original 108g', 3.80, 'Snacks', 'paquete', 50),
  ('Chocolate Sublime Clásico', 1.50, 'Snacks', 'unidad', 50),
  ('Yogurt Gloria Fresa 1L', 7.50, 'Lácteos', 'unidad', 50),
  ('Queso Edam Laive 500g', 15.90, 'Lácteos', 'unidad', 50),
  ('Agua Cielo 625ml', 1.80, 'Bebidas', 'unidad', 50),
  ('Sprite 1.5L', 5.20, 'Bebidas', 'unidad', 50),
  ('Jabón Bolívar 190g', 3.50, 'Limpieza', 'unidad', 50),
  ('Lejía Sapolio 1L', 4.30, 'Limpieza', 'unidad', 50),
  ('Papel Higiénico Elite x 4', 8.90, 'Limpieza', 'paquete', 50);
