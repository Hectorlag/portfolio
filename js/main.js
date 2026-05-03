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
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// =====================================
// IMAGE MODAL
// =====================================

function openImageModal(imageSrc, imageTitle) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');

    modalImage.src = imageSrc;
    modalImage.alt = imageTitle;
    if (modalTitle) modalTitle.textContent = imageTitle;

    // Estilos del overlay - fondo clickeable visible
    modal.style.cssText = `
        display: flex !important;
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.85);
        z-index: 9999;
        align-items: center;
        justify-content: center;
        padding: 40px;
        box-sizing: border-box;
        cursor: zoom-out;
    `;
    modal.classList.remove('hidden');

    // Estilos del contenedor interno
    const container = modal.querySelector('.relative');
    if (container) {
        container.style.cssText = `
            position: relative;
            max-width: 85vw;
            max-height: 85vh;
            cursor: default;
        `;
    }

    // Estilos de la imagen - nunca ocupa toda la pantalla
    modalImage.style.cssText = `
        max-width: 85vw;
        max-height: 80vh;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 25px 60px rgba(0,0,0,0.5);
        display: block;
    `;

    // Botón X visible y bien posicionado
    const closeBtn = modal.querySelector('button');
    if (closeBtn) {
        closeBtn.style.cssText = `
            position: absolute;
            top: -16px;
            right: -16px;
            background: white;
            color: #111;
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            z-index: 10000;
        `;
    }

    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    modal.classList.add('hidden');
    document.body.style.overflow = '';

    // Limpiar src para liberar memoria
    const modalImage = document.getElementById('modalImage');
    if (modalImage) modalImage.src = '';
}

// =====================================
// VIDEO MODAL
// =====================================

function openVideoModal(videoSrc, videoTitle, videoDescription = '') {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoDescription = document.getElementById('modalVideoDescription');

    if (!modal || !modalVideo) return;

    modalVideo.src = videoSrc;
    modalVideoTitle.textContent = videoTitle;
    modalVideoDescription.textContent = videoDescription;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    modalVideo.play();
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');

    if (!modal) return;

    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.src = '';
    }

    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Video click handler (para botones con data-video-src)
document.addEventListener('click', function (e) {
    const videoTrigger = e.target.closest('[data-video-src]');
    if (videoTrigger) {
        e.preventDefault();
        e.stopPropagation();
        const videoSrc = videoTrigger.getAttribute('data-video-src');
        const videoTitle = videoTrigger.getAttribute('data-video-title') || '';
        const videoDescription = videoTrigger.getAttribute('data-video-description') || '';
        if (videoSrc) {
            openVideoModal(videoSrc, videoTitle, videoDescription);
        }
    }
});

// =====================================
// FADE IN ANIMATION
// =====================================

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

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// =====================================
// CONTACT FORM
// =====================================

document.getElementById('contact-form').addEventListener('submit', function (e) {
    showToast('Enviando mensaje...', 'info');
});

// =====================================
// TOAST NOTIFICATION
// =====================================

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
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

// =====================================
// COPY EMAIL
// =====================================

function copyEmail() {
    const email = 'hectorvlaguna@gmail.com';
    navigator.clipboard.writeText(email).then(function () {
        showToast('Email copiado al portapapeles!');
    });
}

function copyToClipboard(text) {
    if (!navigator.clipboard) {
        showToast('Clipboard no soportado en este navegador', 'error');
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        showToast('Texto copiado al portapapeles', 'success');
    }).catch(() => {
        showToast('No se pudo copiar el texto', 'error');
    });
}

// =====================================
// CERTIFICATE STUBS
// =====================================

function handleCertificateClick() {}
function closeCertificateModal() {}
function toggleCertificatePreview() {}
function handleSmartCertificateClick() {}

// =====================================
// TYPEWRITER EFFECT
// =====================================

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

window.addEventListener('load', function () {
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

// =====================================
// DARK MODE
// =====================================

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        enableLightMode();
    } else {
        enableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (root.getAttribute('data-theme') === 'light') {
            enableDarkMode();
            localStorage.setItem('theme', 'dark');
            showToast('Modo oscuro activado', 'info');
        } else {
            enableLightMode();
            localStorage.setItem('theme', 'light');
            showToast('Modo claro activado', 'info');
        }
    });

    function enableDarkMode() {
        root.setAttribute('data-theme', 'dark');
        darkModeIcon.className = 'fas fa-sun';
        darkModeToggle.title = 'Cambiar a modo claro';
    }

    function enableLightMode() {
        root.setAttribute('data-theme', 'light');
        darkModeIcon.className = 'fas fa-moon';
        darkModeToggle.title = 'Cambiar a modo oscuro';
    }
}

// =====================================
// DOM CONTENT LOADED
// =====================================

document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();

    // Cerrar image modal al hacer click en el fondo
    document.getElementById('imageModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeImageModal();
        }
    });

    // Cerrar video modal al hacer click en el fondo
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeVideoModal();
            }
        });
    }
});

// Cerrar modales con ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const imageModal = document.getElementById('imageModal');
        const videoModal = document.getElementById('videoModal');

        if (imageModal && !imageModal.classList.contains('hidden')) {
            closeImageModal();
        }
        if (videoModal && !videoModal.classList.contains('hidden')) {
            closeVideoModal();
        }
    }
});

// =====================================
// CV DOWNLOAD
// =====================================

async function downloadCVDirectly() {
    const cvPath = 'assets/Hector_Laguna_CV.pdf';
    const fileName = 'Hector_Laguna_CV.pdf';

    try {
        showToast('Preparando descarga...', 'info');
        const response = await fetch(cvPath);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
        showToast('CV descargado exitosamente! 📄', 'success');
    } catch (error) {
        showToast('Error en descarga, abriendo CV...', 'error');
        window.open(cvPath, '_blank');
    }
}

function downloadCVFallback() {
    const cvPath = 'assets/Hector_Laguna_CV.pdf';
    showToast('Iniciando descarga...', 'info');
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'Hector_Laguna_CV.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => document.body.removeChild(link), 100);
    showToast('Descarga iniciada! 📥', 'success');
}

async function downloadCVHybrid() {
    if (window.fetch && window.URL && window.URL.createObjectURL) {
        await downloadCVDirectly();
    } else {
        downloadCVFallback();
    }
}

function downloadCVSmart() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isIOS) {
        showToast('En iOS, se abrirá el CV para guardar manualmente', 'info');
        window.open('assets/Hector_Laguna_CV.pdf', '_blank');
    } else if (isMobile) {
        downloadCVHybrid();
    } else {
        downloadCVDirectly();
    }
}

function showElectromicDemo() {
    openVideoModal(
        './assets/videos/electromic.mp4',
        'Demo - Sistema de Gestión Electromic',
        'Demostración del sistema de gestión desarrollado con tecnologías web modernas.'
    );
}

// Exponer funciones globalmente
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.showElectromicDemo = showElectromicDemo;
window.copyEmail = copyEmail;
window.copyToClipboard = copyToClipboard;
window.toggleMenu = toggleMenu;
window.downloadCVDirectly = downloadCVDirectly;
window.downloadCVFallback = downloadCVFallback;
window.downloadCVHybrid = downloadCVHybrid;
window.downloadCVSmart = downloadCVSmart;
window.handleCertificateClick = handleCertificateClick;
window.closeCertificateModal = closeCertificateModal;
window.toggleCertificatePreview = toggleCertificatePreview;
window.handleSmartCertificateClick = handleSmartCertificateClick;