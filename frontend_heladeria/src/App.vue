<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import '@/assets/css/style.css'
</script>

<template>
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>