# Documentación del proyecto Vue POS

## 1. Resumen general
Este proyecto es una aplicación de punto de venta (POS) desarrollada con Vue 3, TypeScript y Vite para gestionar un pequeño negocio o bodega de forma sencilla y visual. La solución permite:

- ver un catálogo de productos,
- agregar productos a un carrito,
- cobrar ventas con distintos métodos de pago,
- gestionar productos desde un panel administrativo,
- revisar el historial de ventas,
- persistir información en Supabase mediante una arquitectura basada en repositorios.

Actualmente la aplicación ya está conectada a Supabase para trabajar con datos reales de productos y ventas, en lugar de depender únicamente de información estática o simulada.

---

## 2. Tecnologías utilizadas
- Vue 3: framework principal para la interfaz de usuario.
- TypeScript: tipado fuerte para componentes, stores, tipos y repositorios.
- Vite: herramienta de desarrollo y compilación.
- Pinia: gestión del estado global de la aplicación.
- Vue Router: navegación entre vistas del POS.
- Supabase: backend como servicio para almacenar productos y ventas.
- Lucide Vue Next: iconos reutilizables de la interfaz.

---

## 3. Estado actual del proyecto
El proyecto ya incorpora las siguientes capacidades:

- pantalla de caja o POS funcional,
- catálogo de productos con búsqueda y filtros,
- carrito interactivo con edición de cantidades,
- modal de cobro con cálculo de vuelto,
- registro de ventas en el historial,
- panel de administración para crear, editar y eliminar productos,
- integración con Supabase para lectura y escritura real de datos.

La arquitectura ya no está centrada únicamente en datos mock, sino en una capa de acceso a datos que abstrae la fuente de información.

---

## 4. Estructura del proyecto

### Archivos principales en la raíz
- package.json: define dependencias, scripts y configuración del proyecto.
- README.md: guía base del proyecto, aún puede mejorarse con instrucciones más específicas del negocio.
- DOCUMENTATION.md: documentación central del sistema.
- index.html: plantilla HTML principal de la aplicación.
- vite.config.ts: configuración de Vite y alias de importaciones.
- tsconfig.json, tsconfig.app.json, tsconfig.node.json: configuración de TypeScript.
- env.d.ts: definiciones de tipos para Vite y módulos Vue.
- public/: carpeta para archivos estáticos servidos directamente.
- supabase/: contiene los scripts SQL de esquema y seed para crear tablas y cargar datos iniciales.

### Carpeta src/
Contiene toda la lógica de negocio, la interfaz, los estados y la integración con Supabase.

---

## 5. Documentación por carpetas

### 5.1 Carpeta src/
Esta carpeta concentra la lógica principal de la aplicación: componentes, rutas, estados, tipos, servicios y acceso a datos.

Archivos relevantes:
- main.ts: punto de entrada de la aplicación. Inicializa Vue, Pinia y Vue Router y monta la app en el DOM.
- App.vue: componente raíz que define el layout general y muestra la vista actual mediante RouterView.

### 5.2 Carpeta src/router/
Contiene la configuración de navegación del proyecto.

- index.ts: define las rutas principales del sistema:
  - / para la vista de caja (POS),
  - /productos para la administración de productos,
  - /historial para consultar ventas.

### 5.3 Carpeta src/types/
Aquí viven los tipos compartidos que representan el dominio de la aplicación.

- index.ts: re-exporta los tipos más importantes del proyecto.
- products.ts: define la interfaz Product y los tipos de categorías permitidas.
- sale.ts: define las estructuras para ventas, ítems y métodos de pago.

### 5.4 Carpeta src/stores/
Contiene los stores de Pinia, que manejan el estado global de la aplicación.

- useCartStore.ts: administra el carrito activo, cantidades, total, método de pago y monto pagado.
- useProductStore.ts: administra el catálogo de productos, la búsqueda, filtros, ordenamiento y operaciones CRUD sobre productos.
- useSaleHistoryStore.ts: guarda el historial de ventas registradas y expone la lógica para persistirlas en Supabase.

### 5.5 Carpeta src/services/
Contiene helpers y utilidades de negocio reutilizables.

- cart.service.ts: centraliza cálculos del carrito, redondeo de montos y lógica de subtotales.
- productService.ts: archivo legacy que ya no debe utilizarse si se desea trabajar únicamente con Supabase; se mantiene solo como referencia histórica.

### 5.6 Carpeta src/composables/
Contiene composables reutilizables para encapsular lógica de negocio compleja.

- useSaleCheckout.ts: agrupa la validación de stock, la creación del objeto venta y la confirmación del proceso de cobro.

