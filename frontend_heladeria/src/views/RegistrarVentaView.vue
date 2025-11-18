<template>
  <div class="pos-container">
    <div class="pos-layout">
      <!-- Panel izquierdo - Botón para crear helado -->
      <div class="products-panel">
        <div class="products-header">
          <h2 class="panel-title"><i class="pi pi-star"></i> Crear Helado Personalizado</h2>
          <p class="panel-description">Selecciona sabor, presentación y tamaño</p>
        </div>

        <div class="create-helado-section">
          <Button
            label="Crear Nuevo Helado"
            icon="pi pi-plus-circle"
            class="btn-crear-helado"
            @click="abrirModalHeladeria"
            size="large"
          />

          <div class="info-cards">
            <div class="info-card">
              <i class="pi pi-star card-icon"></i>
              <div class="card-content">
                <strong>Sabores</strong>
                <span>{{ sabores.length }} disponibles</span>
              </div>
            </div>
            <div class="info-card">
              <i class="pi pi-box card-icon"></i>
              <div class="card-content">
                <strong>Presentaciones</strong>
                <span>{{ presentaciones.length }} disponibles</span>
              </div>
            </div>
            <div class="info-card">
              <i class="pi pi-circle card-icon"></i>
              <div class="card-content">
                <strong>Tamaños</strong>
                <span>{{ tamaños.length }} disponibles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel derecho - Carrito y checkout -->
      <div class="checkout-panel">
        <!-- Sección de cliente -->
        <div class="customer-section">
          <div class="customer-header">
            <h3>
              <i class="pi pi-user"></i>
              Cliente
            </h3>
            <Button
              icon="pi pi-sign-out"
              class="p-button-text p-button-lg"
              @click="cancelar"
              v-tooltip.top="'Salir del registro de venta'"
            />
          </div>

          <div class="customer-inputs">
            <div class="input-group">
              <label>Nombre del Cliente</label>
              <InputText
                v-model="ventaForm.nombreCliente"
                placeholder="Nombre completo"
                class="w-full"
              />
            </div>
            <div class="input-group">
              <label>Documento</label>
              <InputText v-model="ventaForm.documento" placeholder="CI o NIT" class="w-full" />
            </div>
          </div>
        </div>

        <!-- Carrito de compras -->
        <div class="cart-section">
          <div class="cart-header">
            <h3>
              <i class="pi pi-shopping-cart"></i>
              Carrito ({{ detallesVenta.length }})
            </h3>
            <Button
              icon="pi pi-trash"
              class="p-button-text p-button-sm p-button-danger"
              @click="limpiarCarrito"
              :disabled="detallesVenta.length === 0"
              v-tooltip.top="'Limpiar carrito'"
            />
          </div>

          <div
            class="cart-items"
            v-if="detallesVenta.length > 0"
            style="max-height: 250px; overflow-y: auto"
          >
            <div v-for="(item, index) in detallesVenta" :key="index" class="cart-item">
              <div class="item-info">
                <h4 class="item-name">{{ item.sabor.nombre }}</h4>
                <div class="item-details">
                  <span class="detail-badge">{{ item.presentacion.nombre }}</span>
                  <span class="detail-badge">{{ item.tamaño.nombre }}</span>
                </div>
                <div class="item-price">{{ item.precioUnitario.toFixed(2) }} Bs c/u</div>
              </div>
              <div class="item-controls">
                <div class="quantity-controls">
                  <Button
                    icon="pi pi-minus"
                    class="p-button-text quantity-btn"
                    @click="decrementarCantidad(index)"
                    :disabled="item.cantidad <= 1"
                  />
                  <span class="quantity">{{ item.cantidad }}</span>
                  <Button
                    icon="pi pi-plus"
                    class="p-button-text quantity-btn"
                    @click="incrementarCantidad(index)"
                  />
                </div>
                <div class="item-total">
                  {{ (item.cantidad * item.precioUnitario).toFixed(2) }} Bs
                </div>
                <Button
                  icon="pi pi-times"
                  class="p-button-text p-button-sm remove-btn"
                  @click="eliminarProducto(index)"
                />
              </div>
            </div>
          </div>

          <div class="cart-empty" v-else>
            <i class="pi pi-shopping-cart empty-icon"></i>
            <p>Carrito vacío</p>
            <small>Crea un helado para agregar</small>
          </div>
        </div>

        <!-- Totales y pago -->
        <div class="payment-section" v-if="detallesVenta.length > 0">
          <div class="totals">
            <div class="total-row main-total">
              <span>Total:</span>
              <span class="amount">{{ totalVenta.toFixed(2) }} Bs</span>
            </div>
          </div>

          <div class="payment-input">
            <label>Pago recibido</label>
            <div class="payment-field">
              <InputNumber
                v-model="pagoCliente"
                mode="currency"
                currency="BOB"
                locale="es-BO"
                class="w-full"
              />
            </div>
          </div>

          <div class="change-display" v-if="pagoCliente && pagoCliente >= totalVenta">
            <div class="change-row">
              <span>Cambio:</span>
              <span class="change-amount">{{ cambio.toFixed(2) }} Bs</span>
            </div>
          </div>

          <div class="checkout-actions">
            <Button
              label="Procesar Venta"
              icon="pi pi-check"
              class="p-button-lg checkout-btn"
              @click="guardarVenta"
              :disabled="!puedeCompletarVenta || submitting"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de heladería -->
    <HeladeríaModal
      v-model:visible="mostrarModalHeladeria"
      :sabores="sabores"
      :presentaciones="presentaciones"
      :tamaños="tamaños"
      @confirm="agregarHeladoAlCarrito"
      @close="mostrarModalHeladeria = false"
    />

    <!-- Modal de Venta Exitosa -->
    <VentaExitosaModal v-if="mostrarModalExito" @otra-venta="onOtraVenta" @ir-ventas="onIrVentas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import http from '../plugins/axios'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import type { DetalleVentaCarrito, Sabor, Presentacion, Tamaño } from '@/models/venta'
