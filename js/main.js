// Portfolio JavaScript - Héctor Laguna

// Mobile menu toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    showToast('Enviando mensaje...', 'info');
});

// Image Modal Functions
function openImageModal(imageSrc, imageTitle) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    modalImage.src = imageSrc;
    modalImage.alt = imageTitle;
    modalTitle.textContent = imageTitle;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeImageModal();
    }
});

// Video Modal Functions
function openVideoModal(videoSrc, videoTitle, videoDescription = '') {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoDescription = document.getElementById('modalVideoDescription');
    
    modalVideo.src = videoSrc;
    modalVideoTitle.textContent = videoTitle;
    modalVideoDescription.textContent = videoDescription;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Auto-play el video cuando se abre el modal
    modalVideo.play();
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    // Pausar y resetear el video
    modalVideo.pause();
    modalVideo.currentTime = 0;
    
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal with ESC key (actualizado para incluir video modal)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
        closeVideoModal();
        closeCertificateModal();
    }
});

// Function to copy email to clipboard
function copyEmail() {
    const email = 'hectorvlaguna@gmail.com';
    navigator.clipboard.writeText(email).then(function() {
        showToast('Email copiado al portapapeles!');
    });
}

// Function to show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    let bgColor = 'bg-green-500';
    let icon = 'fa-check';
    
    if (type === 'error') {
        bgColor = 'bg-red-500';
        icon = 'fa-exclamation-triangle';
    } else if (type === 'info') {
        bgColor = 'bg-blue-500';
        icon = 'fa-info-circle';
    }
    
    toast.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${bgColor} text-white`;
    toast.innerHTML = `<i class="fas ${icon} mr-2"></i>${message}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000);
}

// Typewriter Effect
function typeWriter(elementId, text, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Start typewriter animations when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        typeWriter('typewriter-name', 'Héctor Laguna', 100, () => {
            document.querySelector('.typewriter-cursor').style.opacity = '0';
            document.querySelector('.typewriter-cursor-2').style.opacity = '1';
            
            setTimeout(() => {
                typeWriter('typewriter-title', 'Desarrollador Java Backend', 80, () => {
                    setTimeout(() => {
                        document.querySelector('.typewriter-cursor-2').style.opacity = '0';
                        
                        const javaLogo = document.getElementById('java-logo');
                        javaLogo.style.animation = 'javaAppear 1s ease-out forwards';
                        javaLogo.style.opacity = '1';
                        
                        setTimeout(() => {
                            javaLogo.classList.add('java-pulse');
                        }, 1000);
                    }, 1000);
                });
            }, 500);
        });
    }, 1000);
});

// Dark Mode Functionality - Simple
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    
    // Apply initial theme
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        enableLightMode();
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark')) {
            enableLightMode();
            localStorage.setItem('theme', 'light');
            showToast('Modo claro activado', 'info');
        } else {
            enableDarkMode();
            localStorage.setItem('theme', 'dark');
            showToast('Modo oscuro activado', 'info');
        }
    });

    function enableDarkMode() {
        body.classList.add('dark');
        darkModeIcon.className = 'fas fa-sun';
        darkModeToggle.title = 'Cambiar a modo claro';
    }

    function enableLightMode() {
        body.classList.remove('dark');
        darkModeIcon.className = 'fas fa-moon';
        darkModeToggle.title = 'Cambiar a modo oscuro';
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    
    // Cerrar modal de video cuando se hace clic fuera del video
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeVideoModal();
            }
        });
    }
    
    // Inicializar sistema de certificados
    initCertificateSystem();
});

// Función específica para tu video electromic
function showElectromicDemo() {
    openVideoModal(
        './assets/videos/electromic.mp4',
        'Demo - Sistema de Gestión Electromic',
        'Demostración del sistema de gestión desarrollado con tecnologías web modernas.'
    );
}

// =====================================
// SISTEMA DE CERTIFICADOS - MEJORADO
// =====================================

