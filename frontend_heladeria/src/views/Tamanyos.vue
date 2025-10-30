<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <h5 class="card-title m-0">Tamaños</h5>
        <div class="d-flex align-items-end gap-2">
          <div class="row g-2 align-items-end">
            <div class="col-auto">
              <label class="form-label d-block small mb-1">Nombre</label>
              <input v-model="nombre" class="form-control" placeholder="Simple / Doble / Medio Litro">
            </div>
            <div class="col-auto">
              <label class="form-label d-block small mb-1">Precio (Bs.)</label>
              <input v-model.number="precio" type="number" min="0" step="0.1" class="form-control" style="min-width: 120px;">
            </div>
          </div>
          <button class="btn btn-primary" @click="agregar">
            Agregar
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table align-middle">
          <thead class="table-light">
            <tr>
              <th style="width:60px;">#</th>
              <th>Nombre</th>
              <th style="width:140px;">Precio</th>
              <th style="width:120px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(t, i) in tamanyos" :key="i">
              <td class="text-muted">{{ i+1 }}</td>
              <td class="fw-medium">{{ t.nombre }}</td>
              <td>Bs. {{ t.precio.toFixed(2) }}</td>
              <td class="text-end">
                <button class="btn btn-sm btn-outline-danger" @click="eliminar(i)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
type T = { nombre: string; precio: number; };
const tamanyos = ref<T[]>([
  { nombre: 'Simple', precio: 8 },
  { nombre: 'Doble',  precio: 12 },
  { nombre: 'Medio Litro', precio: 20 },
]);
const nombre = ref(''); const precio = ref<number>(0);

function agregar(){
  if(!nombre.value.trim() || precio.value<=0) return;
  tamanyos.value.push({ nombre: nombre.value.trim(), precio: precio.value });
  nombre.value=''; precio.value=0;
}
function eliminar(i:number){ tamanyos.value.splice(i,1); }
</script>