### 5.7 Carpeta src/components/
Aquí están los componentes visuales que componen la interfaz.

#### 5.7.1 Carpeta src/components/layout/
- AppNavbar.vue: barra de navegación principal para moverse entre Caja, Productos e Historial.

#### 5.7.2 Carpeta src/components/pos/
- ProductCard.vue: muestra cada producto como una tarjeta interactiva para agregarlo al carrito.
- CartDrawer.vue: muestra los productos agregados al carrito y permite ajustar cantidades.
- CheckoutModal.vue: modal de cobro donde el usuario elige el método de pago y confirma la venta.
- ProductFilters.vue: permite buscar productos, filtrar por categoría y ordenar el catálogo.

#### 5.7.3 Carpeta src/components/admin/
- ProductFormModal.vue: modal para crear o editar productos desde el panel administrativo.

### 5.8 Carpeta src/views/
Aquí están las vistas principales del sistema.

- POSView.vue: vista de caja para vender productos.
- ProductsAdminView.vue: vista para administrar el catálogo.
- SalesHistoryView.vue: vista para visualizar las ventas registradas.

### 5.9 Carpeta src/assets/
Contiene recursos visuales y utilidades relacionadas con la presentación.

- utils/CategoryColor.ts: define colores visuales para cada categoría de producto.

### 5.10 Carpeta src/lib/
Contiene la conexión con servicios externos.

- supabaseClient.ts: inicializa y expone el cliente de Supabase usando las variables de entorno del proyecto.

### 5.11 Carpeta src/repositories/
Esta es una capa importante del proyecto porque abstrae el acceso a datos.

- productRepository.ts: define la interfaz del repositorio de productos.
- supabaseProductRepository.ts: implementa la lectura y escritura de productos usando Supabase.
- supabaseSalesRepository.ts: implementa el registro de ventas y sus ítems en Supabase.
- index.ts: centraliza la creación del repositorio activo para el proyecto.

---

## 6. Documentación archivo por archivo

### Archivos raíz
- package.json: define scripts como dev, build y type-check, además de las dependencias del proyecto.
- README.md: documento base de Vite que puede enriquecerse con instrucciones específicas del negocio.
- DOCUMENTATION.md: documento principal de referencia.
- index.html: plantilla HTML base que carga la aplicación.
- vite.config.ts: configura Vite, incluyendo alias y herramientas de desarrollo.
- tsconfig.json, tsconfig.app.json, tsconfig.node.json: definiciones de TypeScript para la app y Node.
- env.d.ts: habilita tipos globales para módulos y archivos .vue.
- supabase/schema.sql: define el esquema inicial de productos y políticas básicas de acceso.
- supabase/seed.sql: contiene datos iniciales para poblar Supabase.

### src/main.ts
- Inicializa Vue.
- Registra Pinia y Vue Router.
- Monta la aplicación en el elemento #app.

### src/App.vue
- Componente raíz del layout.
- Muestra el contenido dinámico con RouterView y la barra de navegación inferior.

### src/router/index.ts
- Configura las rutas de navegación del sistema.
- Carga de forma diferida las vistas principales.

### src/types/products.ts
- Define el tipo Product.
- Contiene las categorías permitidas y las opciones de unidad del producto.

### src/types/sale.ts
- Define el modelo de venta.
- Incluye los productos vendidos, total, monto pagado, vuelto, método de pago y fecha de creación.

### src/types/index.ts
- Centraliza la exportación de tipos compartidos.

### src/stores/useCartStore.ts
- Gestiona el estado del carrito.
- Permite agregar productos, modificar cantidades, eliminar productos y limpiar el carrito.
- Calcula totales, vuelto y número total de ítems.

### src/stores/useProductStore.ts
- Administra la lista de productos desde la UI.
- Incluye filtrado por texto, categoría y ordenamiento.
- Permite crear, actualizar y eliminar productos usando el repositorio activo.

### src/stores/useSaleHistoryStore.ts
- Guarda el registro de ventas confirmadas.
- Conecta la lógica de negocio con el repositorio de ventas en Supabase.

### src/services/cart.service.ts
- Contiene funciones auxiliares para el carrito.
- Centraliza el redondeo de precios y los cálculos de subtotal.

### src/composables/useSaleCheckout.ts
- Encapsula la lógica de confirmación de venta.
- Crea el objeto de venta, lo registra, actualiza stock y limpia el carrito.

### src/components/layout/AppNavbar.vue
- Barra de navegación fija en la parte inferior.
- Permite moverse entre Caja, Productos y Historial.

