<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import type { Venta } from '../../models/venta'
import VentaDetallesList from './VentaDetallesList.vue'

const toast = useToast()
const ENDPOINT = 'ventas'
let ventas = ref<Venta[]>([])

defineEmits(['show', 'edit'])
const ventaDelete = ref<Venta | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

// Para el modal de detalles
const mostrarDetallesDialog = ref<boolean>(false)
const ventaIdSeleccionada = ref<number | null>(null)

// Paginación
const opcionesFilas = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
]
const filasPorPagina = ref(5)
const paginaActual = ref(1)
const totalPaginas = computed(() => Math.ceil(ventas.value.length / filasPorPagina.value))

const ventasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * filasPorPagina.value
  return ventas.value.slice(inicio, inicio + filasPorPagina.value)
})

function cambiarPagina(nuevaPagina: number) {
  if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina
  }
}

watch(filasPorPagina, () => {
  paginaActual.value = 1
})

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    ventas.value = response.data
    paginaActual.value = 1
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo obtener la lista de ventas',
      life: 3000,
    })
  }
}

function mostrarDetalles(venta: Venta) {
  ventaIdSeleccionada.value = venta.id
  mostrarDetallesDialog.value = true
}

function mostrarEliminarConfirm(venta: Venta) {
  ventaDelete.value = venta
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  try {
    await http.delete(`${ENDPOINT}/${ventaDelete.value?.id}`)
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Venta eliminada correctamente',
      life: 3000,
    })
    obtenerLista()
  } catch (error: any) {
    let detail = 'No se pudo eliminar la venta'
    if (error.response && error.response.data?.message) {
      detail = error.response.data.message
    }
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail,
      life: 3000,
    })
  } finally {
    mostrarConfirmDialog.value = false
  }
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div class="venta-container">
    <div class="table-responsive">
      <table class="venta-table">
        <thead>
          <tr>
            <th class="th-number">No.</th>
            <th>Cliente</th>
            <th>Documento</th>
            <th>Usuario</th>
            <th>Método Pago</th>
            <th>Total Venta</th>
            <th>Monto Pagado</th>
            <th>Cambio</th>
            <th>Fecha de Venta</th>
            <th>Estado</th>
            <th class="th-actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venta, index) in ventasPaginadas" :key="venta.id">
            <td class="td-number">{{ (paginaActual - 1) * filasPorPagina + index + 1 }}</td>
            <td>{{ venta.nombreCliente || '-' }}</td>
            <td>{{ venta.documento || '-' }}</td>
            <td>{{ venta.usuario?.usuario || '-' }}</td>
            <td class="text-capitalize">{{ venta.metodoPago || '-' }}</td>
            <td>
              <span v-if="venta.estado === 'anulada' || venta.totalVenta === 0" class="text-danger"
                >anulada</span
              >
              <span v-else>{{ parseFloat(venta.totalVenta).toFixed(2) }} Bs</span>
            </td>
            <td>{{ parseFloat(venta.montoPagado || 0).toFixed(2) }} Bs</td>
            <td>{{ parseFloat(venta.cambio || 0).toFixed(2) }} Bs</td>
            <td>
              {{
                venta.fechaCreacion
                  ? new Date(venta.fechaCreacion).toLocaleString('es-BO', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '-'
              }}
            </td>
            <td>
              <span v-if="venta.estado === 'realizada'" class="badge-realizada">realizada</span>
              <span v-else-if="venta.estado === 'anulada'" class="badge-anulada">anulada</span>
              <span v-else>{{ venta.estado ?? '-' }}</span>
            </td>
            <td class="actions-column">
              <div class="actions-wrapper">
                <Button
                  icon="pi pi-eye"
                  aria-label="Ver detalles"
                  class="p-button-rounded p-button-text p-button-primary"
                  @click="mostrarDetalles(venta)"
                />
                <Button
                  icon="pi pi-trash"
                  aria-label="Eliminar"
                  class="p-button-rounded p-button-text p-button-danger"
                  @click="mostrarEliminarConfirm(venta)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Controles de paginación -->
    <div class="paginacion-moderna">
      <div class="controles-paginas">
        <Button
          icon="pi pi-angle-left"
          class="paginacion-btn"
          @click="cambiarPagina(paginaActual - 1)"
          :disabled="paginaActual === 1"
        />
        <span class="paginacion-info">Página {{ paginaActual }} de {{ totalPaginas }}</span>
        <Button
          icon="pi pi-angle-right"
          class="paginacion-btn"
          @click="cambiarPagina(paginaActual + 1)"
          :disabled="paginaActual === totalPaginas || totalPaginas === 0"
        />
      </div>
    </div>

    <!-- Modal de confirmación para eliminar -->
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
      :modal="true"
    >
      <div class="confirmation-content">
        <i
          class="pi pi-exclamation-triangle mr-3"
          style="font-size: 2rem; color: var(--yellow-500)"
        />
        <span>
          ¿Estás seguro de eliminar la venta #{{ ventaDelete?.id }}? Esta acción no se puede
          deshacer.
        </span>
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text"
          @click="mostrarConfirmDialog = false"
        />
        <Button label="Eliminar" icon="pi pi-check" class="p-button-danger" @click="eliminar" />
      </template>
    </Dialog>

    <!-- Modal de detalles de venta -->
    <VentaDetallesList
      :visible="mostrarDetallesDialog"
      :ventaId="ventaIdSeleccionada"
      @close="mostrarDetallesDialog = false"
      @update:visible="(val) => (mostrarDetallesDialog = val)"
    />
  </div>
</template>

<style scoped>
.venta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffd6e1;
  /* Fondo rosado claro */
  padding: 20px;
  border-radius: 10px;
  margin-top: -20px;
}

.table-responsive {
  width: 100%;
  max-width: 1250px;
  overflow-x: auto;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.venta-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.venta-table th {
  background-color: #ffb3c1;
  /* Color rosado claro */
  color: #fff;
  padding: 10px;
}

.venta-table td {
  padding: 10px;
  border: 1px solid #ffd6e1;
  /* Bordes rosados */
}

.venta-table tr:nth-child(even) {
  background-color: #ffe5ec;
  /* Fondo rosado claro */
}

.venta-table tr:hover {
  background-color: #ffc2d1;
  /* Fondo rosado más oscuro */
}

.paginacion-moderna {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 1.5rem 0 1rem 0;
  background: #ffe5ec;
  /* Fondo rosado claro */
  border-radius: 2rem;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.07);
}

.dropdown-filas {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #d81b60;
  /* Texto frambuesa oscuro */
  font-weight: 500;
}

.dropdown-estilizado {
  min-width: 80px;
  border-radius: 1rem;
  border: 1px solid #ffd6e1;
  background: #fff;
  font-size: 1rem;
}

.controles-paginas {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.paginacion-btn {
  border-radius: 50%;
  background: #ff80ab;
  /* Botones rosados */
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.paginacion-btn:enabled:hover {
  background: #d81b60;
  /* Botones rosados más oscuros */
}

.paginacion-info {
  font-size: 1rem;
  color: #d81b60;
  /* Texto frambuesa oscuro */
  font-weight: 500;
  letter-spacing: 0.02em;
}

.text-capitalize {
  text-transform: capitalize;
}

.badge-realizada {
  background-color: #4caf50;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.badge-anulada {
  background-color: #f44336;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}
</style>