import HeladeríaModal from '../components/venta/HeladeríaModal.vue'
import VentaExitosaModal from '../components/venta/VentaExitosaModal.vue'
import { useAuthStore } from '@/stores'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const usuarioId = authStore.userId || null


const pagoCliente = ref<number | null>(null)
const sabores = ref<Sabor[]>([])
const presentaciones = ref<Presentacion[]>([])
const tamaños = ref<Tamaño[]>([])

// Modal de cliente y heladería
const mostrarModalHeladeria = ref(false)

// Modal de venta exitosa
const mostrarModalExito = ref(false)

// Formulario de venta
const ventaForm = ref({
  nombreCliente: '',
  documento: '',
  usuarioId: usuarioId,
  metodoPago: 'efectivo',
  detalles: [],
})

// Tabla de productos seleccionados
const detallesVenta = ref<DetalleVentaCarrito[]>([])
const submitting = ref(false)

// Total de la venta
const totalVenta = computed(() => {
  return detallesVenta.value.reduce((total, item) => {
    return total + item.cantidad * item.precioUnitario
  }, 0)
})

const cambio = computed(() => {
  if (pagoCliente.value === null) return 0
  return Math.max(0, pagoCliente.value - totalVenta.value)
})

const puedeCompletarVenta = computed(() => {
  const checks = {
    nombreCliente: ventaForm.value.nombreCliente.trim() !== '',
    documento: ventaForm.value.documento.trim() !== '',
    usuarioId: usuarioId !== null && usuarioId !== '',
    detalles: detallesVenta.value.length > 0,
    pagoCliente: pagoCliente.value !== null,
    montoSuficiente: pagoCliente.value !== null && pagoCliente.value >= totalVenta.value
  }
  const resultado = checks.nombreCliente &&
    checks.documento &&
    checks.usuarioId &&
    checks.detalles &&
    checks.pagoCliente &&
    checks.montoSuficiente
  
  return resultado
})

// Cargar datos iniciales
async function cargarDatos() {
  try {
    const [saboresResp, presentacionesResp, tamañosResp] = await Promise.all([
      http.get('sabores'),
      http.get('presentaciones'),
      http.get('tamanos'),
    ])

    sabores.value = saboresResp.data
    presentaciones.value = presentacionesResp.data
    tamaños.value = tamañosResp.data
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar los datos necesarios',
      life: 3000,
    })
  }
}

// Abrir modal de heladería
function abrirModalHeladeria() {
  mostrarModalHeladeria.value = true
}

