<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title">Nueva venta</h5>
      <form class="row g-3" @submit.prevent="agregarLinea">
        <div class="col-md-4">
          <label class="form-label">Sabor</label>
          <select v-model="linea.sabor" class="form-select" required>
            <option disabled value="">Selecciona...</option>
            <option>Chocolate</option>
            <option>Vainilla</option>
            <option>Frutilla</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Tamaño</label>
          <select v-model="linea.tamanyo" class="form-select" required>
            <option disabled value="">Selecciona...</option>
            <option>Simple</option>
            <option>Doble</option>
            <option>Medio Litro</option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label">Cantidad</label>
          <input v-model.number="linea.cantidad" type="number" min="1" class="form-control" required>
        </div>
        <div class="col-md-2 d-flex align-items-end">
          <button class="btn btn-primary w-100" type="submit">Agregar</button>
        </div>
      </form>

      <hr>

      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Sabor</th>
              <th>Tamaño</th>
              <th>Cant.</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l, i) in lineas" :key="i">
              <td>{{ i + 1 }}</td>
              <td>{{ l.sabor }}</td>
              <td>{{ l.tamanyo }}</td>
              <td>{{ l.cantidad }}</td>
              <td>Bs. {{ precio(l).toFixed(2) }}</td>
              <td>Bs. {{ (precio(l) * l.cantidad).toFixed(2) }}</td>
              <td>
                <button class="btn btn-sm btn-outline-danger" @click="remover(i)">Eliminar</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="5" class="text-end">Total</th>
              <th>Bs. {{ total.toFixed(2) }}</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-outline-secondary">Cancelar</button>
        <button class="btn btn-success" :disabled="lineas.length===0" @click="finalizar">Finalizar venta</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';

type Linea = { sabor: string; tamanyo: string; cantidad: number; };

const linea = reactive<Linea>({ sabor: '', tamanyo: '', cantidad: 1 });
const lineas = reactive<Linea[]>([]);

function precio(l: Linea) {
  // Precios de ejemplo
  const base = l.tamanyo === 'Simple' ? 8 : l.tamanyo === 'Doble' ? 12 : 20;
  return base;
}
function agregarLinea() {
  lineas.push({ ...linea });
  linea.sabor = '';
  linea.tamanyo = '';
  linea.cantidad = 1;
}
function remover(i: number) {
  lineas.splice(i, 1);
}
const total = computed(() => lineas.reduce((acc, l) => acc + precio(l) * l.cantidad, 0));

function finalizar() {
  alert(`Venta registrada. Total: Bs. ${total.value.toFixed(2)}`);
}
</script>