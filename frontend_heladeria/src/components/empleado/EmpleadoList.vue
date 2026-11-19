<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'

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
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cargo</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empleado, index) in empleadosFiltrados" :key="empleado.id">
          <td>{{ index + 1 }}</td>
          <td>{{ empleado.nombre }}</td>
          <td>{{ empleado.apellido }}</td>
          <td>{{ empleado.cargo }}</td>
          <td>{{ empleado.telefono }}</td>
          <td>{{ empleado.direccion }}</td>
          <td>
            <Button
              icon="pi pi-pencil"
              aria-label="Editar"
              text
              @click="emitirEdicion(empleado)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(empleado)"
            />
          </td>
        </tr>
        <tr v-if="empleadosFiltrados.length === 0">
          <td colspan="7" class="text-center">No se encontraron resultados</td>
        </tr>
      </tbody>
    </table>
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