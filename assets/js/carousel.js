// ===== CARRUSEL DE SERVICIOS ARCIS =====
// Carrusel avanzado con autoplay, controles manuales, indicadores y modal lightbox

class ARCISCarousel {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.warn(`Carrusel: No se encontró el contenedor ${containerSelector}`);
            return;
        }
        // Configuración por defecto
        this.config = {
            autoplay: true,
            autoplayInterval: 5000,
            transitionDuration: 500,
            pauseOnHover: true,
            showIndicators: true,
            showControls: true,
            loop: true,
            touchEnabled: true,
            ...options
        };
        
        // Estado del carrusel
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.isPlaying = this.config.autoplay;
        this.autoplayTimer = null;
        this.isTransitioning = false;
        
        // Elementos del DOM
        this.track = null;
        this.slides = [];
        this.indicators = [];
        this.prevBtn = null;
        this.nextBtn = null;
        this.playPauseBtn = null;
        
        // Touch/swipe
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
        
        this.init();
    }
    
    init() {
        this.createCarouselStructure();
        this.setupEventListeners();
        this.startAutoplay();
        
        console.log('🎠 Carrusel ARCIS inicializado');
    }
    
    createCarouselStructure() {
        // Crear estructura HTML del carrusel
        this.container.innerHTML = `
            <div class="carousel-wrapper">
                <div class="carousel-track-container">
                    <div class="carousel-track">
                        ${this.createSlidesHTML()}
                    </div>
                </div>

                ${this.config.showControls ? this.createControlsHTML() : ''}
                ${this.config.showIndicators ? this.createIndicatorsHTML() : ''}

                <div class="carousel-play-pause">
                    <button class="carousel-play-pause-btn" title="Pausar/Reproducir">
                        <svg class="play-icon" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        <svg class="pause-icon" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        // Obtener referencias a elementos
        this.track = this.container.querySelector('.carousel-track');
        this.slides = Array.from(this.container.querySelectorAll('.carousel-slide'));
        this.indicators = Array.from(this.container.querySelectorAll('.carousel-indicator'));
        this.prevBtn = this.container.querySelector('.carousel-btn-prev');
        this.nextBtn = this.container.querySelector('.carousel-btn-next');
        this.playPauseBtn = this.container.querySelector('.carousel-play-pause-btn');
        
        this.totalSlides = this.slides.length;
        
        // Configurar slide inicial
        if (this.slides.length > 0) {
            this.slides[0].classList.add('active');
            if (this.indicators.length > 0) {
                this.indicators[0].classList.add('active');
            }
        }
        
        this.updatePlayPauseButton();
    }
    
    createSlidesHTML() {
        // Datos de servicios y diplomados de ARCIS
        const slides = [
            {
                titulo: 'Asesoría Estratégica',
                descripcion: 'Consultoría especializada en gestión de riesgos, inteligencia y seguridad para organizaciones públicas y privadas.',
                imagen: './assets/img/galeria/asesoria_estrategica.jpg',
                icono: 'strategy',
                ctaText: 'Solicitar Asesoría',
                ctaAction: 'asesoria',
                tipo: 'servicio'
            },
            {
                titulo: 'Investigación Especializada',
                descripcion: 'Estudios e investigaciones aplicadas en seguridad pública, criminología y análisis de riesgos.',
                imagen: './assets/img/galeria/investigacion especializada.jpg',
                icono: 'research',
                ctaText: 'Conocer Más',
                ctaAction: 'investigacion',
                tipo: 'servicio'
            },
            {
                titulo: 'Encuestas y Diagnósticos',
                descripcion: 'Evaluaciones especializadas para medir percepción de seguridad y diagnósticos situacionales.',
                imagen: './assets/img/galeria/encuestas y diagnosticos.jpg',
                icono: 'survey',
                ctaText: 'Solicitar Diagnóstico',
                ctaAction: 'encuestas',
                tipo: 'servicio'
            },
            {
                titulo: 'Formación Académica',
                descripcion: 'Programas de capacitación y formación profesional en seguridad, inteligencia y gestión de riesgos.',
                imagen: './assets/img/galeria/formacion_academica.jpg',
                icono: 'education',
                ctaText: 'Ver Programas',
                ctaAction: 'formacion',
                tipo: 'servicio'
            },
            {
                titulo: 'Diplomado en Seguridad Pública',
                descripcion: 'Formación integral en políticas públicas de seguridad, prevención del delito y gestión de crisis.',
                imagen: './assets/img/galeria/diplomado_en_seguridad_publica.jpg',
                icono: 'education',
                ctaText: 'Ver Diplomados',
                ctaAction: 'diplomados',
                tipo: 'diplomado',
                duracion: '6 meses',
                certificacion: 'Certificación Universitaria'
            },
            {
                titulo: 'Diplomado en Inteligencia Criminal',
                descripcion: 'Especialización en análisis de información, investigación criminal y técnicas avanzadas de inteligencia.',
                imagen: './assets/img/galeria/diplomado en inteligencia criminal.jpg',
                icono: 'research',
                ctaText: 'Ver Diplomados',
                ctaAction: 'diplomados',
                tipo: 'diplomado',
                duracion: '8 meses',
                certificacion: 'Certificación Universitaria'
            }
        ];
        
        return slides.map((slide, index) => {
            if (slide.tipo === 'servicio') {
                return `
                    <div class="carousel-slide" data-slide="${index}">
                        <div class="service-card">
                            <div class="service-image">
                                <img src="${slide.imagen}" alt="${slide.titulo}" loading="lazy" onerror="this.src='./assets/img/servicios/default.jpg'">
                                <div class="service-overlay">
                                    <div class="service-icon">
                                        ${this.getServiceIcon(slide.icono)}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="service-content">
                                <h3 class="service-title">${slide.titulo}</h3>
                                <p class="service-description">${slide.descripcion}</p>
                                
                                <div class="service-actions">
                                    <button class="btn btn-primary service-cta" data-whatsapp="${slide.ctaAction}">
                                        ${slide.ctaText}
                                        <svg viewBox="0 0 24 24">
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                        </svg>
                                    </button>
                                    
                                    <button class="btn btn-outline service-modal" data-modal="modal-${slide.ctaAction}">
                                        Más Información
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (slide.tipo === 'diplomado') {
                return `
                    <div class="carousel-slide" data-slide="${index}">
                        <div class="service-card diplomado-card">
                            <div class="service-image">
                                <img src="${slide.imagen}" alt="${slide.titulo}" loading="lazy" onerror="this.src='./assets/img/formacion/default.jpg'">
                                <div class="service-overlay">
                                    <div class="service-icon">
                                        ${this.getServiceIcon(slide.icono)}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="service-content">
                                <h3 class="service-title">${slide.titulo}</h3>
                                <p class="service-description">${slide.descripcion}</p>
                                
                                <div class="service-features">
                                    <span class="feature-item">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M17 13H11V7H12.5V11.5H17V13Z"/>
                                        </svg>
                                        ${slide.duracion}
                                    </span>
                                    <span class="feature-item">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                        </svg>
                                        ${slide.certificacion}
                                    </span>
                                </div>
                                
                                <div class="service-actions">
                                    <button class="btn btn-primary service-cta" data-modal="modal-${slide.ctaAction}">
                                        ${slide.ctaText}
                                        <svg viewBox="0 0 24 24">
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                        </svg>
                                    </button>
                                    
                                    <button class="btn btn-outline service-modal" data-whatsapp="${slide.ctaAction}">
                                        Consultar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }).join('');
    }
    
    createControlsHTML() {
        return `
            <button class="carousel-btn carousel-btn-prev" title="Anterior">
                <svg viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>
            
            <button class="carousel-btn carousel-btn-next" title="Siguiente">
                <svg viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
            </button>
        `;
    }
    
    createIndicatorsHTML() {
        const indicatorsCount = 6; // Número de servicios + diplomados
        const indicators = Array.from({ length: indicatorsCount }, (_, index) => 
            `<button class="carousel-indicator" data-slide="${index}" title="Ir a slide ${index + 1}"></button>`
        ).join('');
        
        return `<div class="carousel-indicators">${indicators}</div>`;
    }
    
    getServiceIcon(iconType) {
        const icons = {
            strategy: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>`,
            research: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z"/>
            </svg>`,
            survey: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11z"/>
            </svg>`,
            education: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6m6.82 6L12 12.72 5.18 9 12 5.28 18.82 9M17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>`
        };
        
        return icons[iconType] || icons.strategy;
    }
    
    setupEventListeners() {
        // Controles de navegación
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Play/Pause
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.toggleAutoplay());
        }
        
        // Pausar en hover
        if (this.config.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.container.addEventListener('mouseleave', () => {
                if (this.isPlaying) this.startAutoplay();
            });
        }
        
        // Touch/Swipe
        if (this.config.touchEnabled) {
            this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        }
        
        // Botones CTA de WhatsApp
        this.container.addEventListener('click', (e) => {
            if (e.target.matches('[data-whatsapp]')) {
                const action = e.target.getAttribute('data-whatsapp');
                this.handleWhatsAppCTA(action);
            }
        });
        
        // Teclado
        this.container.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Hacer el contenedor focusable para navegación por teclado
        this.container.setAttribute('tabindex', '0');
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        const nextIndex = this.config.loop 
            ? (this.currentSlide + 1) % this.totalSlides
            : Math.min(this.currentSlide + 1, this.totalSlides - 1);
            
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        if (this.isTransitioning) return;
        
        const prevIndex = this.config.loop 
            ? (this.currentSlide - 1 + this.totalSlides) % this.totalSlides
            : Math.max(this.currentSlide - 1, 0);
            
        this.goToSlide(prevIndex);
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.isTransitioning = true;
        
        // Remover clase active del slide actual
        this.slides[this.currentSlide].classList.remove('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.remove('active');
        }
        
        // Actualizar índice actual
        this.currentSlide = index;
        
        // Agregar clase active al nuevo slide
        this.slides[this.currentSlide].classList.add('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }
        
        // Mover el track
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Resetear flag de transición
        setTimeout(() => {
            this.isTransitioning = false;
        }, this.config.transitionDuration);
        
        // Emitir evento personalizado
        this.container.dispatchEvent(new CustomEvent('slideChange', {
            detail: { currentSlide: this.currentSlide, totalSlides: this.totalSlides }
        }));
    }
    
    startAutoplay() {
        if (!this.config.autoplay || this.autoplayTimer) return;
        
        this.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, this.config.autoplayInterval);
        
        this.isPlaying = true;
        this.updatePlayPauseButton();
    }
    
    pauseAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }
    
    stopAutoplay() {
        this.pauseAutoplay();
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }
    
    toggleAutoplay() {
        if (this.isPlaying) {
            this.stopAutoplay();
        } else {
            this.startAutoplay();
        }
    }
    
    updatePlayPauseButton() {
        if (!this.playPauseBtn) return;
        
        const playIcon = this.playPauseBtn.querySelector('.play-icon');
        const pauseIcon = this.playPauseBtn.querySelector('.pause-icon');
        
        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            this.playPauseBtn.title = 'Pausar';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            this.playPauseBtn.title = 'Reproducir';
        }
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }
    
    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
    }
    
    handleSwipe() {
        const swipeDistance = this.touchStartX - this.touchEndX;
        
        if (Math.abs(swipeDistance) > this.minSwipeDistance) {
            if (swipeDistance > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    handleKeydown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case ' ':
                e.preventDefault();
                this.toggleAutoplay();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
        }
    }
    
    handleWhatsAppCTA(action) {
        // Usar la función global de WhatsApp con mensaje contextual
        if (window.ARCIS && window.ARCIS.openWhatsApp) {
            const messages = window.ARCIS.CONFIG.whatsappMessages;
            const message = messages[action] || messages.general;
            window.ARCIS.openWhatsApp(message);
        } else {
            console.warn('Función de WhatsApp no disponible');
        }
    }
    
    // Métodos públicos para control externo
    play() {
        this.startAutoplay();
    }
    
    pause() {
        this.stopAutoplay();
    }
    
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    destroy() {
        this.pauseAutoplay();
        // Remover event listeners si es necesario
        console.log('🗑️ Carrusel destruido');
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrusel de servicios si existe el contenedor
    const serviciosCarousel = document.getElementById('servicios-carousel');
    if (serviciosCarousel) {
        window.arcisServiciosCarousel = new ARCISCarousel('#servicios-carousel', {
            autoplay: true,
            autoplayInterval: 6000,
            pauseOnHover: true,
            showIndicators: true,
            showControls: true,
            loop: true,
            touchEnabled: true
        });
        
        console.log('🎠 Carrusel de servicios ARCIS inicializado');
    }
});

// ===== EXPORTAR CLASE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ARCISCarousel;
}

window.ARCISCarousel = ARCISCarousel;