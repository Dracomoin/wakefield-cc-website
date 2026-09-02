/**
 * Wakefield CC LLP — Static Website Interactions
 * Lightweight, zero-dependency JavaScript for responsive navigation,
 * accessible FAQ accordions, capability statement modal, and CRM-ready form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu & Navigation Dropdowns
  const menuBtn = document.querySelector('.menu');
  const navlinks = document.querySelector('.navlinks');
  const dropdownToggle = document.querySelector('.has-dropdown > .nav-item-btn, .has-dropdown > a');
  const dropdownParent = document.querySelector('.has-dropdown');

  if (menuBtn && navlinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navlinks.classList.toggle('mobile');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuBtn.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // Handle dropdown toggle on mobile or touch devices
  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const isOpen = dropdownParent.classList.toggle('open');
        dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
  }

  // 2. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close siblings for clean accordion behavior
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('active', !isActive);
        questionBtn.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
      });
    }
  });

  // 3. Capability Statement Modal Logic
  const modalBackdrop = document.getElementById('capability-modal');
  const openModalBtns = document.querySelectorAll('[data-action="download-capability"]');
  const closeModalBtns = document.querySelectorAll('.modal-close, [data-action="close-modal"]');

  if (modalBackdrop) {
    openModalBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalBackdrop.classList.add('open');
        modalBackdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    closeModalBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        modalBackdrop.classList.remove('open');
        modalBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
        modalBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        modalBackdrop.classList.remove('open');
        modalBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  // 4. Contact Form Submission & CRM Readiness
  const projectForm = document.getElementById('project-enquiry-form');
  const formStatus = document.getElementById('form-status');

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(projectForm);
      const data = Object.fromEntries(formData.entries());
      
      // Structure payload for eventual HubSpot, Zoho CRM, or Salesforce integration
      const crmPayload = {
        fullName: data.name || '',
        company: data.company || '',
        designation: data.designation || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        industry: data.industry || '',
        service: data.service || '',
        requirement: data.requirement || '',
        expectedStart: data.start || '',
        timestamp: new Date().toISOString(),
        source: 'Wakefield CC Static Website — Project Enquiry Form'
      };

      console.log('Structured CRM Payload Ready for Integration:', crmPayload);

      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Thank you, ${crmPayload.fullName || 'for reaching out'}.</strong><br>
          Your project enquiry has been logged successfully. A Wakefield project controls specialist will review your requirement and follow up shortly.
        `;
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      projectForm.reset();
    });
  }

  // 5. Intersection Observer for Scroll Reveals
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('show'));
  }

  // 6. Dynamic Year
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
