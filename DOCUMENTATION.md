# Documentación del proyecto Vue POS

## 1. Resumen general
Este proyecto es una aplicación de punto de venta (POS) desarrollada con Vue 3, TypeScript y Vite. La idea principal es simular una tienda o bodega donde se puede:

- ver un catálogo de productos,
- agregar productos a un carrito,
- cobrar ventas con distintos métodos de pago,
- gestionar productos desde un panel administrativo,
- revisar el historial de ventas.

Actualmente la aplicación funciona con datos simulados en memoria, sin base de datos real. El siguiente paso planeado es integrar PostgreSQL para persistir productos, ventas y demás información.

---

## 2. Tecnologías utilizadas
- Vue 3: framework principal para la interfaz.
- TypeScript: tipado fuerte para componentes, stores y servicios.
- Vite: herramienta de desarrollo y build.
- Pinia: manejo del estado global.
- Vue Router: navegación entre vistas.
- Lucide Vue Next: iconos de interfaz.

---

## 3. Estado actual del proyecto
Por el momento el proyecto incluye estas funcionalidades:

- Pantalla de caja o POS.
- Catálogo de productos con búsqueda y filtros.
- Carrito interactivo con edición de cantidades.
- Modal de cobro con cálculo de vuelto.
- Registro de ventas en historial.
- Panel de administración de productos.
- Datos mockeados para simular productos y ventas.

---

## 4. Estructura del proyecto

### Archivos principales en la raíz
- package.json: define dependencias, scripts y configuración del proyecto.
- README.md: documentación base generada por Vite; todavía necesita adaptación al proyecto real.
- DOCUMENTATION.md: este archivo, donde se documenta el estado actual del sistema.
- index.html: archivo HTML base de la aplicación.
- vite.config.ts: configuración principal de Vite.
- tsconfig.json, tsconfig.app.json, tsconfig.node.json: configuración de TypeScript.
- env.d.ts: definiciones de tipos para Vite y módulos.
- public/: carpeta para archivos estáticos que se sirven directamente.

### Carpeta src/
Contiene toda la lógica de la aplicación.

---

## 5. Documentación por carpetas

### 5.1 Carpeta src/
Esta carpeta concentra la lógica de negocio, componentes, rutas, stores y tipos.

Archivos dentro de src:
- main.ts: punto de entrada de la aplicación. Inicializa Vue, Pinia y Vue Router y monta la app en el DOM.
- App.vue: componente raíz que define el layout general y carga la vista actual mediante RouterView.

### 5.2 Carpeta src/router/
Contiene la configuración de rutas del proyecto.

- index.ts: define las rutas principales:
  - / para la vista de caja (POS).
  - /productos para la vista de administración.
  - /historial para el historial de ventas.

### 5.3 Carpeta src/types/
Aquí viven los tipos compartidos de la aplicación.

- index.ts: re-exporta los tipos centralizados del proyecto.
- products.ts: define la interfaz Product y los tipos de categorías disponibles.
- sale.ts: define las estructuras para ventas y métodos de pago.

### 5.4 Carpeta src/stores/
Contiene los stores de Pinia, que manejan el estado global.

- useCartStore.ts: administra el carrito activo, cantidades, total, método de pago y monto pagado.
- useProductStore.ts: administra el catálogo de productos, filtros, búsqueda y ordenamiento.
- useSaleHistoryStore.ts: guarda el historial de ventas registradas.

### 5.5 Carpeta src/services/
Esta carpeta simula la capa de servicios o acceso a datos.

- cart.service.ts: contiene lógica de ayuda para cálculos del carrito, redondeo y actualización de productos en el carrito.
- productService.ts: servicio que obtiene productos. En este momento simula una carga asíncrona.
- mockProducts.ts: base de datos mock local con productos de ejemplo.

### 5.6 Carpeta src/composables/
Contiene composables reutilizables para lógica de negocio.

- useSaleCheckout.ts: encapsula la lógica para confirmar una venta y registrar el historial.

### 5.7 Carpeta src/components/
Aquí están los componentes visuales reutilizables.

#### 5.7.1 Carpeta src/components/layout/
- AppNavbar.vue: barra de navegación inferior con accesos a Caja, Productos e Historial.

#### 5.7.2 Carpeta src/components/pos/
- ProductCard.vue: tarjeta visual de cada producto en el POS.
- CartDrawer.vue: panel lateral o desplegable que muestra los productos agregados al carrito.
- CheckoutModal.vue: modal para seleccionar método de pago y confirmar la venta.
- ProductFilters.vue: filtros de búsqueda, categoría y ordenamiento del catálogo.

