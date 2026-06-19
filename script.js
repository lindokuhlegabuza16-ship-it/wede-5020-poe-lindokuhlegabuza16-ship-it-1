
 // --- 1. BUY NOW: interactive feedback ---
    buyButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();  // prevent navigation
        const product = this.getAttribute('data-product') || 'item';
        showToast(`🛒 ${product} added to cart`);
        // (optional) visual feedback
        this.style.transform = 'scale(0.92)';
        setTimeout(() => { this.style.transform = ''; }, 200);
      });
    });

     // --- 3. "See More" button: interactive message + style ---
    if (seeMoreBtn) {
      seeMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showToast('📦 exploring full collection ...');
        // subtle animation
        this.style.transform = 'scale(0.94)';
        setTimeout(() => { this.style.transform = ''; }, 200);
        // you could redirect after a small delay, but we keep it demo friendly.
        // window.location.href = 'product.html';   // uncomment if you want real redirect
      });
    }

     (function() {
    'use strict';

    // --- DOM refs ---
    const toast = document.getElementById('toast');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const buyButtons = document.querySelectorAll('.buy-button');
    const seeMoreBtn = document.getElementById('seeMoreBtn');

    // --- Helper: show toast ---
    function showToast(message = '✨ added to cart') {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toast._hideTimer);
      toast._hideTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 2200);
    }
})();

 // --- 2. SEARCH: simple search simulation ---
    function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      if (query === '') {
        showToast('type something to search');
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
        searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
    