// Agregar helado al carrito
function agregarHeladoAlCarrito(
  sabor: Sabor,
  presentacion: Presentacion,
  tamaño: Tamaño,
  cantidad: number,
) {
  const precioUnitario =
    parseFloat(String(sabor.precio)) +
    parseFloat(String(presentacion.precio)) +
    parseFloat(String(tamaño.precio))

  // Verificar si ya existe la misma combinación
  const index = detallesVenta.value.findIndex(
    (item) =>
      item.sabor.id === sabor.id &&
      item.presentacion.id === presentacion.id &&
      item.tamaño.id === tamaño.id,
  )

  if (index >= 0) {
    detallesVenta.value[index].cantidad += cantidad
  } else {
    detallesVenta.value.push({
      sabor,
      presentacion,
      tamaño,
      cantidad,
      precioUnitario,
    })
  }

  toast.add({
    severity: 'success',
    summary: 'Helado agregado',
    detail: 'El helado se agregó al carrito',
    life: 2000,
  })
}

// Controles de cantidad en el carrito
function incrementarCantidad(index: number) {
  const item = detallesVenta.value[index]
  item.cantidad++
}

function decrementarCantidad(index: number) {
  const item = detallesVenta.value[index]
  if (item.cantidad > 1) {
    item.cantidad--
  }
}

// Eliminar producto del carrito
function eliminarProducto(index: number) {
  detallesVenta.value.splice(index, 1)
}

// Limpiar carrito
function limpiarCarrito() {
  detallesVenta.value = []
  pagoCliente.value = null
}

// Limpiar formulario de venta
function limpiarFormularioVenta() {
  ventaForm.value.nombreCliente = ''
  ventaForm.value.documento = ''
  ventaForm.value.usuarioId = usuarioId
  detallesVenta.value = []
  pagoCliente.value = null
}

// Guardar venta
async function guardarVenta() {
  if (!puedeCompletarVenta.value) return

  submitting.value = true

  try {
    const ventaData = {
      idUsuario: Number(ventaForm.value.usuarioId),
      metodoPago: 'efectivo',
      nombreCliente: ventaForm.value.nombreCliente,
      documento: ventaForm.value.documento,
      montoPagado: pagoCliente.value,
      cambio: cambio.value,
      detalles: detallesVenta.value.map((item) => ({
        idSabor: item.sabor.id,
        idPresentacion: item.presentacion.id,
        idTamaño: item.tamaño.id,
        cantidad: item.cantidad,
      })),
    }

    await http.post('ventas', ventaData)

    toast.add({
      severity: 'success',
      summary: 'Venta procesada',
      detail: 'La venta se registró correctamente',
      life: 1000,
    })
    mostrarModalExito.value = true
    limpiarFormularioVenta()
  } catch (error) {
    let detailMessage = 'No se pudo procesar la venta'
    const err = error as { response?: { data?: { message?: string } } }
    if (err.response && err.response.data?.message) {
      detailMessage = err.response.data.message
    }

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: detailMessage,
      life: 3000,
    })
  } finally {
    submitting.value = false
  }
}

function onOtraVenta() {
  mostrarModalExito.value = false
  limpiarFormularioVenta()
}
function onIrVentas() {
  mostrarModalExito.value = false
  router.push('/ventas')
}

function cancelar() {
  router.push('/ventas')
}

onMounted(() => {
  cargarDatos()
})
</script>

<style scoped>
.pos-container {
  background: #f8fafc;
  min-height: 100vh;
  padding: 32px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Nunito', 'Segoe UI', Arial, sans-serif;
}

.pos-layout {
  display: flex;
  gap: 32px;
  width: 1200px;
  min-width: 90vw;
}

.products-panel {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.07);
  padding: 24px 18px;
  width: 420px;
  min-width: 72%;
  display: flex;
  flex-direction: column;
}

.products-header {
  margin-bottom: 18px;
}

.search-section {
  margin-bottom: 8px;
}

.search-input {
  width: 100%;
}

.products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 8px;
}

.product-card {
  background: #f0f4ff;
  border-radius: 14px;
  padding: 14px 12px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid transparent;
  margin: 4px;
}

.product-card:hover {
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
  border-color: #aee6f9;
  transform: translateY(-2px) scale(1.02);
}

.product-card.out-of-stock {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f8d7da;
  border-color: #f5c2c7;
}

