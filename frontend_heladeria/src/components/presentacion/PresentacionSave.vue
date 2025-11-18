<script setup lang="ts">
import type { Presentacion } from '@/models/presentaciones'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'
import { InputNumber } from 'primevue'

const ENDPOINT = 'presentaciones'
const props = defineProps({
  mostrar: Boolean,
  presentacion: {
    type: Object as () => Presentacion,
    default: () => ({}) as Presentacion,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const presentacion = ref<Presentacion>({ ...props.presentacion })
watch(
  () => props.presentacion,
  async (newVal) => {
    presentacion.value = {
      ...newVal,
    }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: presentacion.value.nombre,
      precio: Number(presentacion.value.precio),
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${presentacion.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    presentacion.value = {} as Presentacion
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Presentacion' : 'Crear Presentacion'"
      style="width: 30rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="presentacion.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="precio" class="font-semibold w-3">Precio (Bs)</label>
        <InputNumber
          id="precio"
          v-model="presentacion.precio"
          class="flex-auto"
          :min="0"
          :step="0.1"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          mode="decimal"
          suffix=" bs"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
