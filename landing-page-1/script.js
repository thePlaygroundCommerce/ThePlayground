const forms = document.querySelectorAll('form');
const faqButtons = document.querySelectorAll('.faq-toggle');
const mobileSticky = document.querySelector('.mobile-sticky-cta');
const modal = document.querySelector('.modal-backdrop');
const floatingContact = document.querySelector('.floating-contact');

function setMessage(form, message, type = 'success') {
  const messageBox = form.querySelector('.form-message');
  if (!messageBox) return;
  messageBox.textContent = message;
  messageBox.style.color = type === 'error' ? '#b91c1c' : '#16A34A';
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let valid = true;

  requiredFields.forEach((field) => {
    if (field.type === 'checkbox') {
      if (!field.checked) valid = false;
      return;
    }

    const value = field.value.trim();
    if (!value) {
      valid = false;
      return;
    }

    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      valid = false;
    }

    if (field.type === 'tel' && !/^\+?[0-9\s()-]{7,15}$/.test(value)) {
      valid = false;
    }
  });

  return valid;
}

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm(form)) {
      setMessage(form, 'Please complete every required field before submitting.', 'error');
      return;
    }

    setMessage(form, 'Thanks! We will reach out with tailored adventure options shortly.');
    form.reset();
  });
});

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const expanded = button.getAttribute('aria-expanded') === 'true';

    faqButtons.forEach((item) => {
      item.setAttribute('aria-expanded', 'false');
      const sibling = item.nextElementSibling;
      sibling?.classList.remove('is-open');
    });

    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
      answer?.classList.add('is-open');
    }
  });
});

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY || document.documentElement.scrollTop;
  if (mobileSticky) {
    mobileSticky.classList.toggle('is-visible', current > 400 && current > lastScrollTop);
  }
  lastScrollTop = current <= 0 ? 0 : current;
});

floatingContact?.addEventListener('click', () => {
  document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.addEventListener('mouseleave', (event) => {
  if (event.clientY <= 0 && !sessionStorage.getItem('adventure-modal-shown')) {
    modal?.classList.add('is-open');
    modal?.setAttribute('aria-hidden', 'false');
    sessionStorage.setItem('adventure-modal-shown', 'true');
  }
});

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }
});
