<script setup lang="ts">
import type { Producto } from '@/models/producto'
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Column, DataTable, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'

const ENDPOINT = 'productos'
const productos = ref<Producto[]>([])
const busqueda = ref<string>('')
const productoDelete = ref<Producto | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

async function obtenerLista() {
  productos.value = await http.get(ENDPOINT).then((response) => response.data)
}

const productosFiltrados = computed(() => {
  return productos.value.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      producto.estado.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(producto: Producto) {
  emit('edit', producto)
}

function mostrarEliminarConfirm(producto: Producto) {
  productoDelete.value = producto
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${productoDelete.value?.id}`)
  await obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <InputGroup class="mb-3">
      <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
      <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre o estado" />
    </InputGroup>
    <DataTable :value="productosFiltrados" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" stripedRows>
      <Column header="Nro.">
        <template #body="{ index }">{{ index + 1 }}</template>
      </Column>
      <Column field="nombre" header="Nombre" />
      <Column field="precio" header="Precio (Bs.)" />
      <Column field="stock" header="Stock" />
      <Column field="estado" header="Estado" />
      <Column header="Imagen">
        <template #body="{ data }">
          <img v-if="data.imagen" :src="data.imagen" alt="imagen" width="60" height="60" style="object-fit: cover" />
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" text @click="emitirEdicion(data)" />
          <Button icon="pi pi-trash" text @click="mostrarEliminarConfirm(data)" />
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>

