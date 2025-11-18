<script setup lang="ts">
import type { Presentacion } from '@/models/presentaciones'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'presentaciones'
const presentaciones = ref<Presentacion[]>([])
const emit = defineEmits(['edit'])
const presentacionDelete = ref<Presentacion | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

// Paginación
const paginaActual = ref<number>(1)
const elementosPorPagina = ref<number>(5)

async function obtenerLista() {
  presentaciones.value = await http.get(ENDPOINT).then((response) => response.data)
}

const presentacionesFiltrados = computed(() => {
  const presentacionesFiltradosPorBusqueda = presentaciones.value.filter((presentacion) =>
    presentacion.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
  const inicio = (paginaActual.value - 1) * elementosPorPagina.value
  const fin = inicio + elementosPorPagina.value
  return presentacionesFiltradosPorBusqueda.slice(inicio, fin)
})

const totalPaginas = computed(() => {
  const presentacionesFiltradosPorBusqueda = presentaciones.value.filter((presentacion) =>
    presentacion.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
  return Math.ceil(presentacionesFiltradosPorBusqueda.length / elementosPorPagina.value)
})

function cambiarPagina(nuevaPagina: number) {
  if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina
  }
}

function emitirEdicion(presentacion: Presentacion) {
  emit('edit', {
    ...presentacion,
  })
}

function mostrarEliminarConfirm(presentacion: Presentacion) {
  presentacionDelete.value = presentacion
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${presentacionDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div class="presentacion-list-container">
    <div class="search-bar">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre" />
      </InputGroup>
    </div>
    <div class="table-container">
      <table class="presentacion-table">
        <thead>
          <tr>
            <th>Nro.</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(presentacion, index) in presentacionesFiltrados" :key="presentacion.id">
            <td>{{ (paginaActual - 1) * elementosPorPagina + index + 1 }}</td>
            <td>{{ presentacion.nombre }}</td>
            <td>{{ presentacion.precio }} Bs</td>
            <td>
              <Button
                icon="pi pi-pencil"
                aria-label="Editar"
                text
                @click="emitirEdicion(presentacion)"
              />
              <Button
                icon="pi pi-trash"
                aria-label="Eliminar"
                severity="danger"
                text
                @click="mostrarEliminarConfirm(presentacion)"
              />
            </td>
          </tr>
          <tr v-if="presentacionesFiltrados.length === 0">
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
.presentacion-list-container {
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

.presentacion-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.presentacion-table th {
  background-color: #ffb3c1;
  color: #fff;
  padding: 10px;
}

.presentacion-table td {
  padding: 10px;
  border: 1px solid #ffd6e1;
}

.presentacion-table tr:nth-child(even) {
  background-color: #ffe5ec;
}

.presentacion-table tr:hover {
  background-color: #ffc2d1;
}

.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination button {
  min-width: 50px;
  background-color: #ff80ab;
  /* Light raspberry color */
  border: none;
  color: white;
  font-weight: bold;
  font-size: 10px;
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #d81b60;
  /* Darker raspberry color */
}
</style>
