<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/index'

const usuario = ref('')
const clave = ref('')
const error = ref('')
const loading = ref(false)

function onSubmit() {
  error.value = ''
  if (!usuario.value || !clave.value) {
    error.value = 'Por favor, complete ambos campos.'
    return
  }
  loading.value = true
  const authStore = useAuthStore()
  authStore.login(usuario.value, clave.value)
    .catch(() => {
      error.value = 'Usuario y/o contraseña incorrectos'
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="login-container">
    <h1 class="text-center">🍦 Iniciar Sesión</h1>
    <form class="form" @submit.prevent="onSubmit">
      <label class="form-label" for="usuario">Usuario:</label>
      <input v-model="usuario" id="usuario" type="text" class="form-input" placeholder="Usuario" autofocus />

      <label class="form-label" for="clave">Contraseña:</label>
      <input v-model="clave" id="clave" type="password" class="form-input" placeholder="Contraseña" />

      <transition name="fade">
        <p v-if="error" class="text-danger">{{ error }}</p>
      </transition>
      <input :disabled="loading" type="submit" class="form-submit" :value="loading ? 'Ingresando...' : 'Ingresar'" />
    </form>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fc95c4 0%, #fff 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  color: #fc95c4;
  margin-bottom: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.form {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 24px 0 rgba(252, 149, 196, 0.2);
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-top: 1.2rem;
  color: #fc95c4;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.form-input {
  padding: 10px 15px;
  border: 1.5px solid #fc95c4;
  border-radius: 0.5rem;
  color: #333;
  background: #fff;
  font-size: 1rem;
  transition: border 0.2s;
  outline: none;
}
.form-input:focus {
  border-color: #fc95c4;
  box-shadow: 0 0 0 2px #fc95c47a;
}

.form-submit {
  background: #fc95c4;
  border: none;
  border-radius: 2rem;
  color: white;
  margin-top: 2rem;
  padding: 0.9rem 0;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
}
.form-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.text-danger {
  color: #d72660;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