#### 5.7.3 Carpeta src/components/admin/
- ProductFormModal.vue: modal para crear o editar productos desde la administración.

### 5.8 Carpeta src/views/
Aquí están las vistas principales de la aplicación.

- POSView.vue: vista principal para ventas en caja.
- ProductsAdminView.vue: vista para administrar productos.
- SalesHistoryView.vue: vista para ver las ventas registradas.

### 5.9 Carpeta src/assets/
Contiene recursos estáticos y utilidades visuales.

- utils/CategoryColor.ts: mapa de colores por categoría para mostrar productos con distinto estilo visual.

---

## 6. Documentación archivo por archivo

### Archivos raíz
- package.json: define scripts importantes como dev, build y type-check. También incluye dependencias de Vue, Pinia, Router y herramientas de desarrollo.
- README.md: documento predeterminado de Vite. Se recomienda reemplazarlo por una guía propia del proyecto.
- DOCUMENTATION.md: archivo central de documentación del proyecto.
- index.html: plantilla HTML inicial cargada por Vite.
- vite.config.ts: configura el alias @ hacia src y activa Vue DevTools.
- tsconfig.json: configuración base de TypeScript.
- tsconfig.app.json: configuración específica para código de la aplicación.
- tsconfig.node.json: configuración específica para archivos de Node/Vite.
- env.d.ts: habilita tipos globales para archivos .vue y módulos Vite.

### src/main.ts
- Inicializa Vue.
- Registra Pinia y Vue Router.
- Monta la aplicación en el elemento #app.

### src/App.vue
- Componente raíz del layout.
- Muestra el contenido dinámico con RouterView y la barra de navegación inferior.
- Define estilos globales básicos para la app.

### src/router/index.ts
- Configura las rutas de navegación.
- Carga de forma lazy la vista de administración y de historial.

### src/types/products.ts
- Define el tipo Product.
- Contiene las categorías permitidas para los productos.
- Es la base para mantener consistencia de datos en todos los componentes y stores.

### src/types/sale.ts
- Define el modelo de venta.
- Incluye los productos vendidos, total, monto pagado, vuelto, método de pago y fecha de creación.

### src/types/index.ts
- Centraliza la exportación de tipos compartidos.

### src/stores/useCartStore.ts
- Gestiona el estado del carrito.
- Permite agregar productos, modificar cantidades, eliminar productos y limpiar el carrito.
- Calcula el total, el vuelto y el número total de ítems.

### src/stores/useProductStore.ts
- Administra la lista de productos.
- Incluye filtrado por texto, categoría y ordenamiento.
- Permite agregar, actualizar y eliminar productos localmente.

### src/stores/useSaleHistoryStore.ts
- Guarda el registro de ventas confirmadas.
- Las ventas quedan en memoria y se muestran en la vista de historial.

### src/services/cart.service.ts
- Contiene funciones auxiliares para el carrito.
- Centraliza el redondeo de precios y los cálculos de subtotal.

### src/services/productService.ts
- Simula la obtención de productos desde una fuente externa.
- En este momento devuelve los productos mockeados tras un pequeño delay.

### src/services/mockProducts.ts
- Contiene la lista inicial de productos usados por la aplicación.
- Será el primer punto de reemplazo cuando se integre PostgreSQL.

### src/composables/useSaleCheckout.ts
- Encapsula la lógica de confirmación de venta.
- Crea el objeto de venta, lo registra y limpia el carrito.

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

---

## 7. Flujo de uso actual de la aplicación
1. El usuario entra a la vista de caja.
2. El catálogo se carga desde el servicio mock.
3. Al seleccionar un producto, se agrega al carrito.
4. El usuario puede modificar cantidades o limpiar el carrito.
5. Al abrir el checkout, elige el método de pago y confirma la venta.
6. La venta queda registrada en memoria y aparece en el historial.
7. Desde la vista de administración se pueden agregar o modificar productos.

---

## 8. Notas importantes para el futuro
- Actualmente no existe persistencia real; todo vive en memoria.
- Los stores son el punto central de estado, pero deberán adaptarse cuando se conecte PostgreSQL.
- El archivo mockProducts.ts será reemplazado por una capa de servicio que consulte a la base de datos.
- El proyecto está listo para evolucionar hacia una arquitectura más backend-driven.

---

## 9. Próximos pasos recomendados
- Crear una API o servicio backend para PostgreSQL.
- Definir tablas para productos y ventas.
- Reemplazar los datos mock por consultas reales.
- Separar más claramente la lógica de negocio de la interfaz.
- Añadir validaciones, manejo de errores y persistencia real.
