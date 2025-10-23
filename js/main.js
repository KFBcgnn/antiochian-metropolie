// ================================================
// Main JavaScript - Antiochenisch-Orthodoxe Metropolie
// ================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== Mobile Navigation Toggle =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.textContent = isOpen ? '✕' : '☰';
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.textContent = '☰';
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      }
    });
  }
  
  // ===== Sticky Header Effect =====
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // ===== Scroll Animations (Intersection Observer) =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3');
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
  });
  
  // ===== Lazy Loading Images =====
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => img.classList.add('loaded'));
  }
  
  // ===== Newsletter Form Handling =====
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      // Here you would typically send the email to your backend
      alert('Vielen Dank für Ihre Anmeldung! Sie erhalten in Kürze eine Bestätigungsmail.');
      this.reset();
    });
  });
  
  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ===== Table Responsive Wrapper =====
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    if (!table.parentElement.classList.contains('schedule-table')) {
      const wrapper = document.createElement('div');
      wrapper.style.overflowX = 'auto';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
  
  // ===== Add ARIA attributes dynamically =====
  const cards = document.querySelectorAll('.card, .event-card');
  cards.forEach(card => {
    if (!card.hasAttribute('role')) {
      card.setAttribute('role', 'article');
    }
  });
  
  // ===== Focus Management =====
  // Ensure skip link works properly
  const skipLink = document.querySelector('.skip-to-main');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
        mainContent.addEventListener('blur', function() {
          mainContent.removeAttribute('tabindex');
        }, { once: true });
      }
    });
  }
  
  // ===== Print Friendly =====
  window.addEventListener('beforeprint', function() {
    // Expand all collapsed sections before printing
    const details = document.querySelectorAll('details');
    details.forEach(detail => detail.setAttribute('open', ''));
  });
  
  // ===== Performance: Debounce Resize Events =====
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  const handleResize = debounce(function() {
    // Handle responsive adjustments if needed
    if (window.innerWidth > 768 && navMenu) {
      navMenu.classList.remove('active');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      }
    }
  }, 250);
  
  window.addEventListener('resize', handleResize);
  
  console.log('✝️ Antiochenisch-Orthodoxe Metropolie Website initialized');
});

// ===== Service Worker Registration (Progressive Web App) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Uncomment when you create a service worker
    // navigator.serviceWorker.register('/sw.js').then(
    //   function(registration) {
    //     console.log('ServiceWorker registration successful');
    //   },
    //   function(err) {
    //     console.log('ServiceWorker registration failed: ', err);
    //   }
    // );
  });
}

