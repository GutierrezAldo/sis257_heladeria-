<template>
  <!-- sección de contacto inicio -->
  <div class="contact_section layout_padding" :id="id">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="contact_main">
            <h1 class="contact_taital">Contáctanos</h1>
            <form @submit.prevent="enviarContacto">
              <div class="form-group">
                <input type="text" class="email-bt" placeholder="Nombre" name="Nombre" v-model="contacto.nombre">
              </div>
              <div class="form-group">
                <input type="text" class="email-bt" placeholder="Correo electrónico" name="Correo"
                  v-model="contacto.correo">
              </div>
              <div class="form-group">
                <input type="text" class="email-bt" placeholder="Teléfono" name="Teléfono" v-model="contacto.telefono">
              </div>
              <div class="form-group">
                <textarea class="massage-bt" placeholder="Mensaje" rows="5" id="comentario" name="Mensaje"
                  v-model="contacto.mensaje"></textarea>
              </div>
              <div class="main_bt">
                <button type="submit" style="background-color: #fc95c4;" class="btn">ENVIAR</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-8">
          <div class="location_text">
            <ul>
              <li>
                <a href="#">
                  <span class="padding_left_10 active"><i class="fa fa-map-marker" aria-hidden="true"></i></span>
                  Avenida Las Américas #100
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="padding_left_10"><i class="fa fa-phone" aria-hidden="true"></i></span>
                  Teléfono: +591 78000000
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="padding_left_10"><i class="fa fa-envelope" aria-hidden="true"></i></span>
                  Email: contacto@heladeriadelicia.com
                </a>
              </li>
            </ul>
          </div>
          <div class="mail_main">
            <h3 class="newsletter_text">Boletín de novedades</h3>
            <form @submit.prevent="enviarBoletin">
              <div class="form-group d-flex align-items-stretch" style="gap: 10px;">
                <textarea class="update_mail flex-grow-1" placeholder="Ingresa tu correo electrónico" rows="2"
                  id="boletin" name="CorreoBoletin" v-model="boletinCorreo" style="resize: none;"></textarea>
                <div class="subscribe_bt d-flex align-items-stretch mt-2" style="height: 100%;">
                  <button type="submit" class="btn"
                    style="background-color: #fc95c4; color: #fff; border: none; height: 100%;">
                    Suscribirse
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="footer_social_icon">
            <ul>
              <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- sección de contacto fin -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps(['id'])

const contacto = ref({
  nombre: '',
  correo: '',
  telefono: '',
  mensaje: ''
})
const exitoContacto = ref(false)

function enviarContacto() {
  exitoContacto.value = true
  contacto.value = { nombre: '', correo: '', telefono: '', mensaje: '' }
  setTimeout(() => exitoContacto.value = false, 2000)
}

const boletinCorreo = ref('')
const exitoBoletin = ref(false)

function enviarBoletin() {
  exitoBoletin.value = true
  boletinCorreo.value = ''
  setTimeout(() => exitoBoletin.value = false, 2000)
}
</script>

<style scoped>
.alert-success {
  color: #e8e8e8;
  border-color: #c3e6cb;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  max-width: 220px;
  margin: 0.5rem auto 0 auto;
  text-align: center;
  border-radius: 4px;
  height: 60px;
}
</style>