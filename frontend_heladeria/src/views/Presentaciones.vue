<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title">Presentaciones</h5>
      <div class="input-group" style="max-width: 420px;">
        <input v-model="nueva" class="form-control" placeholder="Copa, Vaso, Cono, Vaso XL...">
        <button class="btn btn-primary" @click="agregar">Agregar</button>
      </div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 mt-1">
        <div class="col" v-for="(p,i) in presentaciones" :key="i">
          <div class="card h-100">
            <div class="card-body d-flex justify-content-between align-items-center">
              <span>{{ p }}</span>
              <button class="btn btn-sm btn-outline-danger" @click="eliminar(i)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const presentaciones = ref<string[]>(['Cono','Vaso','Tarrina']);
const nueva = ref('');
function agregar(){ if(!nueva.value.trim()) return; presentaciones.value.push(nueva.value.trim()); nueva.value=''; }
function eliminar(i:number){ presentaciones.value.splice(i,1); }
</script>