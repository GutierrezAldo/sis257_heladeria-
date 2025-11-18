import type { Cliente } from './cliente'
import type { Usuario } from './usuario'

// Definir el tipo para sabor
export interface Sabor {
  id: number
  nombre: string
  descripcion: string
  precio: number
  fechaCreacion: string
  fechaModificacion: string
  fechaEliminacion: string | null
}

// Definir el tipo para presentación
export interface Presentacion {
  id: number
  nombre: string
  precio: number
  fechaCreacion: string
  fechaModificacion: string
  fechaEliminacion: string | null
}

// Definir el tipo para tamaño
export interface Tamaño {
  id: number
  nombre: string
  cantidadBolas: string
  precio: number
  fechaCreacion: string
  fechaModificacion: string
  fechaEliminacion: string | null
}

// Definir el tipo para los detalles de venta (para mostrar)
export interface DetalleVenta {
  id: number
  cantidad: string
  precioSabor: string
  precioPresentacion: string
  precioTamaño: string
  precioUnitario: string
  subtotal: string
  fechaCreacion: string
  fechaAnulacion: string | null
  fechaEliminacion: string | null
  sabor: Sabor
  presentacion: Presentacion
  tamaño: Tamaño
}

// Definir el tipo para crear detalles de venta (para carrito y envío)
export interface DetalleVentaCarrito {
  sabor: Sabor
  presentacion: Presentacion
  tamaño: Tamaño
  cantidad: number
  precioUnitario: number
}

export interface Venta {
  id: number
  totalVenta: string
  nombreCliente: string
  documento: string
  metodoPago: string
  estado: string
  fechaCreacion: string
  fechaEliminacion: string | null
  fechaAnulacion: string | null
  montoPagado: string
  cambio: string
  usuario: {
    id: number
    usuario: string
    email: string
    fechaCreacion: string
    fechaModificacion: string
    fechaEliminacion: string | null
  }
  ventadetalles: DetalleVenta[]
}
