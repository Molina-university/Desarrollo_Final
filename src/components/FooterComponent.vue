<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <i class="bi bi-book-fill"></i>
          <span>Librería Online</span>
        </div>
        <div class="footer-text">
          <p class="mb-0">© 2025 Todos los derechos reservados</p>
          <small>Proyecto académico - Desarrollo de Aplicaciones Web</small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, var(--color-dark) 0%, #0f172a 100%);
  color: white;
  padding: 1.5rem 0;
  margin-top: auto;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
}

.footer-brand i {
  font-size: 1.25rem;
  color: var(--color-accent);
}

.footer-text {
  color: rgba(255, 255, 255, 0.8);
}

.footer-text small {
  color: rgba(255, 255, 255, 0.6);
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .footer-text {
    text-align: right;
  }
}
</style>