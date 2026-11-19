import type { Cliente } from './cliente'
import type { Producto } from './producto'

export interface Venta {
  id: number
  fecha: string
  totalVenta: number
  estado: string
  cliente?: Cliente
  usuario?: { id: number; usuario: string }
}

export interface VentaDetalle {
  id: number
  idVenta: number
  idProducto: number
  cantidad: number
  precioUnitario: number
  total: number
  producto?: Producto
}

export interface ItemCarrito {
  producto: Producto
  cantidad: number
  subtotal: number
}