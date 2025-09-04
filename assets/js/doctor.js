/**
 * Doctor Honoris Causa - Funcionalidades específicas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los botones de WhatsApp específicos para Doctor Honoris Causa
    initWhatsAppButtons();
    
    // Inicializar los modales específicos para Doctor Honoris Causa
    initModals();
});

/**
 * Inicializa los botones de WhatsApp específicos para Doctor Honoris Causa
 */
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('[data-whatsapp="doctor"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = encodeURIComponent('Hola, me gustaría obtener información sobre el Doctor Honoris Causa en Seguridad Pública.');
            const phoneNumber = '56912345678'; // Reemplazar con el número real
            
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    });
}

/**
 * Inicializa los modales específicos para Doctor Honoris Causa
 */
function initModals() {
    // Si se implementan modales específicos para esta página
    const doctorInfoButton = document.querySelector('[data-modal="doctor-info"]');
    
    if (doctorInfoButton) {
        doctorInfoButton.addEventListener('click', function() {
            // Aquí se puede implementar la lógica para mostrar un modal con más información
            // Por ahora, simplemente mostramos una alerta
            alert('Próximamente más información sobre el Doctor Honoris Causa en Seguridad Pública.');
        });
    }
}