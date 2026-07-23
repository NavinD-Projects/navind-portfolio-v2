// ===== DOM Elements =====
const loadingScreen = document.querySelector('.loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const scrollProgress = document.querySelector('.scroll-progress');
const backToTop = document.getElementById('backToTop');

// ===== Loading Screen =====
window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1000);
});

// ===== Scroll Progress Bar =====
window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile Navigation =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== Theme Toggle =====
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Update theme toggle icon and tooltip
const updateThemeIcon = (theme) => {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  themeToggle.setAttribute('data-tooltip', theme === 'dark' ? 'Light Mode' : 'Dark Mode');
};

updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

// ===== Typing Animation =====
const typingText = document.getElementById('typing-text');
const roles = ['Full Stack Developer', 'React Developer', 'NestJS Developer', 'TypeScript Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeWriter = () => {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before starting new word
  }

  setTimeout(typeWriter, typeSpeed);
};

// Start typing animation
setTimeout(typeWriter, 2000);

// ===== Animated Counters =====
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number span');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100; // Animation duration control
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
};

// ===== Intersection Observer for Counters =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('stats-grid')) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

const statisticsSection = document.querySelector('.stats-grid');
if (statisticsSection) {
  observer.observe(statisticsSection);
}

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for navbar height
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Active Navigation Link =====
const updateActiveNavLink = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveNavLink);

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form elements
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;
    
    // Validate form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
      error.textContent = '';
    });
    
    // Validate name
    if (!name) {
      document.getElementById('nameError').textContent = 'Name is required';
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Please enter a valid email';
      isValid = false;
    }
    
    // Validate message
    if (!message) {
      document.getElementById('messageError').textContent = 'Message is required';
      isValid = false;
    }
    
    if (isValid) {
      try {
        // Submit form (you can replace this with actual form submission)
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        // Show success message
        alert('Message sent successfully! I\'ll get back to you soon.');
        contactForm.reset();
      } catch (error) {
        alert('Failed to send message. Please try again.');
      }
    }
    
    // Reset button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  });
}

// ===== Email Copy Function =====
window.copyEmail = () => {
  const email = 'navindcse@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.textContent = 'Email copied to clipboard!';
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--success-color);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  });
};

// ===== Back to Top Button =====
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== Project Filters =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(button => button.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      // Filter project cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.6s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== Add CSS animations =====
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNavLink();
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 50,
    });
  }
});

// ===== Certificate Modal Logic =====
const certModal = document.getElementById('certModal');
const certIframe = document.getElementById('certIframe');
const closeModal = document.querySelector('.close-modal');

// Global function to open modal (called from onclick in HTML)
window.openCertModal = (pdfSrc) => {
  if(certModal && certIframe) {
    certModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Fetch the PDF as a Blob to bypass Chrome's local PDF viewer bug
    fetch(pdfSrc)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.blob();
      })
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        certIframe.src = blobUrl;
        certModal.dataset.currentBlob = blobUrl; // Store for cleanup
      })
      .catch(err => {
        console.error('Failed to load PDF via blob:', err);
        certIframe.src = pdfSrc; // Fallback
      });
  }
};

// Close modal when clicking X
if (closeModal) {
  closeModal.addEventListener('click', () => {
    certModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    certIframe.src = ''; // Clear iframe
    if (certModal.dataset.currentBlob) {
      window.URL.revokeObjectURL(certModal.dataset.currentBlob);
      certModal.dataset.currentBlob = '';
    }
  });
}

// Close modal when clicking outside the image
if (certModal) {
  window.addEventListener('click', (e) => {
    if (e.target === certModal) {
      certModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// ===== Mouse Parallax for Background Shapes =====
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape, .bg-shape');
  shapes.forEach((shape, index) => {
    const speed = (index % 4 + 1) * 20;
    const x = (window.innerWidth / 2 - e.pageX) / speed;
    const y = (window.innerHeight / 2 - e.pageY) / speed;
    
    // Using the independent translate property so it doesn't override transform animations
    shape.style.translate = `${x}px ${y}px`;
  });
});

// ===== Face Card 3D Tilt & Float =====
const faceCard = document.querySelector('.face-card');
if (faceCard) {
  // Allow initial AOS animation to complete
  setTimeout(() => {
    faceCard.classList.add('idle');
  }, 1000);

  faceCard.addEventListener('mousemove', (e) => {
    faceCard.classList.remove('idle');
    const rect = faceCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-10 to 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    faceCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Dynamic shadow
    const shadowX = ((centerX - x) / centerX) * 20;
    const shadowY = ((centerY - y) / centerY) * 20;
    faceCard.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(236, 72, 153, 0.4), 0 0 30px rgba(168, 85, 247, 0.5)`;
  });

  faceCard.addEventListener('mouseleave', () => {
    faceCard.style.transform = '';
    faceCard.style.boxShadow = '';
    setTimeout(() => {
      faceCard.classList.add('idle');
    }, 150);
  });
}