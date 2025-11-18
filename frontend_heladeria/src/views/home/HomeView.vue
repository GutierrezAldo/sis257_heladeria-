<script setup lang="ts">
import Header from './Header.vue';
import About from './About.vue';
import Products from './Products.vue';
import Sizes from './Sizes.vue';
import Servicios from './Servicios.vue';
import Testimonial from './Testimonial.vue';
import Contact from './Contact.vue';
import Copyright from './Copyright.vue';
</script>

<template>
  <Header />

  <About id="about" />

  <Servicios id="services" />

  <Products id="icecream" />

  <Sizes id="sizes" />

  <Testimonial id="blog" />

  <Contact id="contact" />

  <Copyright />

</template>