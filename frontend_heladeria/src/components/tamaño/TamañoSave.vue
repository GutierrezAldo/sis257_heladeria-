<script setup lang="ts">
import type { Tamaño } from '@/models/tamaño'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'Tamanos'
const props = defineProps({
  mostrar: Boolean,
  tamaño: {
    type: Object as () => Tamaño,
    default: () => ({}) as Tamaño,
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

const tamaño = ref<Tamaño>({ ...props.tamaño })
watch(
  () => props.tamaño,
  (newVal) => {
    tamaño.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: tamaño.value.nombre,
      cantidadBolas: tamaño.value.cantidadBolas,
      precio: tamaño.value.precio,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${tamaño.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    tamaño.value = {} as Tamaño
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
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="tamaño.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Cantidad Bolas</label>
        <InputText
          id="descripcion"
          v-model="tamaño.cantidadBolas"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="precio" class="font-semibold w-3">Precio</label>
        <InputNumber
          id="precio"
          v-model="tamaño.precio"
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
