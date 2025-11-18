<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import http from '../../plugins/axios'

const props = defineProps<{
    visible: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'deleted'): void
}>()

const loading = ref(false)
const toast = useToast()

async function eliminarAnuladas() {
    loading.value = true
    try {
        const response = await http.delete('ventas')
        if (response?.data?.mensaje) {
            toast.add({ severity: 'info', summary: 'Información', detail: response.data.mensaje, life: 3000 })
        } else {
            toast.add({ severity: 'success', summary: 'Éxito', detail: 'Ventas anuladas eliminadas', life: 3000 })
            emit('deleted')
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron eliminar las ventas anuladas', life: 3000 })
    } finally {
        loading.value = false
        emit('close')
    }
}

function cerrar() {
    if (!loading.value) {
        emit('close')
    }
}
</script>


<template>
    <Dialog
        v-model:visible="props.visible"
        modal
        header="Eliminar Ventas Anuladas"
        :closable="!loading"
        :dismissableMask="!loading"
        @update:visible="cerrar"
        style="width: 400px"
    >
        <div>
            <p>¿Está seguro que desea eliminar todas las ventas anuladas? Esta acción no se puede deshacer.</p>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrar" :disabled="loading" />
            <Button label="Eliminar" icon="pi pi-trash" severity="danger" @click="eliminarAnuladas" :loading="loading" />
        </template>
    </Dialog>
</template>