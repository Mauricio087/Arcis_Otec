// ===== VARIABLES GLOBALES =====
let isScrolling = false;
let lastScrollTop = 0;
let ticking = false;

// ===== CONFIGURACIÓN =====
const CONFIG = {
    // Números de contacto (cambiar según necesidad)
    whatsappNumber: '+56912345678', // Número de WhatsApp de ARCIS
    
    // Mensajes predeterminados para WhatsApp
    whatsappMessages: {
        general: 'Hola, me interesa conocer más sobre los servicios de ARCIS.',
        asesoria: 'Hola, me interesa el servicio de Asesoría Estratégica. Me gustaría recibir más información.',
        investigacion: 'Hola, me interesa el servicio de Investigación Especializada. Me gustaría recibir más información.',
        encuestas: 'Hola, me interesa el servicio de Encuestas y Diagnósticos. Me gustaría recibir más información.',
        formacion: 'Hola, me interesa la Formación Académica y Profesional. Me gustaría recibir más información.',
        diplomados: 'Hola, me interesan los Diplomados de ARCIS. Me gustaría recibir más información.',
        cursos: 'Hola, me interesan los Cursos de Especialización de ARCIS. Me gustaría recibir más información.',
        'certificacion-direccion': 'Hola, me interesa la Certificación Especial en Dirección de Seguridad Pública de ARCIS. Me gustaría recibir más información sobre requisitos, contenido y fechas.',
        'certificacion-inspeccion': 'Hola, me interesa la Certificación Especial en Inspección Municipal de Seguridad Pública de ARCIS. Me gustaría recibir más información sobre requisitos, contenido y fechas.'
    },
    
    // Configuración del carrusel
    carousel: {
        autoplayInterval: 5000, // 5 segundos
        transitionDuration: 500  // 0.5 segundos
    }
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando ARCIS...');
    
    // Inicializar funcionalidades principales
    initNavigation();
    initScrollEffects();
    initFloatingButtons();
    initAnimations();
    initModals();
    // initForms(); // Función no implementada
    
    console.log('✅ ARCIS inicializado correctamente');
});

// ===== NAVEGACIÓN =====
function initNavigation() {
    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger, .navbar-toggle');
    const navMenu = document.querySelector('.nav-menu, .navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!header) return;
    
    // Crear estructura del header si no existe
    if (!header.innerHTML.trim()) {
        createHeaderStructure();
    }
    
    // Event listener para el botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Event listeners para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Inicializar dropdowns
    initDropdowns();
    
    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    console.log('📱 Navegación inicializada');
}

// ===== DROPDOWNS =====
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', handleDropdownClick);
    });
    
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
    
    console.log('📋 Dropdowns inicializados');
}

function handleDropdownClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const toggle = e.currentTarget;
    const dropdown = toggle.closest('.dropdown');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (!menu) return;
    
    // Cerrar otros dropdowns
    closeAllDropdowns(dropdown);
    
    // Toggle del dropdown actual
    const isOpen = menu.classList.contains('show');
    
    if (isOpen) {
        closeDropdown(dropdown);
    } else {
        openDropdown(dropdown);
    }
}

function openDropdown(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (toggle && menu) {
        toggle.classList.add('active');
        menu.classList.add('show');
    }
}

function closeDropdown(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (toggle && menu) {
        toggle.classList.remove('active');
        menu.classList.remove('show');
    }
}

function closeAllDropdowns(except = null) {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        if (dropdown !== except) {
            closeDropdown(dropdown);
        }
    });
}

function createHeaderStructure() {
    const header = document.getElementById('header');
    if (!header) return;
    
    // Solo crear la estructura si el header está completamente vacío
    // Esto evita sobrescribir la navegación existente en páginas como doctor.html y document.html
    if (header.innerHTML.trim() === '') {
        header.innerHTML = `
            <nav class="navbar">
                <div class="logo-container">
                    <img src="./assets/img/logo/logo.png" alt="ARCIS Logo" class="logo" onerror="this.src='./assets/img/logo/logo.jpg'">
                    <div>
                        <a href="index.html" class="logo-text">ARCIS</a>
                        <div class="logo-subtitle">Academia de Investigación en Riesgos, Inteligencia y Seguridad</div>
                    </div>
                </div>
                
                <ul class="nav-menu">
                    <li class="nav-item"><a href="index.html#hero" class="nav-link active">Inicio</a></li>
                    <li class="nav-item"><a href="index.html#servicios" class="nav-link">Servicios</a></li>
                    <li class="nav-item"><a href="index.html#formacion" class="nav-link">Formación</a></li>
                </ul>
                
                <button class="hamburger" aria-label="Menú">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        `;
    }
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger, .navbar-toggle');
    const navMenu = document.querySelector('.nav-menu, .navbar-menu');
    
    if (hamburger && navMenu) {
        const isActive = navMenu.classList.contains('active');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.style.overflow = !isActive ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger, .navbar-toggle');
    const navMenu = document.querySelector('.nav-menu, .navbar-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleNavClick(e) {
    const href = e.target.getAttribute('href');
    
    // Si es un enlace interno (comienza con #)
    if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetSection = document.querySelector(href);
        if (targetSection) {
            // Cerrar menú móvil si está abierto
            closeMobileMenu();
            
            // Scroll suave a la sección
            smoothScrollTo(targetSection);
            
            // Actualizar enlace activo
            updateActiveNavLink(e.target);
        }
    }
    
    // Si es un enlace externo, cerrar menú móvil
    if (href && !href.startsWith('#')) {
        closeMobileMenu();
    }
}

function updateActiveNavLink(activeLink) {
    // Remover clase active de todos los enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Agregar clase active al enlace clickeado
    activeLink.classList.add('active');
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Intersection Observer para actualizar navegación activa
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver(handleSectionIntersection, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    console.log('📜 Efectos de scroll inicializados');
}

function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

function updateScrollEffects() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.getElementById('header');
    const scrollUpBtn = document.querySelector('.btn-scroll-up');
    
    // Efecto del header al hacer scroll
    if (header) {
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Mostrar/ocultar botón de scroll up
    if (scrollUpBtn) {
        if (scrollTop > 300) {
            scrollUpBtn.classList.add('visible');
        } else {
            scrollUpBtn.classList.remove('visible');
        }
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

function handleSectionIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (navLink) {
                updateActiveNavLink(navLink);
            }
        }
    });
}

