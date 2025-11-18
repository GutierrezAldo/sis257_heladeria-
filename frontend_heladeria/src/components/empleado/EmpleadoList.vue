<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'empleados'
const empleados = ref<Empleado[]>([])
const emit = defineEmits(['edit'])
const empleadoDelete = ref<Empleado | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

// Paginación
const paginaActual = ref<number>(1)
const elementosPorPagina = ref<number>(5)

async function obtenerLista() {
  empleados.value = await http.get(ENDPOINT).then((response) => response.data)
}

const empleadosFiltrados = computed(() => {
  const empleadosFiltradosPorBusqueda = empleados.value.filter(
    (empleado) =>
      empleado.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      empleado.apellido.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
  const inicio = (paginaActual.value - 1) * elementosPorPagina.value
  const fin = inicio + elementosPorPagina.value
  return empleadosFiltradosPorBusqueda.slice(inicio, fin)
})

const totalPaginas = computed(() => {
  const empleadosFiltradosPorBusqueda = empleados.value.filter(
    (empleado) =>
      empleado.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      empleado.apellido.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
  return Math.ceil(empleadosFiltradosPorBusqueda.length / elementosPorPagina.value)
})

function cambiarPagina(nuevaPagina: number) {
  if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina
  }
}

function emitirEdicion(empleado: Empleado) {
  emit('edit', empleado)
}

function mostrarEliminarConfirm(empleado: Empleado) {
  empleadoDelete.value = empleado
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${empleadoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div class="empleado-list-container">
    <div class="search-bar">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre o apellido" />
      </InputGroup>
    </div>
    <div class="table-container">
      <table class="empleado-table">
        <thead>
          <tr>
            <th>Nro.</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Cargo</th>
            <th>Fotografía</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(empleado, index) in empleadosFiltrados" :key="empleado.id">
            <td>{{ (paginaActual - 1) * elementosPorPagina + index + 1 }}</td>
            <td>{{ empleado.nombre }}</td>
            <td>{{ empleado.apellido }}</td>
            <td>{{ empleado.telefono }}</td>
            <td>{{ empleado.direccion }}</td>
            <td>{{ empleado.cargo }}</td>
            <td>
              <img
              v-if="empleado.fotografia"
              :src="empleado.fotografia"
              alt="fotografia"
              height="80px"
              />
              <span v-else>Sin fotografía</span>
            </td>
            <td>
              <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(empleado)" />
              <Button
                icon="pi pi-trash"
                aria-label="Eliminar"
                severity="danger"
                text
                @click="mostrarEliminarConfirm(empleado)"
              />
            </td>
          </tr>
          <tr v-if="empleadosFiltrados.length === 0">
            <td colspan="8">No se encontraron resultados.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <Button
        label="Anterior"
        :disabled="paginaActual === 1"
        @click="cambiarPagina(paginaActual - 1)"
      />
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <Button
        label="Siguiente"
        :disabled="paginaActual === totalPaginas"
        @click="cambiarPagina(paginaActual + 1)"
      />
    </div>

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

<style scoped>
.empleado-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffd6e1;
  padding: 20px;
  border-radius: 10px;
  margin-top: -30px;
}

.search-bar {
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
}

.table-container {
  width: 100%;
  max-width: 800px;
  overflow-x: auto;
}

.empleado-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.empleado-table th {
  background-color: #ffb3c1;
  color: #fff;
  padding: 10px;
}

.empleado-table td {
  padding: 10px;
  border: 1px solid #ffd6e1;
}

.empleado-table tr:nth-child(even) {
  background-color: #ffe5ec;
}

.empleado-table tr:hover {
  background-color: #ffc2d1;
}

img {
  border-radius: 5px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination button {
  min-width: 50px;
  background-color: #ff80ab; /* Light raspberry color */
  border: none;
  color: white;
  font-weight: bold;
  font-size: 10px;
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #d81b60; /* Darker raspberry color */
}
</style>
