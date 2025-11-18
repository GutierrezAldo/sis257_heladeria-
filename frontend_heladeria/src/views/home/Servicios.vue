<template>
    <!-- sección de servicios inicio -->
    <div class="services_section layout_padding" :id="id">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="services_taital">Nuestros Servicios</h1>
                    <p class="services_text">Disfruta de los mejores sabores y experiencias en nuestra heladería</p>
                </div>
            </div>
            <div class="services_section_2">
                <div class="row">
                    <div class="col-md-4">
                        <div class="services_box">
                            <h5 class="tasty_text"><span class="icon_img"><img
                                        src="@/assets/images/icon-1.png"></span>Helado de Galleta</h5>
                            <p class="lorem_text">Prueba nuestro delicioso helado de galleta, preparado con ingredientes
                                frescos y de calidad.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="services_box">
                            <h5 class="tasty_text"><span class="icon_img"><img
                                        src="@/assets/images/icon-2.png"></span>Helado Artesanal</h5>
                            <p class="lorem_text">Ofrecemos helados artesanales con una gran variedad de sabores para
                                todos los gustos.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="services_box">
                            <h5 class="tasty_text"><span class="icon_img"><img
                                        src="@/assets/images/icon-1.png"></span>Postres Helados</h5>
                            <p class="lorem_text">Disfruta de nuestros postres helados, perfectos para cualquier ocasión
                                especial.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seemore_bt"><a href="#">Ver Más</a></div>
        </div>
    </div>
    <!-- sección de servicios fin -->
</template>

<script setup lang="ts">
defineProps(['id'])
</script>
