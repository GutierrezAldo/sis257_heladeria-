<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { useAuthStore } from '@/stores/index'
import { parseJwt } from '@/helpers/index'
import type { Producto } from '@/models/producto'
import type { Cliente } from '@/models/cliente'
import type { ItemCarrito, Venta } from '@/models/venta'
import VentaDetalleModal from '@/components/venta/VentaDetalleModal.vue'
import { Button, Column, DataTable, InputNumber, Select } from 'primevue'

const authStore = useAuthStore()

const productos = ref<Producto[]>([])
const clientes = ref<Cliente[]>([])
const ventas = ref<Venta[]>([])
const clienteSeleccionado = ref<number | null>(null)
const carrito = ref<ItemCarrito[]>([])
const procesando = ref(false)
const mostrarDetalle = ref(false)
const ventaSeleccionada = ref<Venta | null>(null)

function verDetalle(venta: Venta) {
  ventaSeleccionada.value = venta
  mostrarDetalle.value = true
}

async function cargarDatos() {
  const [resProd, resCli, resVen] = await Promise.all([
    http.get('productos'),
    http.get('clientes'),
    http.get('ventas'),
  ])
  productos.value = resProd.data.filter((p: Producto) => p.estado === 'ACTIVO' && p.stock > 0)
  clientes.value = resCli.data
  ventas.value = resVen.data
}

function agregarAlCarrito(producto: Producto) {
  const existente = carrito.value.find((item) => item.producto.id === producto.id)
  if (existente) {
    if (existente.cantidad < producto.stock) {
      existente.cantidad++
      existente.subtotal = Number((existente.cantidad * Number(producto.precio)).toFixed(2))
    } else {
      alert(`Solo hay ${producto.stock} unidades disponibles de ${producto.nombre}`)
    }
  } else {
    carrito.value.push({
      producto,
      cantidad: 1,
      subtotal: Number(producto.precio),
    })
  }
}

function actualizarSubtotal(item: ItemCarrito) {
  if (!item.cantidad || item.cantidad < 1) item.cantidad = 1
  if (item.cantidad > item.producto.stock) item.cantidad = item.producto.stock
  item.subtotal = Number((item.cantidad * Number(item.producto.precio)).toFixed(2))
}

function quitarDelCarrito(index: number) {
  carrito.value.splice(index, 1)
}

const totalVenta = computed(() => {
  return Number(carrito.value.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2))
})

