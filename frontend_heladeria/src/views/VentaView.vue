<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import VentaList from '../components/venta/VentaList.vue'
import VentasEliminarAnuladas from '../components/venta/VentaEliminarAnuladas.vue'

const router = useRouter()
const mostrarEliminarAnuladas = ref<boolean>(false)
const VentaListRef = ref<typeof VentaList | null>(null)

function handleCreate() {
  router.push('registrar-venta')
}

function handleDeletedAnuladas() {
  mostrarEliminarAnuladas.value = false
  VentaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="admin-container">
    <div class="crud-container">
      <div class="crud-header">
        <div class="title-container" style=" width: 80%;">
          <h1 style="font-size: 1.5rem; color: #ffffff;">Ventas</h1>
        </div>
      </div>

      <div class="crud-content">
        <VentaList ref="VentaListRef" />
      </div>

      <VentasEliminarAnuladas :visible="mostrarEliminarAnuladas" @close="mostrarEliminarAnuladas = false"
        @deleted="handleDeletedAnuladas" />
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  background-color: #ffd6e1;
  /* Light pink background */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.crud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background-color: #ff80ab;
  /* Light raspberry color */
  color: white;
  border-radius: 10px;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-container h1 {
  font-family: 'Pacifico', cursive;
  /* Fun font for a heladería vibe */
  color: #d81b60;
  /* Raspberry color */
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.crud-content {
  display: flex;
  justify-content: center;
  /* Center the table horizontally */
  margin-top: 20px;
}

.add-button,
.clear-button {
  background-color: #ff80ab;
  /* Light raspberry color */
  border: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.add-button:hover,
.clear-button:hover {
  background-color: #d81b60;
  /* Darker raspberry color */
}

table {
  width: 80%;
  /* Adjust table width */
  border-collapse: collapse;
  background-color: #fff;
  /* White background for contrast */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table th,
table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ffd6e1;
  /* Light pink border */
}

table th {
  background-color: #ff80ab;
  /* Light raspberry color */
  color: white;
  font-weight: bold;
}

table tr:hover {
  background-color: #ffe4ec;
  /* Slightly darker pink for hover effect */
}
</style>
