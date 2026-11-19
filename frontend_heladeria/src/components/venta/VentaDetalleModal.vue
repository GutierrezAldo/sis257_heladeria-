<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import type { Venta, VentaDetalle } from '@/models/venta'
import { Button, Dialog } from 'primevue'

const props = defineProps({
  mostrar: Boolean,
  venta: {
    type: Object as () => Venta | null,
    default: null,
  },
})

const emit = defineEmits(['close'])
const detalles = ref<VentaDetalle[]>([])
const cargando = ref(false)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

watch(
  () => props.mostrar,
  async (abierto) => {
    if (abierto && props.venta) {
      cargando.value = true
      try {
        const response = await http.get('venta-detalles')
        detalles.value = response.data.filter(
          (d: any) => d.idVenta === props.venta?.id || d.venta?.id === props.venta?.id,
        )
      } finally {
        cargando.value = false
      }
    }
  },
)
</script>

<template>
  <Dialog
    v-model:visible="dialogVisible"
    :header="`Detalle de Venta #${props.venta?.id || ''}`"
    :style="{ width: '38rem' }"
    modal
  >
    <div v-if="props.venta" class="mb-3">
      <p class="mb-1"><strong>Fecha:</strong> {{ props.venta.fecha }}</p>
      <p class="mb-1"><strong>Cliente:</strong> {{ props.venta.cliente?.razonSocial || 'S/N' }}</p>
      <p class="mb-0"><strong>Vendedor:</strong> {{ props.venta.usuario?.usuario || '-' }}</p>
    </div>

    <div v-if="cargando" class="text-center py-3">Cargando detalle...</div>

    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cant.</th>
          <th>Precio Unit.</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detalle in detalles" :key="detalle.id">
          <td>{{ detalle.producto?.nombre || `Producto #${detalle.idProducto}` }}</td>
          <td>{{ detalle.cantidad }}</td>
          <td>Bs. {{ detalle.precioUnitario }}</td>
          <td>Bs. {{ detalle.total }}</td>
        </tr>
        <tr v-if="detalles.length === 0">
          <td colspan="4" class="text-center text-muted">Sin detalles registrados</td>
        </tr>
      </tbody>
    </table>

    <div v-if="props.venta" class="d-flex justify-content-between border-top pt-2 mt-3">
      <strong>Total Venta:</strong>
      <strong class="text-primary">Bs. {{ props.venta.totalVenta }}</strong>
    </div>

    <div class="d-flex justify-content-end mt-4">
      <Button type="button" label="Cerrar" severity="secondary" @click="dialogVisible = false" />
    </div>
  </Dialog>
</template>

<style scoped></style>

