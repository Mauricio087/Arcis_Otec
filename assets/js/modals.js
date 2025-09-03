// ===== SISTEMA DE MODALES ARCIS =====
// Modales para diplomados, cursos y información adicional

class ARCISModal {
    constructor() {
        this.activeModal = null;
        this.isOpen = false;
        this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        this.firstFocusableElement = null;
        this.lastFocusableElement = null;
        
        this.init();
    }
    
    init() {
        this.createModalStructures();
        this.setupEventListeners();
        
        console.log('🔲 Sistema de modales ARCIS inicializado');
    }
    
    createModalStructures() {
        // Crear contenedor de modales si no existe
        let modalContainer = document.getElementById('modal-container');
        if (!modalContainer) {
            modalContainer = document.createElement('div');
            modalContainer.id = 'modal-container';
            document.body.appendChild(modalContainer);
        }
        
        // Crear modales para diplomados y cursos
        modalContainer.innerHTML = this.getModalsHTML();
    }
    
    getModalsHTML() {
        return `
            <!-- Modal Diplomados -->
            <div id="modal-diplomados" class="modal" role="dialog" aria-labelledby="modal-diplomados-title" aria-hidden="true">
                <div class="modal-overlay" aria-hidden="true"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="modal-diplomados-title" class="modal-title">
                            <svg class="modal-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6m6.82 6L12 12.72 5.18 9 12 5.28 18.82 9M17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                            </svg>
                            Diplomados ARCIS
                        </h2>
                        <button class="modal-close" aria-label="Cerrar modal">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="modal-intro">
                            <p class="modal-description">
                                Nuestros diplomados están diseñados para profesionales que buscan especialización avanzada en seguridad pública, inteligencia y gestión de riesgos.
                            </p>
                        </div>
                        
                        <div class="programs-grid">
                            <div class="program-card">
                                <div class="program-header">
                                    <div class="program-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.11 7 14 7.89 14 9C14 10.11 13.11 11 12 11C10.89 11 10 10.11 10 9C10 7.89 10.89 7 12 7M18 17H6V15.5C6 13.83 9.33 13 12 13S18 13.83 18 15.5V17Z"/>
                                        </svg>
                                    </div>
                                    <h3 class="program-title">Diplomado en Seguridad Pública</h3>
                                </div>
                                <div class="program-content">
                                    <p class="program-description">
                                        Formación integral en políticas públicas de seguridad, prevención del delito y gestión de crisis.
                                    </p>
                                    <ul class="program-features">
                                        <li>Duración: 6 meses</li>
                                        <li>Modalidad: Presencial y Online</li>
                                        <li>Certificación Universitaria</li>
                                        <li>Prácticas Profesionales</li>
                                    </ul>
                                    <div class="program-actions">
                                        <button class="btn btn-primary" data-whatsapp="diplomados">
                                            Solicitar Información
                                        </button>
                                        <a href="#" class="btn btn-outline" download>
                                            Descargar Brochure
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="program-card">
                                <div class="program-header">
                                    <div class="program-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z"/>
                                        </svg>
                                    </div>
                                    <h3 class="program-title">Diplomado en Inteligencia Criminal</h3>
                                </div>
                                <div class="program-content">
                                    <p class="program-description">
                                        Especialización en análisis criminal, inteligencia estratégica y técnicas de investigación avanzada.
                                    </p>
                                    <ul class="program-features">
                                        <li>Duración: 8 meses</li>
                                        <li>Modalidad: Presencial</li>
                                        <li>Certificación Internacional</li>
                                        <li>Casos Reales de Estudio</li>
                                    </ul>
                                    <div class="program-actions">
                                        <button class="btn btn-primary" data-whatsapp="diplomados">
                                            Solicitar Información
                                        </button>
                                        <a href="#" class="btn btn-outline" download>
                                            Descargar Brochure
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="program-card">
                                <div class="program-header">
                                    <div class="program-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9M19 9H14V4H5V21H19V9Z"/>
                                        </svg>
                                    </div>
                                    <h3 class="program-title">Diplomado en Gestión de Riesgos</h3>
                                </div>
                                <div class="program-content">
                                    <p class="program-description">
                                        Formación especializada en identificación, evaluación y mitigación de riesgos organizacionales.
                                    </p>
                                    <ul class="program-features">
                                        <li>Duración: 5 meses</li>
                                        <li>Modalidad: Online</li>
                                        <li>Certificación Profesional</li>
                                        <li>Simulacros y Ejercicios</li>
                                    </ul>
                                    <div class="program-actions">
                                        <button class="btn btn-primary" data-whatsapp="diplomados">
                                            Solicitar Información
                                        </button>
                                        <a href="#" class="btn btn-outline" download>
                                            Descargar Brochure
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-footer">
                            <div class="contact-info">
                                <h4>¿Necesitas más información?</h4>
                                <p>Nuestros asesores académicos están disponibles para resolver todas tus dudas.</p>
                                <div class="contact-actions">
                                    <button class="btn btn-primary btn-lg" data-whatsapp="diplomados">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.687"/>
                                        </svg>
                                        Contactar por WhatsApp
                                    </button>
                                    <a href="mailto:info@arcis.cl" class="btn btn-outline btn-lg">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                        Enviar Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Modal Cursos -->
            <div id="modal-cursos" class="modal" role="dialog" aria-labelledby="modal-cursos-title" aria-hidden="true">
                <div class="modal-overlay" aria-hidden="true"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="modal-cursos-title" class="modal-title">
                            <svg class="modal-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            Cursos de Especialización
                        </h2>
                        <button class="modal-close" aria-label="Cerrar modal">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="modal-intro">
                            <p class="modal-description">
                                Cursos especializados de corta duración para actualización profesional y desarrollo de competencias específicas.
                            </p>
                        </div>
                        
                        <div class="courses-grid">
                            <div class="course-item">
                                <div class="course-header">
                                    <div class="course-badge">Nuevo</div>
                                    <h3 class="course-title">Análisis de Inteligencia Criminal</h3>
                                </div>
                                <div class="course-content">
                                    <p class="course-description">
                                        Técnicas avanzadas de análisis criminal y elaboración de productos de inteligencia.
                                    </p>
                                    <div class="course-details">
                                        <span class="course-duration">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M17 13H11V7H12.5V11.5H17V13Z"/>
                                            </svg>
                                            40 horas
                                        </span>
                                        <span class="course-modality">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17 10.5V7C17 4.24 14.76 2 12 2S7 4.24 7 7V10.5C6.45 10.5 6 10.95 6 11.5V16.5C6 17.05 6.45 17.5 7 17.5H17C17.55 17.5 18 17.05 18 16.5V11.5C18 10.95 17.55 10.5 17 10.5M15.5 10.5H8.5V7C8.5 5.07 10.07 3.5 12 3.5S15.5 5.07 15.5 7V10.5Z"/>
                                            </svg>
                                            Online
                                        </span>
                                        <span class="course-price">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M7 15H9C9 16.08 10.37 17 12 17S15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7S9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"/>
                                            </svg>
                                            $150.000
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="course-item">
                                <div class="course-header">
                                    <h3 class="course-title">Prevención Situacional del Delito</h3>
                                </div>
                                <div class="course-content">
                                    <p class="course-description">
                                        Estrategias y técnicas para la prevención del delito a través del diseño ambiental.
                                    </p>
                                    <div class="course-details">
                                        <span class="course-duration">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M17 13H11V7H12.5V11.5H17V13Z"/>
                                            </svg>
                                            30 horas
                                        </span>
                                        <span class="course-modality">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 11.5C11.17 11.5 10.5 10.83 10.5 10S11.17 8.5 12 8.5 13.5 9.17 13.5 10 12.83 11.5 12 11.5M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z"/>
                                            </svg>
                                            Presencial
                                        </span>
                                        <span class="course-price">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M7 15H9C9 16.08 10.37 17 12 17S15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7S9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"/>
                                            </svg>
                                            $120.000
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="course-item">
                                <div class="course-header">
                                    <div class="course-badge popular">Popular</div>
                                    <h3 class="course-title">Gestión de Crisis y Emergencias</h3>
                                </div>
                                <div class="course-content">
                                    <p class="course-description">
                                        Protocolos y procedimientos para la gestión efectiva de situaciones de crisis.
                                    </p>
                                    <div class="course-details">
                                        <span class="course-duration">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M17 13H11V7H12.5V11.5H17V13Z"/>
                                            </svg>
                                            35 horas
                                        </span>
                                        <span class="course-modality">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17 10.5V7C17 4.24 14.76 2 12 2S7 4.24 7 7V10.5C6.45 10.5 6 10.95 6 11.5V16.5C6 17.05 6.45 17.5 7 17.5H17C17.55 17.5 18 17.05 18 16.5V11.5C18 10.95 17.55 10.5 17 10.5M15.5 10.5H8.5V7C8.5 5.07 10.07 3.5 12 3.5S15.5 5.07 15.5 7V10.5Z"/>
                                            </svg>
                                            Híbrido
                                        </span>
                                        <span class="course-price">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M7 15H9C9 16.08 10.37 17 12 17S15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7S9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"/>
                                            </svg>
                                            $135.000
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="course-item">
                                <div class="course-header">
                                    <h3 class="course-title">Ciberseguridad y Delitos Informáticos</h3>
                                </div>
                                <div class="course-content">
                                    <p class="course-description">
                                        Fundamentos de ciberseguridad e investigación de delitos informáticos.
                                    </p>
                                    <div class="course-details">
                                        <span class="course-duration">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M17 13H11V7H12.5V11.5H17V13Z"/>
                                            </svg>
                                            45 horas
                                        </span>
                                        <span class="course-modality">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17 10.5V7C17 4.24 14.76 2 12 2S7 4.24 7 7V10.5C6.45 10.5 6 10.95 6 11.5V16.5C6 17.05 6.45 17.5 7 17.5H17C17.55 17.5 18 17.05 18 16.5V11.5C18 10.95 17.55 10.5 17 10.5M15.5 10.5H8.5V7C8.5 5.07 10.07 3.5 12 3.5S15.5 5.07 15.5 7V10.5Z"/>
                                            </svg>
                                            Online
                                        </span>
                                        <span class="course-price">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M7 15H9C9 16.08 10.37 17 12 17S15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7S9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"/>
                                            </svg>
                                            $180.000
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-footer">
                            <div class="contact-info">
                                <h4>¿Interesado en nuestros cursos?</h4>
                                <p>Consulta por descuentos especiales y planes de financiamiento disponibles.</p>
                                <div class="contact-actions">
                                    <button class="btn btn-primary btn-lg" data-whatsapp="cursos">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.687"/>
                                        </svg>
                                        Contactar por WhatsApp
                                    </button>
                                    <a href="mailto:cursos@arcis.cl" class="btn btn-outline btn-lg">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                        Enviar Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Event listeners para abrir modales
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-modal]')) {
                e.preventDefault();
                const modalId = e.target.getAttribute('data-modal');
                this.openModal(modalId);
            }
            
            // Cerrar modal
            if (e.target.matches('.modal-close') || e.target.closest('.modal-close') || e.target.matches('.modal-overlay')) {
                this.closeModal();
            }
            
            // Botones de WhatsApp en modales
            if (e.target.matches('[data-whatsapp]')) {
                const action = e.target.getAttribute('data-whatsapp');
                this.handleWhatsAppClick(action);
            }
        });
        
        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
            
            // Navegación por teclado dentro del modal
            if (this.isOpen && e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.warn(`Modal ${modalId} no encontrado`);
            return;
        }
        
        // Cerrar modal activo si existe
        if (this.activeModal) {
            this.closeModal();
        }
        
        this.activeModal = modal;
        this.isOpen = true;
        
        // Mostrar modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        
        // Configurar elementos focusables
        this.setupFocusManagement(modal);
        
        // Enfocar el primer elemento
        if (this.firstFocusableElement) {
            this.firstFocusableElement.focus();
        } else {
            modal.focus();
        }
        
        // Emitir evento personalizado
        modal.dispatchEvent(new CustomEvent('modalOpen', {
            detail: { modalId }
        }));
        
        console.log(`🔲 Modal ${modalId} abierto`);
    }
    
    closeModal() {
        if (!this.activeModal) return;
        
        const modalId = this.activeModal.id;
        
        // Ocultar modal
        this.activeModal.classList.remove('active');
        this.activeModal.setAttribute('aria-hidden', 'true');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
        
        // Emitir evento personalizado
        this.activeModal.dispatchEvent(new CustomEvent('modalClose', {
            detail: { modalId }
        }));
        
        // Limpiar referencias
        this.activeModal = null;
        this.isOpen = false;
        this.firstFocusableElement = null;
        this.lastFocusableElement = null;
        
        console.log(`🔲 Modal ${modalId} cerrado`);
    }
    
    setupFocusManagement(modal) {
        const focusableElements = modal.querySelectorAll(this.focusableElements);
        const focusableArray = Array.from(focusableElements);
        
        this.firstFocusableElement = focusableArray[0];
        this.lastFocusableElement = focusableArray[focusableArray.length - 1];
    }
    
    handleTabNavigation(e) {
        if (!this.firstFocusableElement || !this.lastFocusableElement) return;
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === this.firstFocusableElement) {
                e.preventDefault();
                this.lastFocusableElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === this.lastFocusableElement) {
                e.preventDefault();
                this.firstFocusableElement.focus();
            }
        }
    }
    
    handleWhatsAppClick(action) {
        // Usar la función global de WhatsApp
        if (window.ARCIS && window.ARCIS.openWhatsApp) {
            const messages = window.ARCIS.CONFIG.whatsappMessages;
            const message = messages[action] || messages.general;
            window.ARCIS.openWhatsApp(message);
        } else {
            console.warn('Función de WhatsApp no disponible');
        }
    }
    
    // Métodos públicos
    open(modalId) {
        this.openModal(modalId);
    }
    
    close() {
        this.closeModal();
    }
    
    isModalOpen() {
        return this.isOpen;
    }
    
    getActiveModal() {
        return this.activeModal;
    }
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema de modales
    window.arcisModals = new ARCISModal();
    
    console.log('🔲 Sistema de modales ARCIS inicializado');
});

// ===== EXPORTAR CLASE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ARCISModal;
}

window.ARCISModal = ARCISModal;