<script setup lang="ts">
import type { Sabor } from '@/models/sabor'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'sabores'
const props = defineProps({
  mostrar: Boolean,
  sabor: {
    type: Object as () => Sabor,
    default: () => ({}) as Sabor,
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

const sabor = ref<Sabor>({ ...props.sabor })
watch(
  () => props.sabor,
  (newVal) => {
    sabor.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: sabor.value.nombre,
      descripcion: sabor.value.descripcion,
      precio: sabor.value.precio,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${sabor.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    sabor.value = {} as Sabor
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
          v-model="sabor.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Descripción</label>
        <InputText
          id="descripcion"
          v-model="sabor.descripcion"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="precio" class="font-semibold w-3">Precio</label>
        <InputNumber
          id="precio"
          v-model="sabor.precio"
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
