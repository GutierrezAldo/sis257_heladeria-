<script setup lang="ts">
import type { Sabor } from '@/models/sabor'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'sabores'
const sabores = ref<Sabor[]>([])
const emit = defineEmits(['edit'])
const artistaDelete = ref<Sabor | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

// Paginación
const paginaActual = ref<number>(1)
const elementosPorPagina = ref<number>(5)

async function obtenerLista() {
  sabores.value = await http.get(ENDPOINT).then((response) => response.data)
}

const saboresFiltrados = computed(() => {
  const saboresFiltradosPorBusqueda = sabores.value.filter(
    (sabor) =>
      sabor.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
  const inicio = (paginaActual.value - 1) * elementosPorPagina.value
  const fin = inicio + elementosPorPagina.value
  return saboresFiltradosPorBusqueda.slice(inicio, fin)
})

const totalPaginas = computed(() => {
  const saboresFiltradosPorBusqueda = sabores.value.filter(
    (sabor) =>
      sabor.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
  return Math.ceil(saboresFiltradosPorBusqueda.length / elementosPorPagina.value)
})

function cambiarPagina(nuevaPagina: number) {
  if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina
  }
}

function emitirEdicion(sabor: Sabor) {
  emit('edit', sabor)
}

function mostrarEliminarConfirm(sabor: Sabor) {
  artistaDelete.value = sabor
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${artistaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div class="sabor-list-container">
    <div class="search-bar">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre" />
      </InputGroup>
    </div>
    <div class="table-container">
      <table class="sabor-table">
        <thead>
          <tr>
            <th>Nro.</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sabor, index) in saboresFiltrados" :key="sabor.id">
            <td>{{ (paginaActual - 1) * elementosPorPagina + index + 1 }}</td>
            <td>{{ sabor.nombre }}</td>
            <td>{{ sabor.descripcion }}</td>
            <td>{{ sabor.precio }} Bs</td>
            <td>
              <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(sabor)" />
              <Button
                icon="pi pi-trash"
                aria-label="Eliminar"
                severity="danger"
                text
                @click="mostrarEliminarConfirm(sabor)"
              />
            </td>
          </tr>
          <tr v-if="saboresFiltrados.length === 0">
            <td colspan="4">No se encontraron resultados.</td>
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
.sabor-list-container {
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

.sabor-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.sabor-table th {
  background-color: #ffb3c1;
  color: #fff;
  padding: 10px;
}

.sabor-table td {
  padding: 10px;
  border: 1px solid #ffd6e1;
}

.sabor-table tr:nth-child(even) {
  background-color: #ffe5ec;
}

.sabor-table tr:hover {
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
