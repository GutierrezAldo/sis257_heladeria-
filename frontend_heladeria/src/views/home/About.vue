<template>
    <!-- inicio sección acerca de -->
    <div class="about_section layout_padding" :id="id">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="about_img"><img src="@/assets/images/about-img.png"></div>
                </div>
                <div class="col-md-6">
                    <h1 class="about_taital">Sobre la Heladería</h1>
                    <p class="about_text">
                        Somos una heladería dedicada a ofrecer los mejores sabores artesanales, elaborados con ingredientes frescos y de alta calidad. Nuestro compromiso es brindar una experiencia única y refrescante para toda la familia. Ven y disfruta de nuestros helados, postres y bebidas en un ambiente acogedor y familiar.
                    </p>
                    <div class="read_bt_1"><a href="#">Leer Más</a></div>
                </div>
            </div>
        </div>
    </div>
    <!-- fin sección acerca de -->
</template>

<script setup lang="ts">
defineProps(['id'])
</script>
