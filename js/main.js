
// Navigation scroll behavior
document.addEventListener('DOMContentLoaded', function() {
  // Update current year in footer
  const yearElements = document.querySelectorAll('#currentYear');
  if (yearElements.length > 0) {
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  }

  // Navbar scroll behavior
  const navbar = document.getElementById('mainNav');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.classList.remove('scrolled');
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = 'none';
      }
    });
    
    // Trigger scroll event on page load to set correct state
    window.dispatchEvent(new Event('scroll'));
  }

  // Handle URL parameters for quote page
  if (window.location.pathname.includes('quote.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    
    if (service) {
      const projectTypeSelect = document.getElementById('projectType');
      
      if (projectTypeSelect) {
        // Try to find the option that matches the service
        for (let i = 0; i < projectTypeSelect.options.length; i++) {
          if (projectTypeSelect.options[i].value === service) {
            projectTypeSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

  // Form submissions
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Here you would typically send the form data to your server
      // For demo purposes, we'll just show the success modal
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();
      
      // Reset form
      quoteForm.reset();
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Here you would typically send the form data to your server
      // For demo purposes, we'll just show the success modal
      const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Fix for mobile menu overlap
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      if (navbarCollapse.classList.contains('show')) {
        document.body.style.overflow = 'auto';
      } else {
        setTimeout(() => {
          document.body.style.overflow = 'hidden';
        }, 150);
      }
    });
    
    // Reset overflow when nav is closed
    navbarCollapse.addEventListener('hidden.bs.collapse', function () {
      document.body.style.overflow = 'auto';
    });
    
    // Fix for mobile menu text overlap
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
      link.style.padding = '10px 15px';
      link.style.display = 'block';
      link.style.clear = 'both';
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const yOffset = -80; // For navbar height
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
        
        // If mobile menu is open, close it after clicking
        if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });
});