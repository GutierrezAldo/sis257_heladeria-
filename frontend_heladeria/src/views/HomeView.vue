<script setup lang="ts">
import { ref } from 'vue'

const slide = ref(0)
</script>

<template>
  <!-- Carousel Start -->
  <div class="container-fluid p-0 mb-5 pb-5">
    <div id="header-carousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item" :class="{ active: slide === 0 }">
          <img class="w-100" src="/images/carousel-1.jpg" alt="Image">
          <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
            <div class="p-3" style="max-width: 900px;">
              <h4 class="text-white text-uppercase mb-md-3">Tradicional y delicioso</h4>
              <h1 class="display-3 text-white mb-md-4">Helados artesanales desde 1950</h1>
              <a href="#about" class="btn btn-primary py-md-3 px-md-5 mt-2">Conócenos</a>
            </div>
          </div>
        </div>
        <div class="carousel-item" :class="{ active: slide === 1 }">
          <img class="w-100" src="/images/carousel-2.jpg" alt="Image">
          <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
            <div class="p-3" style="max-width: 900px;">
              <h4 class="text-white text-uppercase mb-md-3">Tradicional y delicioso</h4>
              <h1 class="display-3 text-white mb-md-4">Elaborados con leche orgánica</h1>
              <a href="#products" class="btn btn-primary py-md-3 px-md-5 mt-2">Ver productos</a>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#header-carousel" @click.prevent="slide = slide === 0 ? 1 : 0">
        <div class="btn btn-secondary px-0" style="width: 45px; height: 45px;">
          <span class="carousel-control-prev-icon mb-n1"></span>
        </div>
      </a>
      <a class="carousel-control-next" href="#header-carousel" @click.prevent="slide = slide === 1 ? 0 : 1">
        <div class="btn btn-secondary px-0" style="width: 45px; height: 45px;">
          <span class="carousel-control-next-icon mb-n1"></span>
        </div>
      </a>
    </div>
  </div>
  <!-- Carousel End -->


  <!-- About Start -->
  <div id="about" class="container-fluid py-5">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <h1 class="section-title position-relative text-center mb-5">Helados tradicionales y deliciosos desde 1950</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 py-5">
          <h4 class="font-weight-bold mb-3">Sobre nosotros</h4>
          <h5 class="text-muted mb-3">En NOVA convertimos ingredientes seleccionados en momentos llenos de sabor.</h5>
          <p>Preparamos cada helado de forma artesanal, con recetas equilibradas y atención a cada detalle para que disfrutes una experiencia inolvidable.</p>
          <a href="#services" class="btn btn-secondary mt-2">Conoce nuestros servicios</a>
        </div>
        <div class="col-lg-4" style="min-height: 400px;">
          <div class="position-relative h-100 rounded overflow-hidden">
            <img class="position-absolute w-100 h-100" src="/images/about.jpg" style="object-fit: cover;">
          </div>
        </div>
        <div class="col-lg-4 py-5">
          <h4 class="font-weight-bold mb-3">Por qué elegirnos</h4>
          <p>Ingredientes frescos, sabores creativos y una preparación cuidadosa en cada porción.</p>
          <h5 class="text-muted mb-3"><i class="fa fa-check text-secondary mr-3"></i>Ingredientes seleccionados</h5>
          <h5 class="text-muted mb-3"><i class="fa fa-check text-secondary mr-3"></i>Recetas artesanales</h5>
          <h5 class="text-muted mb-3"><i class="fa fa-check text-secondary mr-3"></i>Atención cercana</h5>
          <a href="#products" class="btn btn-primary mt-2">Ver sabores</a>
        </div>
      </div>
    </div>
  </div>
  <!-- About End -->


  <!-- Promotion Start -->
  <div class="container-fluid my-5 py-5 px-0">
    <div class="row bg-primary m-0">
      <div class="col-md-6 px-0" style="min-height: 500px;">
        <div class="position-relative h-100">
          <img class="position-absolute w-100 h-100" src="/images/promotion.jpg" style="object-fit: cover;">
          <button type="button" class="btn-play" data-toggle="modal"
            data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-target="#videoModal">
            <span></span>
          </button>
        </div>
      </div>
      <div class="col-md-6 py-5 py-md-0 px-0">
        <div class="h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
          <div class="d-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
            style="width: 100px; height: 100px;">
            <h3 class="font-weight-bold text-secondary mb-0">Bs. 19,90</h3>
          </div>
          <h3 class="font-weight-bold text-white mt-3 mb-4">Helado de chocolate</h3>
          <p class="text-white mb-4">Chocolate intenso, textura cremosa y el toque especial de NOVA en cada cucharada.</p>
          <a href="#products" class="btn btn-secondary py-3 px-5 mt-2">Pedir ahora</a>
        </div>
      </div>
    </div>
  </div>
  <!-- Promotion End -->


  <!-- Video Modal Start -->
  <div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" src="" id="video" allowscriptaccess="always" allow="autoplay"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Video Modal End -->


  <!-- Services Start -->
  <div id="services" class="container-fluid py-5">
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-6">
          <h1 class="section-title position-relative mb-5">Servicios para disfrutar NOVA</h1>
        </div>
        <div class="col-lg-6 mb-5 mb-lg-0 pb-5 pb-lg-0"></div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="service-item">
              <div class="service-img mx-auto">
                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/images/service-1.jpg" style="object-fit: cover;">
              </div>
              <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px;">
                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Calidad garantizada</h5>
                <p>Elaboramos nuestros helados con ingredientes seleccionados y procesos cuidadosos.</p>
                <a href="#about" class="border-bottom border-secondary text-decoration-none text-secondary">Conocer más</a>
              </div>
            </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="service-item">
              <div class="service-img mx-auto">
                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/images/service-2.jpg" style="object-fit: cover;">
              </div>
              <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px;">
                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Atención personalizada</h5>
                <p>Te ayudamos a encontrar el sabor y la presentación perfecta para cada ocasión.</p>
                <a href="#about" class="border-bottom border-secondary text-decoration-none text-secondary">Conocer más</a>
              </div>
            </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="service-item">
              <div class="service-img mx-auto">
                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/images/service-3.jpg" style="object-fit: cover;">
              </div>
              <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px;">
                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Helados para celebrar</h5>
                <p>Haz que tus celebraciones sean más dulces con opciones para compartir.</p>
                <a href="#products" class="border-bottom border-secondary text-decoration-none text-secondary">Ver sabores</a>
              </div>
            </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="service-item">
              <div class="service-img mx-auto">
                <img class="rounded-circle w-100 h-100 bg-light p-3" src="/images/service-4.jpg" style="object-fit: cover;">
              </div>
              <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px;">
                <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5">Entrega a domicilio</h5>
                <p>Recibe tus helados favoritos en la comodidad de tu hogar.</p>
                <a href="#products" class="border-bottom border-secondary text-decoration-none text-secondary">Pedir ahora</a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Services End -->


  <!-- Portfolio Start -->
  <div class="container-fluid my-5 py-5 px-0">
    <div class="row justify-content-center m-0">
      <div class="col-lg-5">
        <h1 class="section-title position-relative text-center mb-5">Helados deliciosos elaborados con nuestra leche orgánica</h1>
      </div>
    </div>
    <div class="row m-0 portfolio-container">
      <div class="col-lg-4 col-md-6 p-0 portfolio-item">
        <div class="position-relative overflow-hidden">
          <img class="img-fluid w-100" src="/images/portfolio-1.jpg" alt="">
          <a class="portfolio-btn" href="/images/portfolio-1.jpg" data-lightbox="portfolio">
            <i class="fa fa-plus text-primary" style="font-size: 60px;"></i>
          </a>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 p-0 portfolio-item">
        <div class="position-relative overflow-hidden">
          <img class="img-fluid w-100" src="/images/portfolio-2.jpg" alt="">
          <a class="portfolio-btn" href="/images/portfolio-2.jpg" data-lightbox="portfolio">
            <i class="fa fa-plus text-primary" style="font-size: 60px;"></i>
          </a>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 p-0 portfolio-item">
        <div class="position-relative overflow-hidden">
          <img class="img-fluid w-100" src="/images/portfolio-3.jpg" alt="">
          <a class="portfolio-btn" href="/images/portfolio-3.jpg" data-lightbox="portfolio">
            <i class="fa fa-plus text-primary" style="font-size: 60px;"></i>
          </a>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 p-0 portfolio-item">
        <div class="position-relative overflow-hidden">
          <img class="img-fluid w-100" src="/images/portfolio-4.jpg" alt="">
          <a class="portfolio-btn" href="/images/portfolio-4.jpg" data-lightbox="portfolio">
            <i class="fa fa-plus text-primary" style="font-size: 60px;"></i>
          </a>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 p-0 portfolio-item">
        <div class="position-relative overflow-hidden">
          <img class="img-fluid w-100" src="/images/portfolio-5.jpg" alt="">
          <a class="portfolio-btn" href="/images/portfolio-5.jpg" data-lightbox="portfolio">
            <i class="fa fa-plus text-primary" style="font-size: 60px;"></i>
          </a>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 p-0 portfolio-item">
        <div class="position-relative overflow-hidden">
          <img class="img-fluid w-100" src="/images/portfolio-6.jpg" alt="">
          <a class="portfolio-btn" href="/images/portfolio-6.jpg" data-lightbox="portfolio">
            <i class="fa fa-plus text-primary" style="font-size: 60px;"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- Portfolio End -->


  <!-- Products Start -->
  <div id="products" class="container-fluid py-5">
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-6">
          <h1 class="section-title position-relative mb-5">Nuestros sabores favoritos</h1>
        </div>
        <div class="col-lg-6 mb-5 mb-lg-0 pb-5 pb-lg-0"></div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="product-item d-flex flex-column align-items-center text-center bg-light rounded py-5 px-3 h-100">
              <div class="bg-primary mt-n5 py-3" style="width: 80px;">
                <h4 class="font-weight-bold text-white mb-0">Bs. 9,90</h4>
              </div>
              <div class="position-relative bg-primary rounded-circle mt-n3 mb-4 p-3" style="width: 150px; height: 150px;">
                <img class="rounded-circle w-100 h-100" src="/images/product-1.jpg" style="object-fit: cover;">
              </div>
              <h5 class="font-weight-bold mb-4">Helado de vainilla</h5>
              <a href="#contact" class="btn btn-sm btn-secondary">Pedir ahora</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="product-item d-flex flex-column align-items-center text-center bg-light rounded py-5 px-3 h-100">
              <div class="bg-primary mt-n5 py-3" style="width: 80px;">
                <h4 class="font-weight-bold text-white mb-0">Bs. 9,90</h4>
              </div>
              <div class="position-relative bg-primary rounded-circle mt-n3 mb-4 p-3" style="width: 150px; height: 150px;">
                <img class="rounded-circle w-100 h-100" src="/images/product-2.jpg" style="object-fit: cover;">
              </div>
              <h5 class="font-weight-bold mb-4">Helado de chocolate</h5>
              <a href="#contact" class="btn btn-sm btn-secondary">Pedir ahora</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="product-item d-flex flex-column align-items-center text-center bg-light rounded py-5 px-3 h-100">
              <div class="bg-primary mt-n5 py-3" style="width: 80px;">
                <h4 class="font-weight-bold text-white mb-0">Bs. 12,90</h4>
              </div>
              <div class="position-relative bg-primary rounded-circle mt-n3 mb-4 p-3" style="width: 150px; height: 150px;">
                <img class="rounded-circle w-100 h-100" src="/images/product-3.jpg" style="object-fit: cover;">
              </div>
              <h5 class="font-weight-bold mb-4">Frutilla cremosa</h5>
              <a href="#contact" class="btn btn-sm btn-secondary">Pedir ahora</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="product-item d-flex flex-column align-items-center text-center bg-light rounded py-5 px-3 h-100">
              <div class="bg-primary mt-n5 py-3" style="width: 80px;">
                <h4 class="font-weight-bold text-white mb-0">Bs. 11,90</h4>
              </div>
              <div class="position-relative bg-primary rounded-circle mt-n3 mb-4 p-3" style="width: 150px; height: 150px;">
                <img class="rounded-circle w-100 h-100" src="/images/product-4.jpg" style="object-fit: cover;">
              </div>
              <h5 class="font-weight-bold mb-4">Menta con chocolate</h5>
              <a href="#contact" class="btn btn-sm btn-secondary">Pedir ahora</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="product-item d-flex flex-column align-items-center text-center bg-light rounded py-5 px-3 h-100">
              <div class="bg-primary mt-n5 py-3" style="width: 80px;">
                <h4 class="font-weight-bold text-white mb-0">Bs. 10,90</h4>
              </div>
              <div class="position-relative bg-primary rounded-circle mt-n3 mb-4 p-3" style="width: 150px; height: 150px;">
                <img class="rounded-circle w-100 h-100" src="/images/product-5.jpg" style="object-fit: cover;">
              </div>
              <h5 class="font-weight-bold mb-4">Dulce de leche</h5>
              <a href="#contact" class="btn btn-sm btn-secondary">Pedir ahora</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Products End -->


  <!-- Team Start -->
  <div class="container-fluid py-5">
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-6">
          <h1 class="section-title position-relative mb-5">Nuestro equipo de maestros heladeros</h1>
        </div>
        <div class="col-lg-6 mb-5 mb-lg-0 pb-5 pb-lg-0"></div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="team-item">
              <div class="team-img mx-auto">
                <img class="rounded-circle w-100 h-100" src="/images/team-1.jpg" style="object-fit: cover;">
              </div>
              <div class="position-relative text-center bg-light rounded px-4 py-5" style="margin-top: -100px;">
                <h3 class="font-weight-bold mt-5 mb-3 pt-5">Ana Morales</h3>
                <h6 class="text-uppercase text-muted mb-4">Designation</h6>
                <div class="d-flex justify-content-center pt-1">
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-twitter"></i></a>
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-facebook-f"></i></a>
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="team-item">
              <div class="team-img mx-auto">
                <img class="rounded-circle w-100 h-100" src="/images/team-2.jpg" style="object-fit: cover;">
              </div>
              <div class="position-relative text-center bg-light rounded px-4 py-5" style="margin-top: -100px;">
                <h3 class="font-weight-bold mt-5 mb-3 pt-5">Diego Flores</h3>
                <h6 class="text-uppercase text-muted mb-4">Designation</h6>
                <div class="d-flex justify-content-center pt-1">
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-twitter"></i></a>
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-facebook-f"></i></a>
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="team-item">
              <div class="team-img mx-auto">
                <img class="rounded-circle w-100 h-100" src="/images/team-3.jpg" style="object-fit: cover;">
              </div>
              <div class="position-relative text-center bg-light rounded px-4 py-5" style="margin-top: -100px;">
                <h3 class="font-weight-bold mt-5 mb-3 pt-5">Sofía Vargas</h3>
                <h6 class="text-uppercase text-muted mb-4">Designation</h6>
                <div class="d-flex justify-content-center pt-1">
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-twitter"></i></a>
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-facebook-f"></i></a>
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <div class="team-item">
              <div class="team-img mx-auto">
                <img class="rounded-circle w-100 h-100" src="/images/team-4.jpg" style="object-fit: cover;">
              </div>
              <div class="position-relative text-center bg-light rounded px-4 py-5" style="margin-top: -100px;">
                <h3 class="font-weight-bold mt-5 mb-3 pt-5">Luis Rojas</h3>
                <h6 class="text-uppercase text-muted mb-4">Designation</h6>
                <div class="d-flex justify-content-center pt-1">
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-twitter"></i></a>
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-facebook-f"></i></a>
                  <a class="btn btn-outline-secondary btn-social mr-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Team End -->


  <!-- Testimonial Start -->
  <div class="container-fluid py-5">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <h1 class="section-title position-relative text-center mb-5">Lo que dicen nuestros clientes</h1>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="testimonial-carousel">
            <div class="text-center">
              <i class="fa fa-3x fa-quote-left text-primary mb-4"></i>
              <h4 class="font-weight-light mb-4">El sabor es increíble y la atención hace que cada visita sea especial. Siempre volvemos por otro.</h4>
              <img class="img-fluid mx-auto mb-3" src="/images/testimonial-1.jpg" alt="">
              <h5 class="font-weight-bold m-0">María Fernanda</h5>
              <span>Cliente frecuente</span>
            </div>
            <div class="text-center">
              <i class="fa fa-3x fa-quote-left text-primary mb-4"></i>
              <h4 class="font-weight-light mb-4">Los helados son cremosos, frescos y tienen sabores para todos. NOVA es nuestro lugar favorito.</h4>
              <img class="img-fluid mx-auto mb-3" src="/images/testimonial-2.jpg" alt="">
              <h5 class="font-weight-bold m-0">Carlos Rojas</h5>
              <span>Familia NOVA</span>
            </div>
            <div class="text-center">
              <i class="fa fa-3x fa-quote-left text-primary mb-4"></i>
              <h4 class="font-weight-light mb-4">Pedimos una caja para una celebración y todos quedaron encantados. La entrega fue puntual.</h4>
              <img class="img-fluid mx-auto mb-3" src="/images/testimonial-3.jpg" alt="">
              <h5 class="font-weight-bold m-0">Lucía Vargas</h5>
              <span>Cliente NOVA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Testimonial End -->
</template>
