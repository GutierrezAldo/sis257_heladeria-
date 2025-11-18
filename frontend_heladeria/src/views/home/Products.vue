<template>
    <!-- sección de helados inicio -->
    <div class="cream_section layout_padding" :id="id">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="cream_taital">Nuestros Helados</h1>
                    <p class="cream_text">Disfruta de nuestros sabores más populares y deliciosos</p>
                </div>
            </div>
            <!-- Fila 1: Sabor Frutilla (3 presentaciones) -->
            <div class="cream_section_2">
                <div class="row">
                    <div class="col-md-4">
                        <div class="cream_box">
                            <div class="cream_img"><img src="@/assets/images/productos/cono/cono-frutilla.png"></div>
                            <div class="price_text">Bs.10</div>
                            <h6 class="strawberry_text">Frutilla - Cono</h6>
                            <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="cream_box">
                            <div class="cream_img"><img src="@/assets/images/productos/copa/copa-frutilla.png"></div>
                            <div class="price_text">Bs.18</div>
                            <h6 class="strawberry_text">Frutilla - Copa</h6>
                            <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="cream_box">
                            <div class="cream_img"><img src="@/assets/images/productos/envase/envase-frutilla.png">
                            </div>
                            <div class="price_text">Bs.25</div>
                            <h6 class="strawberry_text">Frutilla - Envase</h6>
                            <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Fila 2: Sabor Manzana (3 presentaciones) -->
            <div class="cream_section_2">
                <div class="row">
                    <div class="col-md-4">
                        <div class="cream_box">
                            <div class="cream_img"><img src="@/assets/images/productos/cono/cono-manzana.png"></div>
                            <div class="price_text">Bs.10</div>
                            <h6 class="strawberry_text">Manzana - Cono</h6>
                            <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="cream_box">
                            <div class="cream_img"><img src="@/assets/images/productos/copa/copa-manzana.png"></div>
                            <div class="price_text">Bs.18</div>
                            <h6 class="strawberry_text">Manzana - Copa</h6>
                            <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="cream_box">
                            <div class="cream_img"><img src="@/assets/images/productos/envase/envase-manzana.png"></div>
                            <div class="price_text">Bs.25</div>
                            <h6 class="strawberry_text">Manzana - Envase</h6>
                            <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Filas adicionales que se muestran al hacer clic en "Ver más" -->
            <div>
                <!-- Fila 3: Sabor Naranja (3 presentaciones) -->
                <div class="cream_section_2">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="cream_box">
                                <div class="cream_img"><img src="@/assets/images/productos/cono/cono-naranja.png"></div>
                                <div class="price_text">Bs.12</div>
                                <h6 class="strawberry_text">Naranja - Cono</h6>
                                <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="cream_box">
                                <div class="cream_img"><img src="@/assets/images/productos/copa/copa-naranja.png"></div>
                                <div class="price_text">Bs.20</div>
                                <h6 class="strawberry_text">Naranja - Copa</h6>
                                <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="cream_box">
                                <div class="cream_img"><img src="@/assets/images/productos/envase/envase-naranja.png">
                                </div>
                                <div class="price_text">Bs.28</div>
                                <h6 class="strawberry_text">Naranja - Envase</h6>
                                <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fila 4: Sabor Banana (3 presentaciones) -->
                <div class="cream_section_2">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="cream_box">
                                <div class="cream_img"><img src="@/assets/images/productos/cono/cono-banana.png"></div>
                                <div class="price_text">Bs.11</div>
                                <h6 class="strawberry_text">Banana - Cono</h6>
                                <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="cream_box">
                                <div class="cream_img"><img src="@/assets/images/productos/copa/copa-banana.png"></div>
                                <div class="price_text">Bs.19</div>
                                <h6 class="strawberry_text">Banana - Copa</h6>
                                <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="cream_box">
                                <div class="cream_img"><img src="@/assets/images/productos/envase/envase-banana.png">
                                </div>
                                <div class="price_text">Bs.26</div>
                                <h6 class="strawberry_text">Banana - Envase</h6>
                                <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fila 5: Sabor Limón (3 presentaciones) -->
                <div class="cream_section_2">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="cream_box">
                                <div class="cream_img"><img src="@/assets/images/productos/cono/cono-limon.png"></div>
                                <div class="price_text">Bs.13</div>
                                <h6 class="strawberry_text">Limón - Cono</h6>
                                <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="cream_box">
                                <div class="cream_img"><img src="@/assets/images/productos/copa/copa-limon.png"></div>
                                <div class="price_text">Bs.22</div>
                                <h6 class="strawberry_text">Limón - Copa</h6>
                                <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="cream_box">
                                <div class="cream_img"><img src="@/assets/images/productos/envase/envase-limon.png">
                                </div>
                                <div class="price_text">Bs.30</div>
                                <h6 class="strawberry_text">Limón - Envase</h6>
                                <div class="cart_bt"><a href="#">Agregar al carrito</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- sección de helados fin -->
</template>

<script setup lang="ts">

defineProps(['id'])

</script>

<style scoped>
.layout_padding {
    padding: 80px 0;
}


.cream_box {
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cream_img {
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.cream_img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.price_text,
.strawberry_text,
.cart_bt {
    flex-shrink: 0;
}
</style>