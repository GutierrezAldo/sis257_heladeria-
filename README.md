# 🍦 Heladería NOVA

Bienvenido al repositorio oficial del sistema de gestión para la heladería **NOVA**. 
Este proyecto tiene como objetivo digitalizar los procesos internos del negocio, permitiendo un mejor control de inventario, productos, ventas, compras, clientes y personal.

# 🧊 Descripción del Negocio
Un punto de venta (POS) para una heladería, desarrollado como aplicación web.
Un POS web no solo mejora la operación diaria, sino que genera información estratégica que ayuda al dueño a tomar decisiones más inteligentes, aumentar ventas, reducir costos y mejorar la satisfacción del cliente.

Desarrollar un punto de venta web para una heladería tiene varias ventajas estratégicas y operativas:
- Automatiza el registro de ventas, evitando errores de cálculo manual.
- Controla el inventario de forma dinámica con cada compra y venta.
- Reduce el tiempo de atención al cliente en caja.
- Permite manejar múltiples pedidos simultáneamente, ideal en horas pico.

Con la funcionalidad principal de lograr:
- El CRUD de Catálogos (Productos, Insumos, Usuarios, Clientes, etc.)
- Login y Control de Acceso (Roles)
- Gestión de Compra (Abastecimiento) y Venta (Facturación)

## 🧩🥶 Entidades del Sistema

### 🧁 producto
- `id_producto (PK)`
- `nombre`
- `precio`
- `stock` 
- `estado`

### ❄️ empleado
- `id_empleado (PK)`
- `nombre`
- `apellido`
- `cargo`
- `teléfono`
- `direcciòn`

### 🛡️ rol 
- `id_rol (PK)`
- `nombre_rol`
- `descripcion`

### 👤 usuario
- `id_usuario (PK)`
- `id_empleado (FK)`
- `id_rol (FK)` 
- `usuario`
- `clave`
- `estado`

### 🚚 proveedor
- `id_proveedor (PK)`
- `nit`
- `teléfono`
- `tipo_producto`
- `direccion`
- `email`

### 🍓 sabor
- `id_sabor (PK)`
- `id_producto (FK)`
- `nombre`

### 🍨 tamaños
- `id_tamaño (PK)`
- `id_producto (FK)`
- `nombre`

### 🍧 presentaciones
- `id_presentación (PK)`
- `id_producto (FK)`
- `nombre`

### 👤 cliente
- `id_cliente (PK)`
- `ci`
- `razon_social`
- `teléfono`
- `email` 

### 📥 compra 
- `id_compra (PK)`
- `id_proveedor (FK)`
- `id_usuario (FK)`
- `fecha`
- `total_compra`

### 🧾 compra_detalle 
- `id_detalle_compra (PK)`
- `id_compra (FK)`
- `id_producto (FK)`
- `cantidad`
- `precio_unitario`
- `subtotal`

### 💰 venta
- `id_venta (PK)`
- `id_usuario (FK)`
- `id_cliente (FK)`
- `fecha`
- `total_venta` 
- `estado`

### 📦 venta_detalle
- `id_detalle (PK)`
- `id_venta (FK)`
- `id_producto (FK)`
- `cantidad`
- `precio_unitario`
- `total`

### 🛒 pedido
- `id_pedido (PK)`
- `id_cliente (FK)`
- `id_empleado (FK)`
- `fecha_pedido`
- `tipo_pago`
- `estado`
- `total_pedido`