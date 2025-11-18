<template>
  <!-- sección de tamaños inicio -->
  <div class="sizes_section layout_padding" :id="id">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="sizes_taital">Nuestros Tamaños</h1>
          <p class="sizes_text">Elige la presentación perfecta para disfrutar tu helado favorito</p>
        </div>
      </div>
      <div class="sizes_section_2">
        <div class="row">
          <!-- Cono -->
          <div class="col-md-4">
            <div class="size_card">
              <div class="size_icon">
                <i class="pi pi-star" style="font-size: 3rem; color: #fc95c4;"></i>
              </div>
              <h3 class="size_title">Cono</h3>
              <div class="size_details">
                <p class="size_balls">🍦 1-2 Bolas</p>
                <p class="size_description">Ideal para disfrutar caminando. Un cono crujiente con tu sabor favorito.</p>
                <div class="size_features">
                  <span class="feature_badge">Portátil</span>
                  <span class="feature_badge">Individual</span>
                </div>
                <p class="size_price">Desde Bs. 10</p>
              </div>
            </div>
          </div>
          <!-- Copa -->
          <div class="col-md-4">
            <div class="size_card featured">
              <div class="popular_badge">¡Más Popular!</div>
              <div class="size_icon">
                <i class="pi pi-star" style="font-size: 3.5rem; color: #fc95c4;"></i>
              </div>
              <h3 class="size_title">Copa</h3>
              <div class="size_details">
                <p class="size_balls">🍦 2-3 Bolas</p>
                <p class="size_description">Perfecta para sentarse y disfrutar. Incluye toppings y crema batida.</p>
                <div class="size_features">
                  <span class="feature_badge">Con toppings</span>
                  <span class="feature_badge">Generosa</span>
                </div>
                <p class="size_price">Desde Bs. 18</p>
              </div>
            </div>
          </div>
          <!-- Envase -->
          <div class="col-md-4">
            <div class="size_card">
              <div class="size_icon">
                <i class="pi pi-star" style="font-size: 4rem; color: #fc95c4;"></i>
              </div>
              <h3 class="size_title">Envase</h3>
              <div class="size_details">
                <p class="size_balls">🍦 4-6 Bolas</p>
                <p class="size_description">Tamaño familiar para compartir. Lleva tu helado a casa y disfrútalo.</p>
                <div class="size_features">
                  <span class="feature_badge">Familiar</span>
                  <span class="feature_badge">Para llevar</span>
                </div>
                <p class="size_price">Desde Bs. 25</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="additional_info">
        <div class="row">
          <div class="col-md-6">
            <div class="info_box">
              <i class="pi pi-star-fill" style="font-size: 2rem; color: #ffd700;"></i>
              <h4>Personaliza tu Helado</h4>
              <p>Combina diferentes sabores en una misma presentación y crea tu helado perfecto.</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="info_box">
              <i class="pi pi-heart-fill" style="font-size: 2rem; color: #fc95c4;"></i>
              <h4>Ingredientes Premium</h4>
              <p>Todos nuestros helados están hechos con ingredientes frescos y de la más alta calidad.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- sección de tamaños fin -->
</template>

<script setup lang="ts">
defineProps(['id'])
</script>

<style scoped>
.sizes_section {
  background: linear-gradient(135deg, #fce4ec 0%, #fff 100%);
  padding: 80px 0;
}

.sizes_taital {
  width: 100%;
  font-size: 48px;
  color: #fc95c4;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
}

.sizes_text {
  width: 100%;
  font-size: 18px;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 50px;
}

.sizes_section_2 {
  margin-top: 40px;
  margin-bottom: 50px;
}

.size_card {
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  margin: 15px 0;
  box-shadow: 0 8px 24px rgba(252, 149, 196, 0.15);
  transition: all 0.3s ease;
  text-align: center;
  height: 100%;
  position: relative;
  border: 3px solid transparent;
}

.size_card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 32px rgba(252, 149, 196, 0.25);
  border-color: #fc95c4;
}

.size_card.featured {
  border-color: #fc95c4;
  background: linear-gradient(135deg, #fff 0%, #fce4ec 100%);
  transform: scale(1.05);
}

.size_card.featured:hover {
  transform: scale(1.05) translateY(-10px);
}

.popular_badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #fc95c4 0%, #f48fb1 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(252, 149, 196, 0.3);
}

.size_icon {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.size_title {
  font-size: 32px;
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 20px;
}

.size_details {
  text-align: center;
}

.size_balls {
  font-size: 20px;
  color: #fc95c4;
  font-weight: 600;
  margin-bottom: 15px;
}

.size_description {
  font-size: 16px;
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
  min-height: 60px;
}

.size_features {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.feature_badge {
  background: #fce4ec;
  color: #d81b60;
  padding: 6px 15px;
  border-radius: 15px;
  font-size: 13px;
  font-weight: 600;
}

.size_price {
  font-size: 24px;
  color: #fc95c4;
  font-weight: bold;
  margin-top: 15px;
}

.additional_info {
  margin-top: 60px;
}

.info_box {
  background: white;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin: 15px 0;
  transition: all 0.3s ease;
}

.info_box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(252, 149, 196, 0.2);
}

.info_box i {
  margin-bottom: 15px;
}

.info_box h4 {
  font-size: 22px;
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 10px;
}

.info_box p {
  font-size: 15px;
  color: #7f8c8d;
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .sizes_taital {
    font-size: 36px;
  }

  .size_card.featured {
    transform: scale(1);
  }

  .size_card.featured:hover {
    transform: translateY(-10px);
  }

  .size_title {
    font-size: 26px;
  }

  .size_description {
    min-height: auto;
  }
}
</style>
