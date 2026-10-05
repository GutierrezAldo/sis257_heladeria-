Tienda de Helados Artesanales 

# 🍦 Heladería NOVA

Bienvenido al repositorio oficial del sistema de gestión para la heladería **NOVA**. Sis 257 
Este proyecto tiene como objetivo digitalizar los procesos internos del negocio, permitiendo un mejor control de productos, ventas, clientes y personal.

# 🧊 Descripción del Negocio
Un punto de venta para una heladería, desarrollado como aplicación web.
un POS web no solo mejora la operación diaria, sino que genera información estratégica que ayuda al dueño a tomar decisiones más inteligentes, aumentar ventas, reducir costos y mejorar la satisfacción del cliente.
desarrollar un punto de venta web para una heladería tiene varias ventajas estratégicas y operativas
Automatiza el registro de ventas, evitando errores de cálculo manual.

Reduce el tiempo de atención al cliente en caja.

Permite manejar múltiples pedidos simultáneamente, ideal en horas pico.

Con La funcionalidad Principal de lograr 

- El Crud de 2 Catálogos
- Login
- Compra o Venta

## 🧩🥶 Entidades del Sistema

### 🧁 producto ###
- `id_producto (PK)`
- `nombre`
- `precio`

### ❄️ empleado ###
- `id_empleado (PK)`
- `nombre`
- `apellido`
- `cargo`
- `teléfono`
- `direcciòn`

### 👤 usuario ###
- `id_usuario(PK)`
- `id_empleado(FK)`
- `usuario`
- `clave`

### 🚚 proveedor ###
- `id_proveedor (PK)`
- `nit`
- `teléfono`
- `tipo_producto`

### 🍓 sabor ###
- `id_sabor (PK)`
- `id_producto (FK)`
- `nombre`

### 🍨 tamaños ###
- `id_tamaño (PK)`
- `id_producto (FK)`
- `nombre`

### 🍧 presentaciones ###
- `id_presentación (PK)`
- `id_producto (FK)`
- `nombre`

### 👤 cliente ###
- `id_cliente (PK)`
- `ci`
- `drazon_social`
- `teléfono`

### 💰 venta ###
- `id_venta (PK)`
- `id_usuario (FK)`
- `id_cliente(FK)`
- `fecha`

### 📦 venta_detalle ###
- `id_detalle (PK)`
- `id_venta (FK)`
- `id_producto (FK)`
- `cantidad`
- `precio_unitario`
- `total`

### 🛒 pedido ###
- `id_pedido (PK)`
- `id_cliente (FK)`
- `id_empleado (FK)`
- `fecha_pedido`
- `tipo_pago`
- `estado`
