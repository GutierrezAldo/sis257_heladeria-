<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Column, DataTable, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'

const ENDPOINT = 'empleados'
const empleados = ref<Empleado[]>([])
const busqueda = ref<string>('')
const empleadoDelete = ref<Empleado | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

async function obtenerLista() {
  empleados.value = await http.get(ENDPOINT).then((response) => response.data)
}

const empleadosFiltrados = computed(() => {
  return empleados.value.filter(
    (empleado) =>
      empleado.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      empleado.apellido.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      empleado.cargo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      empleado.telefono.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(empleado: Empleado) {
  emit('edit', empleado)
}

function mostrarEliminarConfirm(empleado: Empleado) {
  empleadoDelete.value = empleado
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${empleadoDelete.value?.id}`)
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
      <InputText
        v-model="busqueda"
        type="text"
        placeholder="Buscar por nombre, apellido, cargo o teléfono"
      />
    </InputGroup>
    <DataTable :value="empleadosFiltrados" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" stripedRows>
      <Column header="Nro.">
        <template #body="{ index }">{{ index + 1 }}</template>
      </Column>
      <Column field="nombre" header="Nombre" />
      <Column field="apellido" header="Apellido" />
      <Column field="cargo" header="Cargo" />
      <Column field="telefono" header="Teléfono" />
      <Column field="direccion" header="Dirección" />
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