// Configuración de certificados
const certificatesConfig = {
    'spring-security': {
        url: 'https://todocodeacademy.com/certificate/spring-security-mer/',
        title: 'Spring Security',
        academy: 'TodoCode Academy',
        date: 'Feb 2025',
        status: 'verified',
        description: 'Implementación de seguridad robusta en aplicaciones Spring',
        content: ['Autenticación JWT', 'Autorización basada en roles', 'Protección CSRF', 'Seguridad de endpoints']
    },
    'spring-boot': {
        url: 'https://todocodeacademy.com/certificate/fen/',
        title: 'Spring Boot',
        academy: 'TodoCode Academy', 
        date: '2023',
        status: 'browser-dependent',
        description: 'Desarrollo de APIs RESTful y microservicios',
        content: ['Spring Boot Fundamentals', 'REST APIs Development', 'Data JPA Integration', 'Security Implementation']
    },
    'microservices': {
        url: 'https://todocodeacademy.com/certificate/v9o/',
        title: 'Arquitectura de Microservicios',
        academy: 'TodoCode Academy',
        date: '2024',
        status: 'browser-dependent',
        description: 'Diseño de sistemas distribuidos y escalables',
        content: ['Patrones de Microservicios', 'Service Discovery', 'API Gateway', 'Monitoreo Distribuido']
    }
};

// Detectar navegador
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    let isCompatible = true;

    if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) {
        browserName = 'Chrome';
        isCompatible = true;
    } else if (userAgent.indexOf('Firefox') > -1) {
        browserName = 'Firefox';
        isCompatible = true;
    } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
        browserName = 'Safari';
        isCompatible = true;
    } else if (userAgent.indexOf('Edg') > -1) {
        browserName = 'Edge';
        isCompatible = false;
    } else {
        browserName = 'Other';
        isCompatible = false;
    }

    return { browserName, isCompatible };
}

// =====================================
// NUEVAS FUNCIONES DE PREVIEW
// =====================================

// Función para manejar preview expandible de certificados
function toggleCertificatePreview(certificateId) {
    const preview = document.getElementById(`preview-${certificateId}`);
    const chevron = document.getElementById(`chevron-${certificateId}`);
    
    if (!preview || !chevron) return;
    
    const isHidden = preview.classList.contains('hidden');
    
    // Cerrar otros previews abiertos (opcional - para mantener solo uno abierto)
    document.querySelectorAll('.certificate-preview').forEach(p => {
        if (p.id !== `preview-${certificateId}`) {
            p.classList.add('hidden');
        }
    });
    
    // Resetear todos los chevrons
    document.querySelectorAll('[id^="chevron-"]').forEach(c => {
        if (c.id !== `chevron-${certificateId}`) {
            c.classList.remove('rotate-180');
        }
    });
    
    if (isHidden) {
        // Mostrar preview
        preview.classList.remove('hidden');
        chevron.classList.add('rotate-180');
        
        // Scroll suave al preview si es necesario
        setTimeout(() => {
            preview.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 150);
        
        // Analytics/tracking (opcional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'certificate_preview_opened', {
                'certificate_id': certificateId
            });
        }
        
    } else {
        // Ocultar preview
        preview.classList.add('hidden');
        chevron.classList.remove('rotate-180');
    }
}

// Función mejorada para manejar clic en certificado (integrada con el sistema existente)
function handleSmartCertificateClick(certificateId, event) {
    event.preventDefault();
    event.stopPropagation();
    
    const config = certificatesConfig[certificateId];
    if (!config) {
        showToast('Certificado no encontrado', 'error');
        return;
    }

    const browserInfo = getBrowserInfo();

    // Spring Security siempre funciona
    if (certificateId === 'spring-security') {
        window.open(config.url, '_blank', 'noopener,noreferrer');
        showToast('Abriendo certificado verificado', 'success');
        return;
    }

    // Para otros certificados, mostrar opciones inteligentes
    if (browserInfo.isCompatible) {
        // Navegador compatible - intentar abrir directamente con confirmación
        showSmartCertificateModal(config, browserInfo, true);
    } else {
        // Navegador incompatible - mostrar modal informativo
        showSmartCertificateModal(config, browserInfo, false);
    }
}

