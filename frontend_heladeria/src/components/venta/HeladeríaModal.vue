<template>
  <Dialog
    v-model:visible="isVisible"
    :style="{ width: '600px' }"
    header="Crear Helado Personalizado"
    :modal="true"
    @update:visible="$emit('update:visible', $event)"
    class="heladeria-dialog"
  >
    <div class="heladeria-modal">
      <!-- Selección de Sabor -->
      <div class="selection-section">
        <label class="section-label"> <i class="pi pi-star"></i> Selecciona el Sabor </label>
        <Select
          v-model="selectedSabor"
          :options="sabores"
          optionLabel="nombre"
          placeholder="Elige un sabor"
          class="w-full selection-field"
          filter
          filterPlaceholder="Buscar sabor..."
          @change="calcularPrecio"
        >
          <template #option="slotProps">
            <div class="select-option">
              <strong>{{ slotProps.option.nombre }}</strong>
              <span class="option-price"
                >{{ parseFloat(slotProps.option.precio).toFixed(2) }} Bs</span
              >
            </div>
          </template>
          <template #value="slotProps">
            <div v-if="slotProps.value" class="select-value">
              <strong>{{ slotProps.value.nombre }}</strong>
              <span class="value-price"
                >{{ parseFloat(slotProps.value.precio).toFixed(2) }} Bs</span
              >
            </div>
            <span v-else>{{ slotProps.placeholder }}</span>
          </template>
        </Select>
        <small v-if="selectedSabor" class="descripcion-text">{{ selectedSabor.descripcion }}</small>
      </div>

      <!-- Selección de Presentación -->
      <div class="selection-section">
        <label class="section-label"> <i class="pi pi-box"></i> Selecciona la Presentación </label>
        <Select
          v-model="selectedPresentacion"
          :options="presentaciones"
          optionLabel="nombre"
          placeholder="Elige una presentación"
          class="w-full selection-field"
          filter
          filterPlaceholder="Buscar presentación..."
          @change="calcularPrecio"
        >
          <template #option="slotProps">
            <div class="select-option">
              <strong>{{ slotProps.option.nombre }}</strong>
              <span class="option-price"
                >{{ parseFloat(slotProps.option.precio).toFixed(2) }} Bs</span
              >
            </div>
          </template>
          <template #value="slotProps">
            <div v-if="slotProps.value" class="select-value">
              <strong>{{ slotProps.value.nombre }}</strong>
              <span class="value-price"
                >{{ parseFloat(slotProps.value.precio).toFixed(2) }} Bs</span
              >
            </div>
            <span v-else>{{ slotProps.placeholder }}</span>
          </template>
        </Select>
      </div>

      <!-- Selección de Tamaño -->
      <div class="selection-section">
        <label class="section-label"> <i class="pi pi-circle"></i> Selecciona el Tamaño </label>
        <Select
          v-model="selectedTamaño"
          :options="tamaños"
          optionLabel="nombre"
          placeholder="Elige un tamaño"
          class="w-full selection-field"
          filter
          filterPlaceholder="Buscar tamaño..."
          @change="calcularPrecio"
        >
          <template #option="slotProps">
            <div class="select-option">
              <div>
                <strong>{{ slotProps.option.nombre }}</strong>
                <small class="bolas-text">{{ slotProps.option.cantidadBolas }} bolas</small>
              </div>
              <span class="option-price"
                >{{ parseFloat(slotProps.option.precio).toFixed(2) }} Bs</span
              >
            </div>
          </template>
          <template #value="slotProps">
            <div v-if="slotProps.value" class="select-value">
              <div>
                <strong>{{ slotProps.value.nombre }}</strong>
                <small class="bolas-text">{{ slotProps.value.cantidadBolas }} bolas</small>
              </div>
              <span class="value-price"
                >{{ parseFloat(slotProps.value.precio).toFixed(2) }} Bs</span
              >
            </div>
            <span v-else>{{ slotProps.placeholder }}</span>
          </template>
        </Select>
      </div>

      <!-- Selección de Cantidad -->
      <div class="selection-section">
        <label class="section-label"> <i class="pi pi-hashtag"></i> Cantidad </label>
        <div class="quantity-container">
          <div class="quantity-input">
            <Button
              icon="pi pi-minus"
              @click="decrementQuantity"
              :disabled="quantity <= 1"
              class="quantity-btn minus-btn"
            />
            <InputNumber
              v-model="quantity"
              :min="1"
              :max="99"
              :showButtons="false"
              class="quantity-field"
            />
            <Button
              icon="pi pi-plus"
              @click="incrementQuantity"
              :disabled="quantity >= 99"
              class="quantity-btn plus-btn"
            />
          </div>
        </div>
      </div>

      <!-- Resumen del precio -->
      <div class="price-summary" v-if="selectedSabor && selectedPresentacion && selectedTamaño">
        <div class="summary-row">
          <span>Precio unitario:</span>
          <span class="precio-unitario">{{ precioUnitario.toFixed(2) }} Bs</span>
        </div>
        <div class="summary-row total-row">
          <span>Total:</span>
          <span class="precio-total">{{ (precioUnitario * quantity).toFixed(2) }} Bs</span>
        </div>
      </div>

      <!-- Acciones -->
      <div class="modal-actions">
        <Button label="Cancelar" class="p-button-text cancel-btn" @click="closeModal" />
        <Button
          label="Agregar al carrito"
          class="add-btn"
          @click="confirmAdd"
          icon="pi pi-shopping-cart"
          :disabled="!canAdd"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import type { Sabor, Presentacion, Tamaño } from '@/models/venta'