.product-image {
  background: #fce4ec;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-icon {
  font-size: 2rem;
  color: #fc95c4;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: #3b3b3b;
}

.product-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.product-price {
  color: #fc95c4;
  font-weight: 600;
}

.product-stock {
  font-size: 0.92em;
  color: #28a745;
}

.product-stock.low-stock {
  color: #ff9800;
  font-weight: 700;
}

.product-stock.no-stock {
  color: #e53935;
  font-weight: 700;
}

.checkout-panel {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.07);
  padding: 24px 18px;
  width: 420px;
  min-width: 30%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.customer-section {
  margin-bottom: 18px;
}

.customer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.customer-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fc95c4;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
}

.customer-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.customer-select {
  margin-bottom: 10px;
}

.cashier-section label {
  font-size: 0.98em;
  color: #888;
  margin-bottom: 2px;
  display: block;
}

.cart-section {
  background: #f6faff;
  border-radius: 12px;
  padding: 14px 10px;
  margin-bottom: 10px;
  min-height: 120px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.03);
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.cart-header h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #3b3b3b;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 8px;
  padding: 8px 10px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.04);
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 2px 0;
}

.item-price {
  font-size: 0.95em;
  color: #fc95c4;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.quantity-btn {
  background: #fce4ec !important;
  color: #fc95c4 !important;
  border-radius: 50% !important;
  width: 28px !important;
  height: 28px !important;
  font-size: 1.1em !important;
}

.quantity {
  font-size: 1.05em;
  font-weight: 600;
  width: 24px;
  text-align: center;
}

.item-total {
  font-size: 1em;
  font-weight: 600;
  color: #d81b60;
  min-width: 70px;
  text-align: right;
}

.remove-btn {
  color: #e53935 !important;
}

.cart-empty {
  text-align: center;
  color: #b0bec5;
  padding: 18px 0 8px 0;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 6px;
  color: #b0bec5;
}

.payment-section {
  background: #fce4ec;
  border-radius: 12px;
  padding: 16px 12px;
  margin-top: 8px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.04);
}

.totals {
  margin-bottom: 10px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.05em;
  margin-bottom: 4px;
}

.main-total {
  font-size: 1.15em;
  font-weight: 700;
  color: #fc95c4;
}

.amount {
  font-weight: 700;
}

.payment-input label {
  font-size: 0.98em;
  color: #888;
  margin-bottom: 2px;
  display: block;
}

.payment-field {
  margin-bottom: 8px;
}

.change-display {
  margin: 8px 0;
  background: #fffde7;
  border-radius: 8px;
  padding: 8px 10px;
  color: #fbc02d;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.change-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.change-amount {
  color: #d81b60;
  font-size: 1.1em;
  font-weight: 700;
}

.checkout-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.checkout-btn {
  background: linear-gradient(90deg, #fc95c4 0%, #f48fb1 100%);
  color: #fff;
  border: none;
  font-size: 1.1em;
  font-weight: 700;
  border-radius: 8px;
  padding: 10px 24px;
  box-shadow: 0 2px 8px 0 rgba(252, 149, 196, 0.2);
  transition: background 0.2s;
}

.checkout-btn:disabled {
  background: #f8bbd0;
  color: #fff;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .pos-layout {
    flex-direction: column;
    width: 98vw;
    gap: 18px;
  }

  .products-panel,
  .checkout-panel {
    width: 100%;
    min-width: unset;
  }
}

.btn-crear-helado {
  width: 100%;
  background: linear-gradient(90deg, #fc95c4 0%, #f48fb1 100%) !important;
  border: none !important;
  font-size: 1.1rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.info-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f0f4ff;
  padding: 1rem;
  border-radius: 10px;
}

.card-icon {
  font-size: 2rem;
  color: #fc95c4;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-content strong {
  color: #2c3e50;
  font-size: 1rem;
}

.card-content span {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.customer-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
  display: block;
}

.detail-badge {
  background: #fce4ec;
  color: #d81b60;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.item-details {
  display: flex;
  gap: 0.5rem;
  margin: 0.25rem 0;
}

.panel-title {
  font-weight: bold;
  font-size: 1.3rem;
  color: #fc95c4;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.panel-description {
  color: #7f8c8d;
  margin: 0 0 1rem 0;
}

.create-helado-section {
  padding: 1rem;
}
</style>
