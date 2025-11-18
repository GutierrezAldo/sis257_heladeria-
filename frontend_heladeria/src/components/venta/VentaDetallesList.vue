<script setup lang="ts">
import { ref, watch } from 'vue'
import http from '../../plugins/axios'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  visible: boolean
  ventaId: number | null
}>()

const emit = defineEmits(['close', 'update:visible'])

const toast = useToast()
const detalles = ref<any[]>([])
const loading = ref<boolean>(false)
const totalVenta = ref<number>(0)

async function cargarDetalles() {
  if (!props.ventaId) return

  loading.value = true
  try {
    const response = await http.get(`ventas/${props.ventaId}`)
    // La respuesta ahora incluye ventadetalles
    detalles.value = response.data.ventadetalles || []

    // El total ya viene en la respuesta
    totalVenta.value = parseFloat(response.data.totalVenta || 0)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron obtener los detalles de la venta',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

function cerrarModal() {
  emit('update:visible', false)
  emit('close')
}

// Cargar detalles solo una vez cuando el modal se abre con un ID válido
watch(
  [() => props.visible, () => props.ventaId],
  ([visible, ventaId], [oldVisible, oldVentaId]) => {
    if (visible && ventaId && (!oldVisible || ventaId !== oldVentaId)) {
      cargarDetalles()
    }
  }
)

defineExpose({ cargarDetalles })
</script>

<template>
  <Dialog :visible="visible" header="Detalles de Venta" :style="{ width: '90vw', maxWidth: '1000px' }" :modal="true"
    @hide="cerrarModal" @update:visible="(val) => emit('update:visible', val)">
    <div v-if="loading" class="loading-container">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      <p>Cargando detalles...</p>
    </div>

    <div v-else class="detalles-container">
      <div class="header-info">
        <h3>Venta #{{ ventaId }}</h3>
        <div class="total-box">
          <span>Total de la venta:</span>
          <span class="total-amount">{{ totalVenta.toFixed(2) }} Bs</span>
        </div>
      </div>

      <div class="table-responsive">
        <table class="detalles-table">
          <thead>
            <tr>
              <th class="th-number">No.</th>
              <th>Sabor</th>
              <th>Presentación</th>
              <th>Tamaño</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detalle, index) in detalles" :key="detalle.id">
              <td class="td-number">{{ index + 1 }}</td>
              <td>
                <div class="detalle-item">
                  <strong>{{ detalle.sabor?.nombre || '-' }}</strong>
                  <small v-if="detalle.sabor?.descripcion" class="text-muted">{{ detalle.sabor.descripcion }}</small>
                  <span class="precio-componente">{{ parseFloat(detalle.precioSabor).toFixed(2) }} Bs</span>
                </div>
              </td>
              <td>
                <div class="detalle-item">
                  <strong>{{ detalle.presentacion?.nombre || '-' }}</strong>
                  <span class="precio-componente">{{ parseFloat(detalle.precioPresentacion).toFixed(2) }} Bs</span>
                </div>
              </td>
              <td>
                <div class="detalle-item">
                  <strong>{{ detalle.tamaño?.nombre || '-' }}</strong>
                  <small class="text-muted">{{ detalle.tamaño?.cantidadBolas }} bolas</small>
                  <span class="precio-componente">{{ parseFloat(detalle.precioTamaño).toFixed(2) }} Bs</span>
                </div>
              </td>
              <td class="td-number">{{ detalle.cantidad }}</td>
              <td class="td-number precio-destacado">{{ parseFloat(detalle.precioUnitario).toFixed(2) }} Bs</td>
              <td class="td-number precio-total">{{ parseFloat(detalle.subtotal).toFixed(2) }} Bs</td>
            </tr>
            <tr v-if="detalles.length === 0" class="empty-row">
              <td colspan="7">No hay detalles disponibles para esta venta</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.detalles-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #ffe5ec;
  /* Fondo rosado claro */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #ffb3c1;
  /* Fondo rosado */
  padding: 10px;
  border-radius: 6px;
  color: #fff;
}

.header-info h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.total-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color : #d81b60;
  background-color: #ffc2d1;
  /* Fondo rosado más oscuro */
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
}

.total-amount {
  font-weight: 700;
  color: #d81b60;
  /* Texto frambuesa oscuro */
  font-size: 1.1rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
  color: #d81b60;
  /* Texto frambuesa oscuro */
}

.table-responsive {
  overflow-x: auto;
  max-height: 80vh;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.detalles-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1100px;
  font-size: 0.9rem;
  text-align: center;
}

.detalles-table th {
  background-color: #ffb3c1;
  /* Fondo rosado */
  color: #fff;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  position: sticky;
  top: 0;
  white-space: nowrap;
}

.th-number {
  width: 50px;
  text-align: center;
}

.detalles-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #ffd6e1;
  /* Bordes rosados */
  vertical-align: top;
  line-height: 1.4;
}

.td-number {
  text-align: center;
  font-weight: 500;
}

.detalle-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
}

.detalle-item strong {
  color: #d81b60;
  font-size: 0.95rem;
}

.detalle-item small {
  font-size: 0.75rem;
  color: #666;
}

.precio-componente {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
}

.precio-destacado {
  color: #d81b60;
  font-weight: 600;
  font-size: 1rem;
}

.precio-total {
  color: #c2185b;
  font-weight: 700;
  font-size: 1.05rem;
}

.text-muted {
  color: #888;
}

.detalles-table tr:nth-child(even) {
  background-color: #ffe5ec;
  /* Fondo rosado claro */
}

.detalles-table tr:hover {
  background-color: #ffc2d1;
  /* Fondo rosado más oscuro */
}

.empty-row td {
  text-align: center;
  padding: 2rem;
  color: #d81b60;
  /* Texto frambuesa oscuro */
}

@media (max-width: 768px) {
  .header-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .detalles-table th,
  .detalles-table td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
}
</style>