interface Props {
  visible: boolean
  sabores: Sabor[]
  presentaciones: Presentacion[]
  tamaños: Tamaño[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  confirm: [sabor: Sabor, presentacion: Presentacion, tamaño: Tamaño, cantidad: number]
  close: []
}>()

// Estado reactivo
const selectedSabor = ref<Sabor | null>(null)
const selectedPresentacion = ref<Presentacion | null>(null)
const selectedTamaño = ref<Tamaño | null>(null)
const quantity = ref(1)
const precioUnitario = ref(0)

// Computed
const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
})

const canAdd = computed(() => {
  return (
    selectedSabor.value && selectedPresentacion.value && selectedTamaño.value && quantity.value > 0
  )
})

// Methods
function calcularPrecio() {
  if (selectedSabor.value && selectedPresentacion.value && selectedTamaño.value) {
    precioUnitario.value =
      parseFloat(String(selectedSabor.value.precio)) +
      parseFloat(String(selectedPresentacion.value.precio)) +
      parseFloat(String(selectedTamaño.value.precio))
  }
}

function incrementQuantity() {
  if (quantity.value < 99) {
    quantity.value++
  }
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function confirmAdd() {
  if (canAdd.value && selectedSabor.value && selectedPresentacion.value && selectedTamaño.value) {
    emit(
      'confirm',
      selectedSabor.value,
      selectedPresentacion.value,
      selectedTamaño.value,
      quantity.value,
    )
    closeModal()
  }
}

function closeModal() {
  // Reset form
  selectedSabor.value = null
  selectedPresentacion.value = null
  selectedTamaño.value = null
  quantity.value = 1
  precioUnitario.value = 0
  emit('close')
  emit('update:visible', false)
}
</script>

<style scoped>
.heladeria-modal {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0.5rem;
}

.selection-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-label i {
  color: #fc95c4;
}

.selection-field {
  width: 100%;
}

.select-option,
.select-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.option-price,
.value-price {
  color: #fc95c4;
  font-weight: 600;
  font-size: 0.95rem;
}

.descripcion-text {
  color: #7f8c8d;
  font-style: italic;
  margin-top: -0.25rem;
}

.bolas-text {
  color: #95a5a6;
  margin-left: 0.5rem;
  font-size: 0.85rem;
}

.quantity-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.quantity-input {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  width: auto;
}

.quantity-btn {
  border-radius: 50%;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 2.75rem;
  min-height: 2.75rem;
  flex-shrink: 0;
  background: #fce4ec !important;
  color: #fc95c4 !important;
  border: none !important;
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover:not(:disabled) {
  background: #f8bbd0 !important;
}

.quantity-field {
  width: 200px;
  margin-left: 1rem;
  margin-right: 5rem;
  min-width: 200px;
  flex-shrink: 0;
}

.quantity-field :deep(.p-inputnumber-input) {
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.6rem 0.5rem;
  border: 2px solid #f8bbd0;
  border-radius: 8px;
}

.quantity-field :deep(.p-inputnumber-input):focus {
  border-color: #fc95c4;
  box-shadow: 0 0 0 0.2rem rgba(252, 149, 196, 0.25);
}

.price-summary {
  background: #fce4ec;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.total-row {
  border-top: 2px solid #f8bbd0;
  padding-top: 0.75rem;
  margin-top: 0.5rem;
  font-size: 1.15rem;
  font-weight: 700;
}

.precio-unitario {
  color: #fc95c4;
  font-weight: 600;
}

.precio-total {
  color: #d81b60;
  font-weight: 700;
  font-size: 1.25rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ecf0f1;
}

.cancel-btn {
  color: #7f8c8d !important;
}

.add-btn {
  background: linear-gradient(90deg, #fc95c4 0%, #f48fb1 100%) !important;
  border: none !important;
  color: white !important;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
}

.add-btn:disabled {
  background: #f8bbd0 !important;
  cursor: not-allowed;
}
</style>