// Modal mejorado y más informativo
function showSmartCertificateModal(config, browserInfo, isCompatible) {
    const existingModal = document.getElementById('certificateModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'certificateModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    
    const compatibilityColor = isCompatible ? 'green' : 'yellow';
    const compatibilityIcon = isCompatible ? 'fa-check-circle' : 'fa-exclamation-triangle';
    const compatibilityText = isCompatible ? 
        `Tu navegador (${browserInfo.browserName}) debería funcionar correctamente` :
        `Tu navegador (${browserInfo.browserName}) podría tener problemas. Recomendamos Chrome`;
    
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-6 relative shadow-2xl">
            <button onclick="closeCertificateModal()" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <i class="fas fa-times text-xl"></i>
            </button>
            
            <div class="text-center mb-6">
                <div class="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <i class="fas fa-certificate text-3xl text-blue-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    ${config.title}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                    ${config.academy} • ${config.date}
                </p>
            </div>
            
            <div class="bg-${compatibilityColor}-50 dark:bg-${compatibilityColor}-900 border border-${compatibilityColor}-200 dark:border-${compatibilityColor}-700 rounded-lg p-4 mb-6">
                <div class="flex items-start">
                    <i class="fas ${compatibilityIcon} text-${compatibilityColor}-600 mr-3 mt-1"></i>
                    <div>
                        <p class="text-sm text-${compatibilityColor}-800 dark:text-${compatibilityColor}-200 font-medium mb-1">
                            Estado de compatibilidad
                        </p>
                        <p class="text-xs text-${compatibilityColor}-700 dark:text-${compatibilityColor}-300">
                            ${compatibilityText}
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="space-y-3">
                <button 
                    onclick="window.open('${config.url}', '_blank'); closeCertificateModal(); showToast('${isCompatible ? 'Abriendo certificado...' : 'Intentando abrir - si no funciona, prueba con Chrome'}', 'info');"
                    class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
                >
                    <i class="fas fa-external-link-alt mr-2"></i>
                    ${isCompatible ? 'Abrir certificado' : 'Intentar abrir certificado'}
                </button>
                
                <div class="grid grid-cols-2 gap-3">
                    <button 
                        onclick="copyToClipboard('${config.url}'); showToast('Enlace copiado - pégalo en Chrome para mejor resultado', 'success');"
                        class="bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition duration-300 text-sm"
                    >
                        <i class="fas fa-copy mr-1"></i>
                        Copiar enlace
                    </button>
                    
                    <button 
                        onclick="window.open('https://todocodeacademy.com/cursos/', '_blank'); closeCertificateModal();"
                        class="bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition duration-300 text-sm"
                    >
                        <i class="fas fa-graduation-cap mr-1"></i>
                        TodoCode
                    </button>
                </div>
            </div>
            
            <div class="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    💡 <strong>Tip UX:</strong> ${isCompatible ? 
                        'Este certificado debería abrirse sin problemas' : 
                        'Para mejor experiencia, recomendamos Google Chrome'}
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });
}

// Manejar click en certificado (función original mantenida)
async function handleCertificateClick(certificateId, event) {
    event.preventDefault();
    
    const config = certificatesConfig[certificateId];
    if (!config) {
        showToast('Certificado no encontrado', 'error');
        return;
    }

    const browserInfo = getBrowserInfo();

    // Si es un certificado verificado o navegador compatible, abrir directamente
    if (config.status === 'verified' || browserInfo.isCompatible) {
        showToast('Abriendo certificado...', 'info');
        window.open(config.url, '_blank', 'noopener,noreferrer');
        return;
    }

    // Si hay problemas potenciales, mostrar modal informativo
    showCertificateModal(config, browserInfo);
}

// Modal informativo para certificados (función original mantenida)
function showCertificateModal(config, browserInfo) {
    const existingModal = document.getElementById('certificateModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'certificateModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
            <button onclick="closeCertificateModal()" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <i class="fas fa-times text-xl"></i>
            </button>
            
            <div class="text-center mb-6">
                <i class="fas fa-certificate text-4xl text-blue-600 mb-4"></i>
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    ${config.title}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                    ${config.academy} • ${config.date}
                </p>
            </div>
            
            <div class="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
                <div class="flex items-start">
                    <i class="fas fa-info-circle text-yellow-600 mr-3 mt-1"></i>
                    <div>
                        <p class="text-sm text-yellow-800 dark:text-yellow-200 font-medium mb-1">
                            Posible problema de compatibilidad
                        </p>
                        <p class="text-xs text-yellow-700 dark:text-yellow-300">
                            Tu navegador (${browserInfo.browserName}) podría tener problemas con este enlace. 
                            Funciona mejor en Chrome.
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-col space-y-3">
                <button 
                    onclick="window.open('${config.url}', '_blank'); closeCertificateModal();"
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    <i class="fas fa-external-link-alt mr-2"></i>
                    Intentar abrir certificado
                </button>
                
                <button 
                    onclick="copyToClipboard('${config.url}'); showToast('Enlace copiado - prueba pegándolo en Chrome');"
                    class="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    <i class="fas fa-copy mr-2"></i>
                    Copiar enlace para Chrome
                </button>
                
                <button 
                    onclick="window.open('https://todocodeacademy.com/cursos/', '_blank'); closeCertificateModal();"
                    class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                >
                    <i class="fas fa-graduation-cap mr-2"></i>
                    Verificar en TodoCode Academy
                </button>
            </div>
            
            <div class="text-center mt-4">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    💡 Tip: Para mejor experiencia, usa Google Chrome
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });
}

