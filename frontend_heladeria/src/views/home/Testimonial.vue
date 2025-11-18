<template>
    <!-- sección de testimonios inicio -->
    <div class="testimonial_section layout_padding" :id="id">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="testimonial_taital">Testimonios</h1>
                </div>
            </div>
            <div class="testimonial_section_2">
                <div class="row">
                    <div class="col-md-12">
                        <div class="testimonial_box">
                            <div id="main_slider" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <p class="testimonial_text">¡Los helados aquí son deliciosos! Siempre encuentro nuevos sabores y la atención es excelente. Recomiendo la heladería a todos mis amigos.</p>
                                        <h4 class="client_name">María Fernández</h4>
                                        <div class="client_img"><img src="@/assets/images/client-img.png"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <p class="testimonial_text">Me encanta venir con mi familia los fines de semana. Los helados artesanales son los mejores de la ciudad.</p>
                                        <h4 class="client_name">Juan Pérez</h4>
                                        <div class="client_img"><img src="@/assets/images/client-img.png"></div>
                                    </div>
                                    <div class="carousel-item">
                                        <p class="testimonial_text">Gran variedad de sabores y un ambiente muy agradable. ¡Definitivamente mi heladería favorita!</p>
                                        <h4 class="client_name">Lucía Gómez</h4>
                                        <div class="client_img"><img src="@/assets/images/client-img.png"></div>
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
                                    <i class="fa fa-angle-left"></i>
                                </a>
                                <a class="carousel-control-next" href="#main_slider" role="button" data-slide="next">
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- sección de testimonios fin -->
</template>

<script setup lang="ts">
defineProps(['id'])
</script>
