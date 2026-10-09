document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. STATE MANAGEMENT (Cart & Wishlist)
  // ==========================================
  let cart = [
    {
      id: 'A113',
      name: 'Super Combed Cotton Rib Slim Fit Tank Top',
      price: 329.00,
      image: 'images/trend_tank_tops.jpg',
      color: 'Warm Sand',
      qty: 1
    },
    {
      id: 'FE41',
      name: 'Wirefree Non-Padded Cotton Stretch Full Coverage Bra',
      price: 749.00,
      image: 'images/trend_everyday_bra.jpg',
      color: 'Blush Pink',
      qty: 1
    }
  ];

  let wishlist = new Set(['FE41']);

  // Elements
  const cartBadge = document.querySelector('a[aria-label="Shopping Bag"] span:last-child');
  const wishlistBadge = document.querySelector('a[aria-label="Wishlist"] span:last-child');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartPanel = document.getElementById('cart-panel');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total');

  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileMenuPanel = document.getElementById('mobile-menu-panel');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu-btn');

  const mobileSearchOverlay = document.getElementById('mobile-search-overlay');
  const mobileSearchBtn = document.querySelector('button[aria-label="Search Mobile"]');
  const closeMobileSearchBtn = document.getElementById('close-mobile-search-btn');

  // Zoom Modal Elements
  const zoomModal = document.getElementById('zoom-modal');
  const zoomModalBackdrop = document.getElementById('zoom-modal-backdrop');
  const zoomModalCloseBtn = document.getElementById('close-zoom-modal-btn');
  const zoomImg = document.getElementById('zoom-modal-img');
  const zoomTitle = document.getElementById('zoom-modal-title');
  const zoomTag = document.getElementById('zoom-modal-tag');
  const zoomPrice = document.getElementById('zoom-modal-price');
  const zoomDesc = document.getElementById('zoom-modal-desc');
  const zoomAddBagBtn = document.getElementById('zoom-modal-add-bag');

  let currentZoomProduct = null;

  // ==========================================
  // 2. TOAST NOTIFICATION SYSTEM
  // ==========================================
  function showToast(message, iconName = 'check_circle') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-slide-in pointer-events-auto flex items-center gap-3 bg-primary text-on-primary px-5 py-3.5 rounded-full shadow-2xl font-label-md text-label-md border border-surface-canvas/20 backdrop-blur-md';
    toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px] text-badge-fresh">${iconName}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ==========================================
  // 3. SHOPPING BAG & DRAWER LOGIC
  // ==========================================
  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartBadge) {
      cartBadge.textContent = totalItems;
      cartBadge.classList.add('animate-badge-pop');
      setTimeout(() => cartBadge.classList.remove('animate-badge-pop'), 300);
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `₹${subtotal.toFixed(2)}`;

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 text-center text-on-surface-variant">
          <span class="material-symbols-outlined text-[48px] text-outline-variant mb-3">shopping_bag</span>
          <p class="font-headline-sm text-headline-sm font-bold text-primary">Your Shopping Bag is empty</p>
          <p class="font-body-sm text-body-sm text-secondary mt-1">Explore our latest drops and bestsellers to add comfort staples.</p>
        </div>
      `;
      return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
      <div class="flex items-center gap-4 py-4 border-b border-border-hairline group">
        <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover rounded-md bg-surface-subtle shrink-0" />
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <h4 class="font-label-lg text-label-lg font-bold text-primary line-clamp-1">${item.name}</h4>
            <button class="remove-cart-item text-secondary hover:text-sale-crimson transition-colors p-1" data-index="${index}" aria-label="Remove item">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <p class="font-label-xs text-label-xs text-secondary mt-0.5">${item.color} | #${item.id}</p>
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center border border-border-hairline rounded-full bg-surface-subtle px-2 py-0.5 gap-2">
              <button class="qty-btn text-primary hover:text-secondary font-bold text-sm px-1.5" data-action="dec" data-index="${index}">-</button>
              <span class="font-label-md text-label-md font-semibold text-primary px-1">${item.qty}</span>
              <button class="qty-btn text-primary hover:text-secondary font-bold text-sm px-1.5" data-action="inc" data-index="${index}">+</button>
            </div>
            <span class="font-title-md text-title-md font-bold text-primary">₹${(item.price * item.qty).toFixed(2)}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Quantity & remove handlers
    cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        const action = btn.getAttribute('data-action');
        if (action === 'inc') {
          cart[index].qty += 1;
        } else if (action === 'dec') {
          if (cart[index].qty > 1) {
            cart[index].qty -= 1;
          } else {
            cart.splice(index, 1);
          }
        }
        updateCartUI();
      });
    });

    cartItemsContainer.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        const removed = cart.splice(index, 1)[0];
        updateCartUI();
        showToast(`Removed "${removed.name}" from Bag`, 'delete');
      });
    });
  }

  function openCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('hidden');
    setTimeout(() => {
      cartBackdrop.classList.remove('opacity-0');
      cartPanel.classList.remove('translate-x-full');
    }, 10);
  }

  function closeCartDrawer() {
    if (!cartDrawer) return;
    cartBackdrop.classList.add('opacity-0');
    cartPanel.classList.add('translate-x-full');
    setTimeout(() => {
      cartDrawer.classList.add('hidden');
    }, 300);
  }

  document.querySelectorAll('a[aria-label="Shopping Bag"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

  // ==========================================
  // 4. ZOOM VIEW MODAL HANDLER
  // ==========================================
  function openZoomModal(productData) {
    if (!zoomModal) return;
    currentZoomProduct = productData;

    if (zoomImg) zoomImg.src = productData.image;
    if (zoomTitle) zoomTitle.textContent = productData.name;
    if (zoomTag) zoomTag.textContent = productData.tag || 'Well Icon Collection';
    if (zoomPrice) zoomPrice.textContent = `₹${productData.price.toFixed(2)}`;
    if (zoomDesc) zoomDesc.textContent = productData.desc || 'Super combed pure cotton fabric crafted for maximum breathability and flexible stretch contour.';

    zoomModal.classList.remove('hidden');
    showToast(`Zoom View: ${productData.name}`, 'zoom_in');
  }

  function closeZoomModal() {
    if (!zoomModal) return;
    zoomModal.classList.add('hidden');
    if (zoomImg) zoomImg.style.transform = 'scale(1)';
  }

  if (zoomModalCloseBtn) zoomModalCloseBtn.addEventListener('click', closeZoomModal);
  if (zoomModalBackdrop) zoomModalBackdrop.addEventListener('click', closeZoomModal);

  // Interactive Zoom Lens effect inside Modal
  if (zoomImg) {
    const container = zoomImg.parentElement;
    if (container) {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        zoomImg.style.transformOrigin = `${x}% ${y}%`;
        zoomImg.style.transform = 'scale(2)';
      });

      container.addEventListener('mouseleave', () => {
        zoomImg.style.transform = 'scale(1)';
        zoomImg.style.transformOrigin = 'center center';
      });
    }
  }

  if (zoomAddBagBtn) {
    zoomAddBagBtn.addEventListener('click', () => {
      if (!currentZoomProduct) return;
      const existing = cart.find(i => i.name === currentZoomProduct.name);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id: currentZoomProduct.id,
          name: currentZoomProduct.name,
          price: currentZoomProduct.price,
          image: currentZoomProduct.image,
          color: 'Selected Sando',
          qty: 1
        });
      }
      updateCartUI();
      closeZoomModal();
      showToast(`Added "${currentZoomProduct.name}" to Bag`, 'shopping_bag');
      openCartDrawer();
    });
  }

  // Bind Zoom triggers on product cards
  document.querySelectorAll('.group').forEach((card, idx) => {
    const zoomBtn = card.querySelector('.zoom-trigger-btn');
    const cardImg = card.querySelector('img');

    const getProductInfo = () => {
      const titleEl = card.querySelector('h3, h4');
      const priceEl = card.querySelector('span:contains("₹")') || Array.from(card.querySelectorAll('span')).find(s => s.textContent.includes('₹'));
      const descEl = card.querySelector('p');
      const tagEl = card.querySelector('span:contains("#")') || card.querySelector('.bg-primary, .bg-badge-fresh, .bg-secondary');

      return {
        id: 'P' + (100 + idx),
        name: titleEl ? titleEl.textContent.trim() : 'Well Icon Comfort Wear',
        price: priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 699.00 : 699.00,
        image: cardImg ? cardImg.getAttribute('src') : 'images/sando_achiever.jpg',
        desc: descEl ? descEl.textContent.trim() : 'Premium cotton athletic sando engineered for breathability and freedom of movement.',
        tag: tagEl ? tagEl.textContent.trim() : 'Premium Sando'
      };
    };

    if (zoomBtn) {
      zoomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openZoomModal(getProductInfo());
      });
    }

    if (cardImg) {
      cardImg.style.cursor = 'pointer';
      cardImg.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          openZoomModal(getProductInfo());
        }
      });
    }
  });

  // Add to Cart Button Click Handlers
  document.querySelectorAll('.group, section').forEach(card => {
    const addBtn = Array.from(card.querySelectorAll('button')).find(b => b.textContent.includes('ADD TO BAG') || b.textContent.includes('Add'));
    
    if (addBtn && !addBtn.classList.contains('zoom-modal-bound')) {
      addBtn.classList.add('zoom-modal-bound');
      addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const titleEl = card.querySelector('h3, h4');
        const priceEl = card.querySelector('span:contains("₹")') || Array.from(card.querySelectorAll('span')).find(s => s.textContent.includes('₹'));
        const imgEl = card.querySelector('img');
        const tagEl = card.querySelector('span:contains("#")') || Array.from(card.querySelectorAll('span')).find(s => s.textContent.includes('#'));

        const title = titleEl ? titleEl.textContent.trim() : 'Well Icon Sando Apparel';
        const price = priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 599.00 : 599.00;
        const image = imgEl ? imgEl.getAttribute('src') : 'images/sando_achiever.jpg';
        const itemId = tagEl ? tagEl.textContent.replace('#', '').trim() : 'S' + Math.floor(100 + Math.random() * 900);

        const existingItem = cart.find(i => i.name === title);
        if (existingItem) {
          existingItem.qty += 1;
        } else {
          cart.push({
            id: itemId,
            name: title,
            price: price,
            image: image,
            color: 'Athletic Fit',
            qty: 1
          });
        }

        updateCartUI();
        showToast(`Added "${title}" to Shopping Bag`, 'shopping_bag');
        openCartDrawer();
      });
    }
  });

  // ==========================================
  // 5. WISHLIST TOGGLE HANDLER
  // ==========================================
  function updateWishlistUI() {
    if (wishlistBadge) {
      wishlistBadge.textContent = wishlist.size;
      wishlistBadge.classList.add('animate-badge-pop');
      setTimeout(() => wishlistBadge.classList.remove('animate-badge-pop'), 300);
    }
  }

  document.querySelectorAll('button[aria-label="Favorite item"], button[aria-label="Wishlist item"]').forEach((btn, index) => {
    const card = btn.closest('.group');
    const titleEl = card ? card.querySelector('h3, h4') : null;
    const title = titleEl ? titleEl.textContent.trim() : 'Item';
    const itemId = 'WISHLIST_' + index;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.classList.add('animate-heart-pulse');
        setTimeout(() => icon.classList.remove('animate-heart-pulse'), 350);

        if (wishlist.has(itemId)) {
          wishlist.delete(itemId);
          icon.classList.remove('text-sale-crimson');
          showToast(`Removed "${title}" from Wishlist`, 'favorite_border');
        } else {
          wishlist.add(itemId);
          icon.classList.add('text-sale-crimson');
          showToast(`Added "${title}" to Wishlist`, 'favorite');
        }
        updateWishlistUI();
      }
    });
  });

  // ==========================================
  // 6. FILTER TABS & MOBILE DRAWER LOGIC
  // ==========================================
  document.querySelectorAll('[data-filter-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.parentElement;
      parent.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
        btn.classList.add('text-on-surface-variant');
      });
      tab.classList.add('bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
      tab.classList.remove('text-on-surface-variant');
      showToast(`Filtered for ${tab.textContent.trim()}`, 'tune');
    });
  });

  function openMobileMenu() {
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.classList.remove('hidden');
    setTimeout(() => {
      mobileMenuBackdrop.classList.remove('opacity-0');
      mobileMenuPanel.classList.remove('-translate-x-full');
    }, 10);
  }

  function closeMobileMenu() {
    if (!mobileMenuDrawer) return;
    mobileMenuBackdrop.classList.add('opacity-0');
    mobileMenuPanel.classList.add('-translate-x-full');
    setTimeout(() => {
      mobileMenuDrawer.classList.add('hidden');
    }, 300);
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

  if (mobileSearchBtn && mobileSearchOverlay) {
    mobileSearchBtn.addEventListener('click', () => {
      mobileSearchOverlay.classList.remove('hidden');
      const input = mobileSearchOverlay.querySelector('input');
      if (input) input.focus();
    });
  }

  if (closeMobileSearchBtn && mobileSearchOverlay) {
    closeMobileSearchBtn.addEventListener('click', () => {
      mobileSearchOverlay.classList.add('hidden');
    });
  }

  // ==========================================
  // SPLASH SCREEN CONTROLLER
  // ==========================================
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    document.body.style.overflow = 'hidden';

    let splashDismissed = false;
    const hideSplash = () => {
      if (splashDismissed) return;
      splashDismissed = true;
      splashScreen.style.opacity = '0';
      splashScreen.style.pointerEvents = 'none';
      setTimeout(() => {
        splashScreen.style.display = 'none';
        document.body.style.overflow = '';
      }, 700);
    };

    // Guarantee smooth logo animation time on visit/reload
    setTimeout(hideSplash, 1400);
  }

  updateCartUI();
  updateWishlistUI();
});