### src/components/pos/ProductCard.vue
- Muestra cada producto como una tarjeta interactiva.
- Al hacer clic se agrega al carrito.

### src/components/pos/CartDrawer.vue
- Muestra el carrito activo.
- Permite modificar cantidades y acceder al checkout.

### src/components/pos/CheckoutModal.vue
- Modal de cobro.
- Permite elegir el método de pago y definir el monto pagado.
- Muestra el vuelto calculado.

### src/components/pos/ProductFilters.vue
- Permite buscar productos, filtrar por categoría y ordenar el catálogo.

### src/components/admin/ProductFormModal.vue
- Modal de formulario para crear o editar productos.
- Valida que el producto tenga nombre y precio válidos.

### src/views/POSView.vue
- Vista principal del punto de venta.
- Carga el catálogo y muestra los productos junto al carrito.

### src/views/ProductsAdminView.vue
- Vista de administración de productos.
- Permite crear, editar y eliminar productos desde la interfaz.

### src/views/SalesHistoryView.vue
- Vista del historial de ventas.
- Muestra las ventas registradas y un resumen de totales.

### src/assets/utils/CategoryColor.ts
- Define colores visuales para cada categoría de producto.

### src/lib/supabaseClient.ts
- Inicializa el cliente de Supabase con las variables de entorno del proyecto.
- Es el punto de entrada para todas las operaciones que requieren conexión con la base de datos.

### src/repositories/supabaseProductRepository.ts
- Implementa la capa de acceso a datos para productos con Supabase.
- Se encarga de listar, crear, actualizar y eliminar productos.

### src/repositories/supabaseSalesRepository.ts
- Implementa la persistencia de ventas y sus ítems en Supabase.
- Mapea la información del modelo de dominio al esquema de la base de datos.

---

## 7. Flujo de uso actual de la aplicación
1. El usuario entra a la vista de caja.
2. El catálogo se carga desde Supabase mediante el repositorio de productos.
3. Al seleccionar un producto, se agrega al carrito.
4. El usuario puede modificar cantidades o limpiar el carrito.
5. Al abrir el checkout, elige el método de pago y confirma la venta.
6. La venta se registra en Supabase y además se refleja en la interfaz del historial.
7. Desde la vista de administración se pueden agregar, editar o eliminar productos.

---

## 8. Notas importantes del diseño actual
- La arquitectura ya está orientada a una separación clara entre interfaz, estado y acceso a datos.
- Los stores son el punto central de estado, pero delegan la persistencia en repositorios.
- Supabase actúa como capa de backend para productos y ventas.
- El proyecto está preparado para crecer hacia un sistema más robusto con reglas de negocio más complejas.

---

## 9. Próximos pasos recomendados
- revisar y fortalecer las políticas de seguridad de Supabase,
- agregar validaciones de negocio más completas,
- mejorar el manejo de errores en operaciones de base de datos,
- preparar la app para flujos de autenticación y roles,
- documentar el proceso de despliegue y variables de entorno para otros desarrolladores.

---

## 10. Futuras mejoras y observaciones
Esta sección recoge ideas de mejora y puntos que conviene revisar a medida que el proyecto siga creciendo.

### 10.1 Mejoras funcionales
- agregar autenticación para diferenciar usuarios, cajeros y administradores,
- implementar edición de ventas o anulación de operaciones si se requiere trazabilidad,
- añadir soporte para descuentos, promociones y combinaciones de productos,
- incorporar control de inventario más avanzado con alertas de stock bajo,
- permitir registrar clientes y emitir tickets o comprobantes.

### 10.2 Mejoras técnicas
- separar aún más la lógica de negocio de la interfaz para facilitar pruebas,
- añadir tests unitarios e integración para stores, repositorios y flujos de venta,
- mejorar el manejo de estados de carga y errores en la UI,
- centralizar mensajes de error y notificaciones al usuario,
- preparar el proyecto para despliegue en producción con variables de entorno seguras.

### 10.3 Observaciones del diseño actual
- la arquitectura actual es clara y escalable para un prototipo o versión inicial,
- el uso de repositorios facilita cambiar la fuente de datos en el futuro,
- el proyecto ya está en una buena base para evolucionar hacia una solución más completa,
- conviene cuidar la consistencia de nombres y estructuras entre frontend y base de datos para evitar conflictos a largo plazo.

### 10.4 Recomendación de aprendizaje y mantenimiento
- mantener actualizada la documentación cada vez que cambie la arquitectura,
- revisar periódicamente las políticas de Supabase y la seguridad de las credenciales,
- documentar cada nueva tabla, columna o flujo de datos para que el proyecto sea más fácil de mantener.