async function registrarVenta() {
  if (!clienteSeleccionado.value) {
    alert('Debe seleccionar un cliente')
    return
  }
  if (carrito.value.length === 0) {
    alert('Debe agregar al menos un producto al carrito')
    return
  }

  procesando.value = true
  try {
    const payload = parseJwt(authStore.token || '')
    const idUsuario = payload.sub

    // 1. Crear la cabecera de la venta
    const ventaBody = {
      idUsuario,
      idCliente: clienteSeleccionado.value,
      fecha: new Date().toISOString().split('T')[0],
      totalVenta: totalVenta.value,
      estado: 'COMPLETADA',
    }
    const resVenta = await http.post('ventas', ventaBody)
    const idVenta = resVenta.data.id

    // 2. Guardar cada detalle y descontar el stock del producto
    for (const item of carrito.value) {
      await http.post('venta-detalles', {
        idVenta,
        idProducto: item.producto.id,
        cantidad: item.cantidad,
        precioUnitario: Number(item.producto.precio),
        total: item.subtotal,
      })

      await http.patch(`productos/${item.producto.id}`, {
        stock: item.producto.stock - item.cantidad,
      })
    }

    alert('¡Venta registrada exitosamente!')
    carrito.value = []
    clienteSeleccionado.value = null
    await cargarDatos()
  } catch (error: any) {
    const msg = error?.response?.data?.message
    alert(Array.isArray(msg) ? msg.join('\n') : msg || 'Error al registrar la venta')
  } finally {
    procesando.value = false
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <div class="container my-5 py-4">
    <h1 class="mb-4">Punto de Venta (POS)</h1>

    <div class="row">
      <!-- Catálogo de Helados -->
      <div class="col-lg-7 mb-4">
        <h4 class="mb-3">Productos Disponibles</h4>
        <div class="row">
          <div v-for="producto in productos" :key="producto.id" class="col-md-6 mb-4">
            <div class="product-item d-flex flex-column align-items-center text-center bg-light rounded py-4 px-3 h-100 shadow-sm">
              <div class="bg-primary py-2 px-3 rounded mb-3">
                <h5 class="font-weight-bold text-white mb-0">Bs. {{ producto.precio }}</h5>
              </div>
              <div class="position-relative bg-primary rounded-circle mb-3 p-2" style="width: 110px; height: 110px;">
                <img
                  :src="producto.imagen || '/images/product-1.jpg'"
                  alt="producto"
                  class="rounded-circle w-100 h-100"
                  style="object-fit: cover;"
                />
              </div>
              <h5 class="font-weight-bold mb-1">{{ producto.nombre }}</h5>
              <small class="text-muted mb-3">Stock disponible: {{ producto.stock }}</small>
              <Button
                label="Agregar"
                icon="pi pi-shopping-cart"
                size="small"
                @click="agregarAlCarrito(producto)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Carrito / Ticket -->
      <div class="col-lg-5 mb-4">
        <div class="bg-light rounded p-4 shadow-sm">
          <h4 class="mb-3">Detalle de Venta</h4>

          <div class="mb-3">
            <label class="font-weight-bold d-block mb-1">Cliente:</label>
            <Select
              v-model="clienteSeleccionado"
              :options="clientes"
              optionLabel="razonSocial"
              optionValue="id"
              placeholder="Seleccione un cliente"
              class="w-100"
            />
          </div>

          <table class="table table-sm mt-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th style="width: 90px">Cant.</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in carrito" :key="item.producto.id">
                <td class="align-middle">{{ item.producto.nombre }}</td>
                <td class="align-middle">
                  <InputNumber
                    v-model="item.cantidad"
                    :min="1"
                    :max="item.producto.stock"
                    :inputStyle="{ width: '60px', padding: '4px' }"
                    @update:modelValue="actualizarSubtotal(item)"
                  />
                </td>
                <td class="align-middle">Bs. {{ item.subtotal.toFixed(2) }}</td>
                <td class="align-middle">
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    text
                    size="small"
                    @click="quitarDelCarrito(index)"
                  />
                </td>
              </tr>
              <tr v-if="carrito.length === 0">
                <td colspan="4" class="text-center text-muted py-3">El carrito está vacío</td>
              </tr>
            </tbody>
          </table>

          <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
            <h4 class="mb-0">Total:</h4>
            <h4 class="mb-0 text-primary font-weight-bold">Bs. {{ totalVenta.toFixed(2) }}</h4>
          </div>

          <Button
            label="Registrar Venta"
            icon="pi pi-check"
            class="w-100 mt-4"
            :loading="procesando"
            :disabled="carrito.length === 0 || !clienteSeleccionado"
            @click="registrarVenta"
          />
        </div>
      </div>
    </div>

    <!-- Historial de Ventas -->
    <div class="mt-5">
      <h3 class="mb-3">Historial de Ventas</h3>
      <DataTable :value="ventas" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" stripedRows>
        <Column header="Nro.">
          <template #body="{ index }">{{ index + 1 }}</template>
        </Column>
        <Column field="fecha" header="Fecha" />
        <Column header="Cliente">
          <template #body="{ data }">{{ data.cliente?.razonSocial || 'S/N' }}</template>
        </Column>
        <Column header="Vendedor">
          <template #body="{ data }">{{ data.usuario?.usuario || '-' }}</template>
        </Column>
        <Column field="totalVenta" header="Total (Bs.)" />
        <Column field="estado" header="Estado" />
        <Column header="Acciones">
          <template #body="{ data }">
            <Button icon="pi pi-eye" text @click="verDetalle(data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <VentaDetalleModal
      :mostrar="mostrarDetalle"
      :venta="ventaSeleccionada"
      @close="mostrarDetalle = false"
    />
  </div>
</template>

<style scoped></style>

