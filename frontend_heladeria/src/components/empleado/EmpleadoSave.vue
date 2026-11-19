<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputText, Select } from 'primevue'

const cargos = ['Administrador', 'Cajero', 'Heladero', 'Repartidor']

const ENDPOINT = 'empleados'
const props = defineProps({
  mostrar: Boolean,
  empleado: {
    type: Object as () => Empleado,
    default: () => ({}) as Empleado,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])
const empleado = ref<Empleado>({ ...props.empleado })

watch(
  () => props.empleado,
  (newVal) => {
    empleado.value = { ...newVal }
  },
)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

function soloNumeros(event: Event) {
  const input = event.target as HTMLInputElement
  empleado.value.telefono = input.value.replace(/[^0-9]/g, '')
}

async function handleSave() {
  try {
    const body = {
      nombre: empleado.value.nombre,
      apellido: empleado.value.apellido,
      cargo: empleado.value.cargo,
      telefono: empleado.value.telefono,
      direccion: empleado.value.direccion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${empleado.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    empleado.value = {} as Empleado
    dialogVisible.value = false
  } catch (error: any) {
    const msg = error?.response?.data?.message
    alert(Array.isArray(msg) ? msg.join('\n') : msg || 'Error al guardar')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Empleado' : 'Crear Empleado'"
      style="width: 28rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="empleado.nombre"
          class="flex-auto"
          maxlength="50"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="apellido" class="font-semibold w-3">Apellido</label>
        <InputText
          id="apellido"
          v-model="empleado.apellido"
          class="flex-auto"
          maxlength="50"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="cargo" class="font-semibold w-3">Cargo</label>
        <Select
          id="cargo"
          v-model="empleado.cargo"
          :options="cargos"
          placeholder="Seleccione un cargo"
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="telefono" class="font-semibold w-3">Teléfono</label>
        <InputText
          id="telefono"
          v-model="empleado.telefono"
          class="flex-auto"
          maxlength="20"
          autocomplete="off"
          @input="soloNumeros"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="direccion" class="font-semibold w-3">Dirección</label>
        <InputText
          id="direccion"
          v-model="empleado.direccion"
          class="flex-auto"
          maxlength="150"
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