// Cerrar modal de certificado
function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Función helper para copiar al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Éxito - el toast se maneja desde donde se llama
    }).catch(() => {
        // Fallback para navegadores sin soporte
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    });
}

// Inicializar sistema de certificados
function initCertificateSystem() {
    const browserInfo = getBrowserInfo();
    
    // Si no es compatible, mostrar aviso discreto una sola vez
    if (!browserInfo.isCompatible && !sessionStorage.getItem('browserWarningShown')) {
        setTimeout(() => {
            showToast(`Para mejor experiencia con certificados, recomendamos usar Chrome`, 'info');
            sessionStorage.setItem('browserWarningShown', 'true');
        }, 3000); // Después de 3 segundos de cargar la página
    }
}
// =====================================
// DESCARGA DIRECTA DE CV - SENIOR LEVEL
// =====================================

/**
 * Descarga forzada del CV sin redirección
 * Maneja errores y da feedback al usuario
 */
async function downloadCVDirectly() {
    const cvPath = 'assets/Cv_HéctorLaguna.pdf';
    const fileName = 'CV_Hector_Laguna.pdf';
    
    try {
        // Mostrar loading
        showToast('Preparando descarga...', 'info');
        
        // Fetch del archivo como blob
        const response = await fetch(cvPath);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // Convertir a blob
        const blob = await response.blob();
        
        // Crear URL temporal del blob
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Crear enlace temporal para descarga forzada
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        downloadLink.style.display = 'none';
        
        // Agregar al DOM, hacer click, y remover
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Limpiar URL temporal después de un delay
        setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
        }, 100);
        
        // Feedback de éxito
        showToast('CV descargado exitosamente! 📄', 'success');
        
        // Analytics tracking (opcional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'event_category': 'CV',
                'event_label': 'Direct_Download',
                'value': 1
            });
        }
        
    } catch (error) {
        console.error('Error descargando CV:', error);
        
        // Fallback: abrir en nueva pestaña si falla la descarga
        showToast('Error en descarga, abriendo CV...', 'error');
        window.open(cvPath, '_blank');
        
        // Analytics tracking del error
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download_error', {
                'event_category': 'CV',
                'event_label': error.message
            });
        }
    }
}

/**
 * Versión alternativa usando createObjectURL directo
 * Para casos donde fetch pueda fallar
 */
function downloadCVFallback() {
    const cvPath = 'assets/Cv_HéctorLaguna.pdf';
    const fileName = 'CV_Hector_Laguna.pdf';
    
    try {
        showToast('Iniciando descarga...', 'info');
        
        // Crear enlace invisible con download forzado
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = fileName;
        link.target = '_self'; // Forzar mismo tab
        
        // Agregar headers para forzar descarga
        link.setAttribute('rel', 'noopener');
        link.style.display = 'none';
        
        document.body.appendChild(link);
        
        // Trigger click programático
        link.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);
        
        showToast('Descarga iniciada! 📥', 'success');
        
    } catch (error) {
        console.error('Fallback download failed:', error);
        showToast('Error en descarga', 'error');
    }
}

/**
 * Función híbrida que combina ambas estrategias
 * Primero intenta blob, luego fallback
 */
async function downloadCVHybrid() {
    // Detectar si el navegador soporta fetch y blob
    if (window.fetch && window.URL && window.URL.createObjectURL) {
        await downloadCVDirectly();
    } else {
        // Fallback para navegadores antiguos
        downloadCVFallback();
    }
}

/**
 * Versión más robusta con detección de dispositivo
 */
function downloadCVSmart() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
        // iOS tiene limitaciones especiales
        showToast('En iOS, se abrirá el CV para guardar manualmente', 'info');
        window.open('assets/Cv_HéctorLaguna.pdf', '_blank');
    } else if (isMobile) {
        // Android y otros móviles
        downloadCVHybrid();
    } else {
        // Desktop - método más robusto
        downloadCVDirectly();
    }
}

// Exponer funciones globalmente
window.downloadCVDirectly = downloadCVDirectly;
window.downloadCVFallback = downloadCVFallback;
window.downloadCVHybrid = downloadCVHybrid;
window.downloadCVSmart = downloadCVSmart;

// Make functions global
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.showElectromicDemo = showElectromicDemo;
window.copyEmail = copyEmail;
window.toggleMenu = toggleMenu;
window.handleCertificateClick = handleCertificateClick;
window.closeCertificateModal = closeCertificateModal;
window.copyToClipboard = copyToClipboard;
window.toggleCertificatePreview = toggleCertificatePreview;
window.handleSmartCertificateClick = handleSmartCertificateClick;