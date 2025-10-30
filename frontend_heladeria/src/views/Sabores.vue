<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title m-0">Sabores</h5>
        <div class="input-group" style="max-width: 420px;">
          <input v-model="nuevo" class="form-control" placeholder="Nuevo sabor">
          <button class="btn btn-primary" @click="crear">Agregar</button>
        </div>
      </div>

      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(s, i) in sabores" :key="i">
          <span>{{ s }}</span>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-secondary" @click="renombrar(i)">Renombrar</button>
            <button class="btn btn-sm btn-outline-danger" @click="eliminar(i)">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const sabores = ref<string[]>(['Chocolate','Vainilla','Frutilla']);
const nuevo = ref('');

function crear() {
  if (!nuevo.value.trim()) return;
  sabores.value.push(nuevo.value.trim());
  nuevo.value = '';
}
function renombrar(i: number) {
  const nombre = prompt('Nuevo nombre:', sabores.value[i]);
  if (nombre && nombre.trim()) sabores.value[i] = nombre.trim();
}
function eliminar(i: number) {
  sabores.value.splice(i, 1);
}
</script>