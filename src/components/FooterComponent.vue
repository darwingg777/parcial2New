<template>
  <footer class="futuristic-footer mt-5">
    <div class="footer-glow"></div>
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <div class="footer-section">
            <h5 class="footer-title mb-3">
              <span class="title-icon">⚡</span>
              DigiStore
            </h5>
            <p class="footer-text">
              Tu tienda digital de confianza para productos tecnológicos del futuro.
              Innovación y calidad en cada producto.
            </p>
            <div class="social-links mt-3">
              <a href="#" class="btn btn-sm btn-outline-cyan me-2 social-btn">
                <i>📱</i>
              </a>
              <a href="#" class="btn btn-sm btn-outline-cyan me-2 social-btn">
                <i>🐦</i>
              </a>
              <a href="#" class="btn btn-sm btn-outline-cyan me-2 social-btn">
                <i>💼</i>
              </a>
              <a href="#" class="btn btn-sm btn-outline-cyan social-btn">
                <i>📷</i>
              </a>
            </div>
          </div>
        </div>
        
        <div class="col-lg-3 col-md-6">
          <div class="footer-section">
            <h5 class="footer-title mb-3">Enlaces Rápidos</h5>
            <ul class="list-unstyled footer-links">
              <li><a href="#" class="footer-link">Sobre Nosotros</a></li>
              <li><a href="#" class="footer-link">Productos</a></li>
              <li><a href="#" class="footer-link">Términos y Condiciones</a></li>
              <li><a href="#" class="footer-link">Política de Privacidad</a></li>
              <li><a href="#" class="footer-link">Preguntas Frecuentes</a></li>
            </ul>
          </div>
        </div>
        
        <div class="col-lg-2 col-md-6">
          <div class="footer-section">
            <h5 class="footer-title mb-3">Categorías</h5>
            <ul class="list-unstyled footer-links">
              <li><a href="#" class="footer-link">Movilidad</a></li>
              <li><a href="#" class="footer-link">Wearables</a></li>
              <li><a href="#" class="footer-link">Bio-Tech</a></li>
              <li><a href="#" class="footer-link">Seguridad</a></li>
              <li><a href="#" class="footer-link">Realidad Virtual</a></li>
            </ul>
          </div>
        </div>
        
        <div class="col-lg-3 col-md-6">
          <div class="footer-section">
            <h5 class="footer-title mb-3">Contacto</h5>
            <ul class="list-unstyled footer-contact">
              <li class="mb-3">
                <i class="contact-icon">📧</i>
                <div>
                  <small class="d-block text-muted">Email</small>
                  <a href="mailto:info@digistore.com" class="footer-link">info@digistore.com</a>
                </div>
              </li>
              <li class="mb-3">
                <i class="contact-icon">📞</i>
                <div>
                  <small class="d-block text-muted">Teléfono</small>
                  <a href="tel:+571234567890" class="footer-link">+57 123 456 7890</a>
                </div>
              </li>
              <li>
                <i class="contact-icon">📍</i>
                <div>
                  <small class="d-block text-muted">Ubicación</small>
                  <span class="footer-text">Bogotá, Colombia</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <hr class="footer-divider my-4">
      
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <p class="mb-0 footer-text">
            &copy; 2024 <span class="text-cyan fw-bold">DigiStore</span>. Todos los derechos reservados.
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end">
          <p class="mb-0 footer-text">
            Hecho con <span class="heart">💙</span> para el futuro
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
};
</script>

<style scoped>
.futuristic-footer {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  color: #fff;
  border-top: 2px solid rgba(0, 242, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 242, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.footer-section {
  position: relative;
  z-index: 1;
}

.footer-title {
  color: #00f2ff;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

.title-icon {
  margin-right: 0.5rem;
  font-size: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 5px #00f2ff);
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 10px #00f2ff);
  }
}

.footer-text {
  color: #8892b0;
  line-height: 1.8;
  font-size: 0.95rem;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-link {
  color: #8892b0;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
  padding-left: 15px;
}

.footer-link::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #00f2ff;
  opacity: 0;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #00f2ff;
  padding-left: 20px;
  transform: translateX(5px);
}

.footer-link:hover::before {
  opacity: 1;
}

.footer-contact li {
  display: flex;
  align-items: start;
  gap: 1rem;
}

.contact-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  filter: drop-shadow(0 0 8px rgba(0, 242, 255, 0.5));
}

.social-links {
  display: flex;
  gap: 0.5rem;
}

.social-btn {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid rgba(0, 242, 255, 0.5);
  background: transparent;
  transition: all 0.3s ease;
}

.social-btn i {
  font-size: 1.2rem;
}

.social-btn:hover {
  background: #00f2ff;
  border-color: #00f2ff;
  transform: translateY(-5px) rotate(360deg);
  box-shadow: 0 5px 20px rgba(0, 242, 255, 0.4);
}

.btn-outline-cyan {
  color: #00f2ff;
  border-color: #00f2ff;
}

.footer-divider {
  border-color: rgba(0, 242, 255, 0.2);
  opacity: 1;
}

.text-cyan {
  color: #00f2ff !important;
}

.heart {
  display: inline-block;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(1.2);
  }
  20%, 40% {
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .footer-title {
    font-size: 1rem;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .footer-contact li {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>