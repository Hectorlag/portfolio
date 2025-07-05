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
});

// Función específica para tu video electromic
function showElectromicDemo() {
    openVideoModal(
        './assets/videos/electromic.mp4',
        'Demo - Sistema de Gestión Electromic',
        'Demostración del sistema de gestión desarrollado con tecnologías web modernas.'
    );
}

// Make functions global
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.showElectromicDemo = showElectromicDemo;
window.copyEmail = copyEmail;
window.toggleMenu = toggleMenu;