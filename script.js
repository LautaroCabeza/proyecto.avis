document.addEventListener('DOMContentLoaded', function() {
    // Navbar functionality
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
  
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarLinks.classList.toggle('active');
    });
  
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navbarLinks.classList.remove('active');
        });
    });
  
    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    });
  
    // Initialize navbar state (transparent or scrolled)
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('transparent');
    }
  
    // Carousel functionality
    const carousel = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    const totalItems = carouselItems ? carouselItems.length : 0;
  
    // Create indicators
    if (indicators && carouselItems) {
      for (let i = 0; i < totalItems; i++) {
          const indicator = document.createElement('div');
          indicator.classList.add('indicator');
          if (i === 0) indicator.classList.add('active');
          indicator.dataset.index = i;
          indicators.appendChild(indicator);
  
          // Add click event to indicators
          indicator.addEventListener('click', function() {
              goToSlide(parseInt(this.dataset.index));
          });
      }
    }
  
    // Update indicators
    function updateIndicators() {
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
  
    // Go to specific slide
    function goToSlide(index) {
        if (!carousel) return;
        currentIndex = index;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();
    }
  
    // Next slide
    function nextSlide() {
        if (!carouselItems) return;
        currentIndex = (currentIndex + 1) % totalItems;
        goToSlide(currentIndex);
    }
  
    // Previous slide
    function prevSlide() {
        if (!carouselItems) return;
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        goToSlide(currentIndex);
    }
  
    // Add event listeners to buttons
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
    // Auto-advance carousel every 5 seconds
    let carouselInterval;
    if (carousel) {
      carouselInterval = setInterval(nextSlide, 5000);
  
      // Pause auto-advance on hover
      carousel.addEventListener('mouseenter', () => {
          clearInterval(carouselInterval);
      });
  
      carousel.addEventListener('mouseleave', () => {
          carouselInterval = setInterval(nextSlide, 5000);
      });
    }
  
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
  
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
          header.addEventListener('click', () => {
              // Close all other items
              accordionItems.forEach(otherItem => {
                  if (otherItem !== item) {
                      otherItem.classList.remove('active');
                  }
              });
              
              // Toggle current item
              item.classList.toggle('active');
          });
        }
    });
  
    // Form validation
    const contactForm = document.getElementById('form-contacto');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formElements = this.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                if (element.required && element.value.trim() === '') {
                    element.classList.add('error');
                    isValid = false;
                } else if (element.type === 'email' && element.value.trim() !== '') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(element.value)) {
                        element.classList.add('error');
                        isValid = false;
                    } else {
                        element.classList.remove('error');
                    }
                } else {
                    element.classList.remove('error');
                }
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                setTimeout(() => {
                    // Reset form
                    this.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.';
                    successMessage.style.color = '#2ecc71';
                    successMessage.style.padding = '1rem';
                    successMessage.style.marginBottom = '1rem';
                    successMessage.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
                    successMessage.style.borderRadius = '5px';
                    
                    this.prepend(successMessage);
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.required && this.value.trim() === '') {
                    this.classList.add('error');
                } else if (this.type === 'email' && this.value.trim() !== '') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.value)) {
                        this.classList.add('error');
                    } else {
                        this.classList.remove('error');
                    }
                } else {
                    this.classList.remove('error');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    if (this.required && this.value.trim() !== '') {
                        if (this.type !== 'email' || (this.type === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value))) {
                            this.classList.remove('error');
                        }
                    }
                }
            });
        });
    }
  
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function() {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
    }
  
    // Counter animation
    const counterSection = document.querySelector('.counter-section');
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 20);
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        hasAnimated = true;
    }
    
    // Play video
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real implementation, this would open a modal with the video
            alert('En una implementación real, aquí se abriría un modal con el video.');
        });
    });
  
    // Función mejorada para verificar si un elemento está en el viewport
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 0.8 &&
            rect.bottom >= 0
        );
    }
    
 // Función mejorada para manejar las animaciones al hacer scroll
 function handleScrollAnimation() {
    // Animate counters when in viewport
    if (!hasAnimated && counterSection && isElementInViewport(counterSection)) {
      animateCounters();
    }

    // Animar elementos de la sección de Beneficios
    const beneficiosSection = document.querySelector('.beneficios');
    const beneficiosItems = document.querySelectorAll('.beneficio-item');
    const beneficiosImage = document.querySelector('.beneficios-image');

    if (beneficiosSection && isElementInViewport(beneficiosSection)) {
      beneficiosItems.forEach(item => {
        item.classList.add('animate');
      });
      if (beneficiosImage) {
        beneficiosImage.classList.add('animate');
      }
    }

    // Animate other elements when scrolled into view
    document.querySelectorAll('.card, .beneficio-item, .timeline-item, .video-item').forEach(item => {
      if (isElementInViewport(item)) {
        item.classList.add('animate');
      }
    });
  }

  // Agregamos el listener para el evento scroll
  window.addEventListener('scroll', handleScrollAnimation);

  // No ejecutamos handleScrollAnimation inmediatamente al cargar la página
  // Usamos un pequeño retraso para asegurar que solo los elementos que deben ser visibles inicialmente se animen
  setTimeout(() => {
    // Verificamos solo los elementos del hero si es necesario
    const heroSection = document.querySelector('.hero');
    if (heroSection && isElementInViewport(heroSection)) {
      // Aquí podrías animar elementos específicos del hero si lo necesitas
    }
    // No ejecutamos el handleScrollAnimation completo aquí
  }, 100);
  
    // Interactive instrument panel
    const altimeterNeedle = document.querySelector('.altimeter-needle');
    const airspeedNeedle = document.querySelector('.airspeed-needle');
    
    // Additional interactivity for instruments
    document.querySelectorAll('.instrument').forEach(instrument => {
        instrument.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        instrument.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Airplane cursor effect
    const body = document.querySelector('body');
    const planeElement = document.createElement('div');
    planeElement.className = 'cursor-plane';
    planeElement.innerHTML = '✈️';
    planeElement.style.position = 'fixed';
    planeElement.style.pointerEvents = 'none';
    planeElement.style.zIndex = '9999';
    planeElement.style.fontSize = '24px';
    planeElement.style.transform = 'rotate(45deg)';
    planeElement.style.transition = 'transform 0.2s ease';
    planeElement.style.opacity = '0';
    body.appendChild(planeElement);
    
    let isPlaneVisible = false;
    let lastX = 0;
    let lastY = 0;
    
    // Activate plane cursor on hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
      heroSection.addEventListener('mouseenter', function() {
          isPlaneVisible = true;
          planeElement.style.opacity = '1';
      });
      
      heroSection.addEventListener('mouseleave', function() {
          isPlaneVisible = false;
          planeElement.style.opacity = '0';
      });
    }
    
    document.addEventListener('mousemove', function(e) {
        if (isPlaneVisible) {
            // Calculate angle based on movement direction
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            
            // Position the plane with a slight offset
            planeElement.style.left = `${e.clientX + 10}px`;
            planeElement.style.top = `${e.clientY - 10}px`;
            
            // Rotate the plane in the direction of movement if there's enough movement
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                planeElement.style.transform = `rotate(${angle}deg)`;
            }
            
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
  });