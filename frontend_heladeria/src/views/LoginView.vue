<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/index'

const usuario = ref('')
const clave = ref('')
const error = ref(false)

function onSubmit() {
  const authStore = useAuthStore()
  authStore.login(usuario.value, clave.value).catch(() => (error.value = true))
}
</script>

<template>
  <div class="login-container my-5 pt-5">
    <h1 class="text-center login-title">Heladería NOVA</h1>
    <p class="text-center login-subtitle">Iniciar Sesión</p>
    <form class="form" @submit.prevent="onSubmit">
      <label class="form-label">Usuario:</label>
      <input v-model="usuario" type="text" class="form-input" placeholder="Usuario" autofocus />

      <label class="form-label">Contraseña:</label>
      <input v-model="clave" type="password" class="form-input" placeholder="Contraseña" />

      <p v-if="error" class="text-danger mt-3 text-center">Usuario y/o contraseña incorrectos</p>
      <input type="submit" class="form-submit" value="Ingresar" />
    </form>
  </div>
</template>

<style scoped>
.login-title {
  color: #2b1b24;
  font-weight: 700;
}

.login-subtitle {
  color: #e84a7f;
  font-weight: 600;
  font-size: 1.1rem;
}

.form {
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(43, 27, 36, 0.95);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(43, 27, 36, 0.3);
}

.form-label {
  margin-top: 1.5rem;
  color: #fff9f5;
  margin-bottom: 0.5rem;
}

.form-input {
  padding: 10px 15px;
  background: none;
  border: 1px solid #fff9f5;
  border-radius: 4px;
  color: #fff9f5;
}

.form-input:focus {
  outline: none;
  border-color: #e84a7f;
}

.form-submit {
  background: #e84a7f;
  border: none;
  border-radius: 5rem;
  color: white;
  font-weight: 600;
  margin-top: 2.5rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
}

.form-submit:hover {
  background: #c93668;
}
</style>