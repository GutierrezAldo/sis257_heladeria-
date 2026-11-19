<script setup lang="ts">
import EmpleadoList from '@/components/empleado/EmpleadoList.vue'
import EmpleadoSave from '@/components/empleado/EmpleadoSave.vue'
import type { Empleado } from '@/models/empleado'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const empleadoListRef = ref<typeof EmpleadoList | null>(null)
const empleadoEdit = ref<any>(null)

function handleCreate() {
  empleadoEdit.value = {}
  mostrarDialog.value = true
}

function handleEdit(empleado: Empleado) {
  empleadoEdit.value = empleado
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  empleadoListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="container my-5 py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Empleados</h1>
      <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    </div>
    <EmpleadoList ref="empleadoListRef" @edit="handleEdit" />
    <EmpleadoSave
      :mostrar="mostrarDialog"
      :empleado="empleadoEdit"
      :modoEdicion="!!empleadoEdit?.id"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>