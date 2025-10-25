import type { Cliente } from './cliente'
import type { Usuario } from './usuario'

export interface DetalleVenta {
  producto: {
    id: number
    nombre: string
    precio: number
    [key: string]: any
  }
  cantidad: number
  precioUnitario: number
}

export interface Venta {
  id: number
  idCliente: number
  cliente: Cliente
  idUsuario: number
  usuario: Usuario
  metodoPago: string
  totalVenta: number
  estado: string
  detalles: DetalleVenta[]
  fechaCreacion: Date
}
