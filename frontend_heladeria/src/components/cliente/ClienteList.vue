<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Column, DataTable, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'

const ENDPOINT = 'clientes'
const clientes = ref<Cliente[]>([])
const busqueda = ref<string>('')
const clienteDelete = ref<Cliente | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

async function obtenerLista() {
  clientes.value = await http.get(ENDPOINT).then((response) => response.data)
}

const clientesFiltrados = computed(() => {
  return clientes.value.filter(
    (cliente) =>
      cliente.ci.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cliente.razonSocial.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(cliente: Cliente) {
  emit('edit', cliente)
}

function mostrarEliminarConfirm(cliente: Cliente) {
  clienteDelete.value = cliente
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${clienteDelete.value?.id}`)
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
      <InputText v-model="busqueda" type="text" placeholder="Buscar por CI, razón social o email" />
    </InputGroup>
    <DataTable :value="clientesFiltrados" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" stripedRows>
      <Column header="Nro.">
        <template #body="{ index }">{{ index + 1 }}</template>
      </Column>
      <Column field="ci" header="CI" />
      <Column field="razonSocial" header="Razón Social" />
      <Column field="telefono" header="Teléfono" />
      <Column field="email" header="Email" />
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

