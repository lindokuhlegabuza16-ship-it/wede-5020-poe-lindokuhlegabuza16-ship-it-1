document.addEventListener('DOMContentLoaded', () => {
highlightActiveNav();
enhanceSearch();
enhanceInquiryForm();
});
// 1. Highlight the current page in the nav
function highlightActiveNav() {
const links = document.querySelectorAll('nav a');
const current = window.location.pathname.split('/').pop() ||
'index.html';
links.forEach(link => {
if (link.getAttribute('href') === current) {
link.classList.add('active');
}
});
}
// 2. Make the search bar actually do something
function enhanceSearch() {
const searchInput = document.querySelector('.srch');
const searchBtn = document.querySelector('.btn');
if (!searchInput || !searchBtn) return;
const runSearch = () => {
const term = searchInput.value.trim();
if (!term) {
searchInput.focus();
return;
}
window.location.href = `product.html?
search=${encodeURIComponent(term)}`;
};
searchBtn.addEventListener('click', e => {
e.preventDefault();
runSearch();
});
searchInput.addEventListener('keydown', e => {
if (e.key === 'Enter') {
e.preventDefault();
runSearch();
}
});
}
// 3. Inquiry form: live validation, character counter, no-backend success state
function enhanceInquiryForm() {
const form = document.querySelector('form');
if (!form) return;
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
// Character counter under the message box
const counter = document.createElement('p');
counter.className = 'char-counter';
counter.textContent = '0 characters';
messageInput.insertAdjacentElement('afterend', counter);
messageInput.addEventListener('input', () => {
counter.textContent = `${messageInput.value.length} characters`;
});
function showError(input, message) {
clearError(input);
const error = document.createElement('span');
error.className = 'field-error';
error.textContent = message;
input.insertAdjacentElement('afterend', error);
input.classList.add('invalid');
}
function clearError(input) {
input.classList.remove('invalid');
const next = input.nextElementSibling;
if (next && next.classList.contains('field-error')) next.remove();
}
function validateField(input) {
if (input === nameInput && nameInput.value.trim().length < 2) {
showError(nameInput, 'Please enter your full name.');
return false;
}
if (input === emailInput) {
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(emailInput.value.trim())) {
showError(emailInput, 'Please enter a valid email address.');
return false;
}
}
if (input === messageInput && messageInput.value.trim().length < 10) {
showError(messageInput, 'Message should be at least 10 characters.');
return false;
}
clearError(input);
return true;
}
[nameInput, emailInput, messageInput].forEach(input => {
input.addEventListener('blur', () => validateField(input));
});
form.addEventListener('submit', e => {
e.preventDefault();
const validName = validateField(nameInput);
const validEmail = validateField(emailInput);
const validMessage = validateField(messageInput);
	if (!validName || !validEmail || !validMessage) return;
	// No backend yet (action_page.php is a placeholder) — show a success state instead
const success = document.createElement('p');
success.className = 'form-success';
success.textContent = `Thanks, ${nameInput.value.trim()}! Your inquiry
has been received — we'll get back to you at ${emailInput.value.trim()}.`;
form.replaceWith(success);
});
}

searchInput.addEventListener('input', function() {
      const productCards = document.querySelectorAll('.product-card');
      productCards.forEach(card => {
        card.style.border = '1px solid #ece7e2';
      });
    });

     function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      if (query === '') {
        showToast('🔍 type something to search');
        return;
      }
      // find products that match the query (by data-product or text)
      const productCards = document.querySelectorAll('.product-card');
      let found = false;
      productCards.forEach(card => {
        const productName = card.getAttribute('data-product') || '';
        const nameMatch = productName.toLowerCase().includes(query);
        // also check inside card text
        const cardText = card.innerText.toLowerCase();
        const textMatch = cardText.includes(query);
        if (nameMatch || textMatch) {
          card.style.border = '3px solid #b45f3b';
                    card.style.transition = '0.2s';
          found = true;
        } else {
          card.style.border = '1px solid #ece7e2';
        }
      });
      if (found) {
        showToast(`🔎 found matching items for “${query}”`);
      } else {
        showToast(`😕 no products match “${query}”`);
      }
    }

    function initActiveNavLink() {
  const links = document.querySelectorAll('header nav a[href]');
  if (!links.length) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(function (link) {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}
function initSearchRedirect() {
  const searchWrap  = document.querySelector('.search');
  if (!searchWrap) return;

  const input = searchWrap.querySelector('.srch');
  const btn   = searchWrap.querySelector('.btn');
  if (!input || !btn) return;

  function goToResults() {
    const query = input.value.trim();
    if (!query) {
      searchWrap.classList.add('search--shake');
      setTimeout(function () { searchWrap.classList.remove('search--shake'); }, 450);
      return;
    }
    window.location.href = 'search-results.html?q=' + encodeURIComponent(query);
  }

  btn.addEventListener('click', goToResults);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') goToResults();
  });
}
function initScrollFadeIn() {
  const items = document.querySelectorAll('.fade-in');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('fade-in--visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) { observer.observe(el); });
}