// ===== BOTONES FLOTANTES =====
function initFloatingButtons() {
    const floatingContainer = document.getElementById('floating-buttons');
    
    if (!floatingContainer) return;
    
    // Crear estructura de botones flotantes si no existe
    if (!floatingContainer.innerHTML.trim()) {
        createFloatingButtonsStructure();
    }
    
    // Event listeners para botones flotantes
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    const scrollUpBtn = document.querySelector('.btn-scroll-up');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', handleWhatsAppClick);
    }
    
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', scrollToTop);
    }
    
    console.log('🔘 Botones flotantes inicializados');
}

function createFloatingButtonsStructure() {
    const container = document.getElementById('floating-buttons');
    if (!container) return;
    
    container.innerHTML = `
        <a href="#" class="floating-btn btn-whatsapp" title="Contactar por WhatsApp">
            <svg viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.687"/>
            </svg>
        </a>
        
        <button class="floating-btn btn-scroll-up" title="Volver arriba">
            <svg viewBox="0 0 24 24">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
        </button>
    `;
}

function handleWhatsAppClick(e) {
    e.preventDefault();
    
    // Determinar el mensaje según la sección actual
    const currentSection = getCurrentSection();
    let message = CONFIG.whatsappMessages.general;
    
    if (CONFIG.whatsappMessages[currentSection]) {
        message = CONFIG.whatsappMessages[currentSection];
    }
    
    openWhatsApp(message);
}

function getCurrentSection() {
    const sections = ['hero', 'servicios', 'formacion'];
    const scrollTop = window.pageYOffset;
    
    for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            if (scrollTop >= elementTop - 100 && scrollTop < elementBottom - 100) {
                return section;
            }
        }
    }
    
    return 'general';
}

function openWhatsApp(message = CONFIG.whatsappMessages.general) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    console.log('📱 WhatsApp abierto:', message);
}

// ===== SCROLL SUAVE =====
function smoothScrollTo(target, duration = 800) {
    const targetPosition = target.offsetTop - 80; // Offset para el header fijo
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

function scrollToTop() {
    smoothScrollTo(document.body, 600);
}

// Función de easing para animación suave
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

// ===== MODALES =====
function initModals() {
    // Event listeners para botones que abren modales
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-modal]')) {
            e.preventDefault();
            const modalId = e.target.getAttribute('data-modal');
            openModal(modalId);
        }
        
        if (e.target.matches('.modal-close') || e.target.matches('.modal-overlay')) {
            closeModal();
        }
        
        // Manejar botones de WhatsApp con data-whatsapp
        if (e.target.matches('[data-whatsapp]')) {
            e.preventDefault();
            const action = e.target.getAttribute('data-whatsapp');
            const message = CONFIG.whatsappMessages[action] || CONFIG.whatsappMessages.general;
            openWhatsApp(message);
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    console.log('🔲 Modales inicializados');
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Enfocar el modal para accesibilidad
        modal.focus();
    }
}

function closeModal() {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sin soporte
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
    
    console.log('🖼️ Lazy loading inicializado');
}

// ===== ANIMACIONES =====
function initAnimations() {
    // Intersection Observer para animaciones al hacer scroll
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-animate');
                
                element.classList.add('animate', animation);
                animationObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => animationObserver.observe(el));
    
    console.log('✨ Animaciones inicializadas');
}

// ===== UTILIDADES =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== FUNCIONES PÚBLICAS =====
window.ARCIS = {
    openWhatsApp,
    smoothScrollTo,
    openModal,
    closeModal,
    CONFIG
};

// ===== FUNCIONALIDAD NAVBAR TOGGLE =====
// Función eliminada - se usa toggleMobileMenu en su lugar

// ===== LOG DE INICIALIZACIÓN =====
console.log('%c🎯 ARCIS - Academia de Investigación en Riesgos, Inteligencia y Seguridad', 'color: #1a365d; font-size: 16px; font-weight: bold;');
console.log('%c📧 Desarrollado con ❤️ para ARCIS', 'color: #3182ce; font-size: 12px;');