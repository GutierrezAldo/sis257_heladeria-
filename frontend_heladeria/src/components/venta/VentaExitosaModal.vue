<template>
  <div class="modal-exito">
    <div class="modal-content">
      <div class="icon-success">
        <i class="pi pi-check-circle"></i>
      </div>
      <h2>¡Venta realizada con éxito!</h2>
      <p>¿Qué deseas hacer ahora?</p>
      <div class="modal-actions">
        <Button label="Hacer otra venta" class="p-button-success" @click="$emit('otra-venta')" />
        <Button label="Ir a ventas" class="p-button-secondary" @click="$emit('ir-ventas')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
</script>

<style scoped>
.modal-exito {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
  padding: 16px 16px 16px 16px;
  text-align: center;
  min-width: 320px;
  max-width: 40vw;
}
.icon-success {
  font-size: 3rem;
  color: #43e97b;
  margin-bottom: 10px;
}
h2 {
  color: #00bcd4;
  margin-bottom: 8px;
}
.modal-actions {
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-top: 18px;
}
</style>
