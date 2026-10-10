document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. STORAGE CONSTANTS & MASTER CATALOGUE
  // ==========================================
  const WISHLIST_STORAGE_KEY = 'wellIconWishlist';
  const WISHLIST_LEGACY_KEY = 'wellicon_wishlist';
  const CATALOG_CACHE_KEY = 'wellIconProductCatalog';
  const CART_STORAGE_KEY = 'wellIconCart';
  const CART_LEGACY_KEY = 'wellicon_cart';

  if (window.WELL_ICON_CONFIG?.catalogueMode === 'sample' && !document.querySelector('.sample-catalogue-banner')) {
    const banner = document.createElement('div');
    banner.className = 'sample-catalogue-banner';
    banner.setAttribute('role', 'note');
    banner.textContent = 'Catalogue preview: sample products, prices, and sizes are shown for development.';
    const header = document.querySelector('header');
    if (header?.parentElement) header.parentElement.insertBefore(banner, header);
    else document.body.prepend(banner);
  }

  // Master Catalogue Registry
  const WELL_ICON_PRODUCTS = [
    {
      id: 'SANDO-01',
      name: 'Achiever Athletic Gym Sando (Duo Pack)',
      price: 799.00,
      originalPrice: 1199.00,
      image: 'images/sando_achiever.jpg',
      tag: '#SANDO-01',
      desc: 'High-performance grey bull & teal Achiever muscle sando set. Stretch contour fit.',
      link: 'collection.html?category=men-vests'
    },
    {
      id: 'SANDO-02',
      name: 'Shape It Microfiber Sleeveless Gym Sando',
      price: 849.00,
      originalPrice: 1299.00,
      image: 'images/sando_shape_it.png',
      tag: '#SANDO-02',
      desc: 'Moisture-wicking black & teal workout sando pair with geometric athletic typography.',
      link: 'collection.html?category=men-vests'
    },
    {
      id: 'SANDO-03',
      name: 'Stronger Every Day Contrast Panel Sando',
      price: 649.00,
      originalPrice: 999.00,
      image: 'images/sando_stronger.png',
      tag: '#SANDO-03',
      desc: 'Vibrant yellow & black contrast shoulder panel sando with barbell chest graphic print.',
      link: 'collection.html?category=men-vests'
    },
    {
      id: 'SANDO-04',
      name: 'Strong Pure Cotton Ribbed Gym Sando',
      price: 599.00,
      originalPrice: 899.00,
      image: 'images/sando_strong_yellow.png',
      tag: '#SANDO-04',
      desc: 'Vibrant sunny yellow ultra-soft combed cotton rib sando with vertical graphic detail.',
      link: 'collection.html?category=men-vests'
    },
    {
      id: 'M101',
      name: 'Relaxed Fit Outdoor Active Shorts',
      price: 899.00,
      originalPrice: 1199.00,
      image: 'images/summer_outdoor_shorts.jpg',
      tag: '#M101',
      desc: 'Pure cotton, drawstring waistband outdoor active shorts.',
      link: 'men.html'
    },
    {
      id: 'M102',
      name: 'Combed Cotton Woven Boxer Shorts',
      price: 599.00,
      originalPrice: 799.00,
      image: 'images/trend_boxer_shorts.jpg',
      tag: '#M102',
      desc: 'Dual side pockets, button fly woven boxer shorts.',
      link: 'collection.html?category=men-innerwear'
    },
    {
      id: 'M103',
      name: 'Supima Pure Cotton Everyday Crew Tee',
      price: 699.00,
      originalPrice: 999.00,
      image: 'images/trend_core_tshirts.jpg',
      tag: '#M103',
      desc: 'Zero neck friction, tailored seams combed cotton crew tee.',
      link: 'men.html'
    },
    {
      id: 'M104',
      name: 'Crisp Lightweight Cotton Summer Trousers',
      price: 1299.00,
      originalPrice: 1699.00,
      image: 'images/trend_summer_pants.jpg',
      tag: '#M104',
      desc: 'Breathable weave, ergonomic flex lightweight trousers.',
      link: 'men.html'
    },
    {
      id: 'W225',
      name: 'Super Combed Cotton Graphic T-Shirt',
      price: 799.00,
      originalPrice: 1099.00,
      image: 'images/focus_graphic_tee.jpg',
      tag: '#W225',
      desc: 'Ultrasoft rib crew, breathable weave graphic t-shirt.',
      link: 'index.html'
    },
    {
      id: 'W230',
      name: 'Microfiber Fabric Oversized Cargo Utility Pants',
      price: 1799.00,
      originalPrice: 2299.00,
      image: 'images/focus_cargo_pants.jpg',
      tag: '#W230',
      desc: 'Multi-utility pockets, moisture-wicking cargo pants.',
      link: 'index.html'
    },
    {
      id: 'A113',
      name: 'Super Combed Cotton Rib Fabric Slim Fit Tank Top',
      price: 329.00,
      originalPrice: 499.00,
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      tag: '#A113',
      desc: 'StayFresh technology, racerback cut ribbed slim tank top.',
      link: 'women.html'
    },
    {
      id: 'FE41',
      name: 'Wirefree Non-Padded Cotton Stretch Full Coverage Bra',
      price: 749.00,
      originalPrice: 999.00,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',
      tag: '#FE41',
      desc: 'Wider adjustable straps, zero underwire poke full coverage bra.',
      link: 'collection.html?category=women-bras'
    },
    {
      id: '1406',
      name: 'High Coverage Cotton Hipster with Concealed Waistband',
      price: 539.00,
      originalPrice: 799.00,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      tag: '#1406',
      desc: 'Ultrasoft flat seams, pure cotton gusset hipster panties pack.',
      link: 'collection.html?category=women-innerwear'
    },
    {
      id: '1803',
      name: 'Medium Coverage Micro Modal Stretch Bikini Brief',
      price: 539.00,
      originalPrice: 799.00,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
      tag: '#1803',
      desc: 'Twice as soft as cotton, tagless interior bikini brief.',
      link: 'collection.html?category=women-innerwear'
    },
    {
      id: '1802',
      name: 'Micro Modal Elastane Stretch Hipster (2-Pack)',
      price: 539.00,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80',
      tag: '#1802',
      desc: 'Development sample product. Confirm fabric and fit details with Well Icon.',
      link: 'collection.html?category=women-innerwear'
    },
    {
      id: '1529',
      name: 'High Coverage Cotton Stretch Shorties Duo',
      price: 649.00,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      tag: '#1529',
      desc: 'Development sample product. Confirm fabric and fit details with Well Icon.',
      link: 'collection.html?category=women-innerwear'
    },
    {
      id: '1487',
      name: 'Super Combed Cotton Camisole Duo Pack',
      price: 599.00,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
      tag: '#1487',
      desc: 'Development sample product. Confirm fabric and fit details with Well Icon.',
      link: 'collection.html?category=women-tops'
    },
    {
      id: 'W201',
      name: 'Featherlight Wirefree Seamless Bra',
      price: 749.00,
      originalPrice: 999.00,
      image: 'images/trend_everyday_bra.jpg',
      tag: '#W201',
      desc: 'Zero underwire poke, non-pinch side panels wirefree bra.',
      link: 'collection.html?category=women-bras'
    },
    {
      id: 'W202',
      name: 'Ribbed Cotton Crop Polo Top',
      price: 699.00,
      originalPrice: 949.00,
      image: 'images/summer_casual_polo.jpg',
      tag: '#W202',
      desc: 'Soft ribbed weave, tailored button collar crop polo top.',
      link: 'women.html'
    },
    {
      id: 'W203',
      name: 'Oversized Cargo Utility Loungewear Pants',
      price: 1799.00,
      originalPrice: 2299.00,
      image: 'images/focus_cargo_pants.jpg',
      tag: '#W203',
      desc: 'Multi-utility side pockets, moisture-wicking loungewear pants.',
      link: 'women.html'
    },
    {
      id: 'W204',
      name: 'Ribbed Contour Stretch Slim Tank Top',
      price: 329.00,
      originalPrice: 499.00,
      image: 'images/trend_tank_tops.jpg',
      tag: '#W204',
      desc: 'StayFresh antibacterial finish ribbed tank top.',
      link: 'women.html'
    },
    {
      id: 'HANK-01',
      name: 'Super Combed Cotton Handkerchief Trio',
      price: 299.00,
      originalPrice: 449.00,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
      tag: '#HK01',
      desc: 'StayFresh antibacterial finish, satin border handkerchief trio.',
      link: 'collection.html?category=accessories-handkerchiefs'
    },
    {
      id: 'SOCK-01',
      name: 'Terry Cushioned Athletic Ankle Socks (3-Pack)',
      price: 399.00,
      originalPrice: 599.00,
      image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80',
      tag: '#SK02',
      desc: 'Arch support band, moisture absorbent cushioned ankle socks.',
      link: 'collection.html?category=accessories-socks'
    },
    {
      id: 'CP03',
      name: 'Adjustable Organic Cotton Sports Cap',
      price: 499.00,
      originalPrice: 699.00,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      tag: '#CP03',
      desc: 'UV resistant peak, embroidered logo cotton sports cap.',
      link: 'accessories.html'
    },
    {
      id: 'BT04',
      name: 'Plush Soft Cotton Gym & Bath Towel',
      price: 699.00,
      originalPrice: 999.00,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      tag: '#BT04',
      desc: 'Super absorbent plush soft combed cotton bath towel.',
      link: 'accessories.html'
    }
  ];

  // Development sample catalogue metadata. Replace these sample variants with
  // the client's confirmed catalogue before accepting live orders.
  const SAMPLE_PRODUCT_META = {
    'SANDO-01': ['men-vests', 'Men', ['S', 'M', 'L', 'XL', 'XXL']],
    'SANDO-02': ['men-vests', 'Men', ['S', 'M', 'L', 'XL', 'XXL']],
    'SANDO-03': ['men-vests', 'Men', ['S', 'M', 'L', 'XL', 'XXL']],
    'SANDO-04': ['men-vests', 'Men', ['S', 'M', 'L', 'XL', 'XXL']],
    M101: ['men-bottomwear', 'Men', ['S', 'M', 'L', 'XL', 'XXL']],
    M102: ['men-innerwear', 'Men', ['S', 'M', 'L', 'XL', 'XXL']],
    M103: ['men-tops', 'Men', ['XS', 'S', 'M', 'L', 'XL', 'XXL']],
    M104: ['men-bottomwear', 'Men', ['S', 'M', 'L', 'XL', 'XXL']],
    W225: ['women-tops', 'Women', ['XS', 'S', 'M', 'L', 'XL']],
    W230: ['women-bottomwear', 'Women', ['XS', 'S', 'M', 'L', 'XL']],
    A113: ['women-tops', 'Women', ['XS', 'S', 'M', 'L', 'XL']],
    FE41: ['women-bras', 'Women', ['32B', '34B', '36B', '38B']],
    '1406': ['women-innerwear', 'Women', ['S', 'M', 'L', 'XL', 'XXL']],
    '1803': ['women-innerwear', 'Women', ['S', 'M', 'L', 'XL', 'XXL']],
    '1802': ['women-innerwear', 'Women', ['S', 'M', 'L', 'XL', 'XXL']],
    '1529': ['women-innerwear', 'Women', ['S', 'M', 'L', 'XL', 'XXL']],
    '1487': ['women-tops', 'Women', ['XS', 'S', 'M', 'L', 'XL']],
    W201: ['women-bras', 'Women', ['32B', '34B', '36B', '38B']],
    W202: ['women-tops', 'Women', ['XS', 'S', 'M', 'L', 'XL']],
    W203: ['women-bottomwear', 'Women', ['XS', 'S', 'M', 'L', 'XL']],
    W204: ['women-tops', 'Women', ['XS', 'S', 'M', 'L', 'XL']],
    'HANK-01': ['accessories-handkerchiefs', 'Accessories', ['One Size']],
    'SOCK-01': ['accessories-socks', 'Accessories', ['One Size']],
    CP03: ['accessories-headwear', 'Accessories', ['One Size']],
    BT04: ['accessories-towels', 'Accessories', ['One Size']]
  };

  WELL_ICON_PRODUCTS.forEach(product => {
    const [category, gender, availableSizes] = SAMPLE_PRODUCT_META[product.id] || ['other', 'Unisex', ['One Size']];
    product.category = category;
    product.gender = gender;
    product.availableSizes = availableSizes;
    product.availableColors = [];
    product.images = [product.image];
    product.isSample = true;
    // Source data does not include verified list prices/discounts.
    product.originalPrice = null;
  });

  // ==========================================
  // 2. DATA PERSISTENCE & HELPERS
  // ==========================================
  function getWishlist() {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY) || localStorage.getItem(WISHLIST_LEGACY_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      const ids = parsed.map(item => (typeof item === 'object' && item !== null ? item.id : String(item))).filter(Boolean);
      return Array.from(new Set(ids)).filter(id => Boolean(getProductById(id)));
    } catch (e) {
      console.warn('Error reading wishlist from localStorage:', e);
      return [];
    }
  }

  function saveWishlist(wishlistIds) {
    try {
      const uniqueIds = Array.from(new Set(wishlistIds.filter(Boolean)));
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(uniqueIds));
      localStorage.setItem(WISHLIST_LEGACY_KEY, JSON.stringify(uniqueIds));
    } catch (e) {
      console.warn('Error saving wishlist to localStorage:', e);
    }
  }

  function getCatalogCache() {
    try {
      const cached = localStorage.getItem(CATALOG_CACHE_KEY);
      return cached ? JSON.parse(cached) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCatalogCache(cache) {
    try {
      localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(cache));
    } catch (e) {}
  }

  function registerProduct(productData) {
    if (!productData || !productData.id) return;
    const cache = getCatalogCache();
    cache[productData.id] = productData;
    saveCatalogCache(cache);
  }

  function getProductById(id) {
    if (!id) return null;
    const master = WELL_ICON_PRODUCTS.find(p => p.id === id);
    if (master) return master;
    const cache = getCatalogCache();
    return cache[id] || null;
  }

  // SHARED CART STORAGE SYSTEM
  function getCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem(CART_LEGACY_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(item => item && typeof item === 'object' && typeof item.id === 'string' && item.id.trim()).map(item => {
        const product = getProductById(item.id);
        const quantity = Number.parseInt(item.qty, 10);
        const storedPrice = Number(item.price);
        const price = Number.isFinite(product?.price) ? product.price : (Number.isFinite(storedPrice) && storedPrice >= 0 ? storedPrice : null);
        if (!Number.isFinite(price)) return null;
        return {
          id: item.id,
          name: product?.name || (typeof item.name === 'string' ? item.name : 'Well Icon item'),
          price,
          image: product?.image || (typeof item.image === 'string' ? item.image : 'images/hero_groove_banner.jpg'),
          variant: typeof item.variant === 'string' ? item.variant : '',
          color: typeof item.color === 'string' ? item.color : '',
          qty: Number.isFinite(quantity) && quantity > 0 ? Math.min(quantity, 99) : 1
        };
      }).filter(Boolean);
    } catch (e) {
      console.warn('Error reading cart from localStorage:', e);
      return [];
    }
  }

  function saveCart(cartData) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
      localStorage.setItem(CART_LEGACY_KEY, JSON.stringify(cartData));
    } catch (e) {
      console.warn('Error saving cart to localStorage:', e);
    }
  }

  let cart = getCart();

  // SHARED CART API FUNCTIONS
  function getCartCount() {
    return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  }

  function getCartSubtotal() {
    return cart.reduce((sum, item) => sum + ((typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0) * (item.qty || 1)), 0);
  }

  function isInCart(productId, variant = null) {
    if (!productId) return false;
    return cart.some(item => item.id === productId && (!variant || (item.variant || item.color) === variant));
  }

  function findCartIndex(productId, variant = null) {
    if (!productId) return -1;
    return cart.findIndex(item => item.id === productId && (!variant || (item.variant || item.color) === variant));
  }

  function addToCart(productId, variant = '', qty = 1, customProductObj = null) {
    if (!productId) return null;
    const product = customProductObj || getProductById(productId);
    if (!product) return null;
    const productPrice = Number(product.price);
    if (!Number.isFinite(productPrice) || productPrice < 0) return null;
    const requestedQty = Number.parseInt(qty, 10);
    if (!Number.isFinite(requestedQty) || requestedQty < 1) return null;
    qty = Math.min(99, requestedQty);

    const targetVariant = variant || product.variant || '';
    const existingIndex = findCartIndex(productId, targetVariant);

    if (existingIndex > -1) {
      cart[existingIndex].qty = Math.min(99, cart[existingIndex].qty + qty);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: productPrice,
        image: product.image,
        variant: targetVariant,
        color: targetVariant,
        qty: qty
      });
    }
    updateCartUI();
    return cart;
  }

  function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1)[0];
      updateCartUI();
      return removed;
    }
    return null;
  }

  function updateCartQuantity(index, newQty) {
    if (index >= 0 && index < cart.length) {
      const quantity = Number.parseInt(newQty, 10);
      if (!Number.isFinite(quantity) || quantity < 1) return;
      cart[index].qty = Math.min(99, quantity);
      updateCartUI();
    }
  }

  function clearCart() {
    cart = [];
    updateCartUI();
  }

  // Elements References
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
  let currentSelectedZoomSize = 'M';

  // ==========================================
  // 3. TOAST NOTIFICATION SYSTEM
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
      <span class="material-symbols-outlined text-[20px] text-badge-fresh" style="color:${iconName === 'favorite' ? '#E53935' : (iconName === 'delete' ? '#BA1A1A' : '')}">${iconName}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2200);
  }

  // ==========================================
  // 4. SHARED WISHLIST LOGIC (PUBLIC API)
  // ==========================================
  function isWishlisted(productId) {
    if (!productId) return false;
    const list = getWishlist();
    return list.includes(productId);
  }

  function addToWishlist(productId, productObj = null) {
    if (!productId) return;
    if (productObj) registerProduct(productObj);
    const list = getWishlist();
    if (!list.includes(productId)) {
      list.push(productId);
      saveWishlist(list);
    }
    updateWishlistUI();
    if (document.getElementById('wishlist-items-grid')) {
      renderWishlist();
    }
  }

  function removeFromWishlist(productId) {
    if (!productId) return;
    let list = getWishlist();
    list = list.filter(id => id !== productId);
    saveWishlist(list);
    updateWishlistUI();
    if (document.getElementById('wishlist-items-grid')) {
      renderWishlist();
    }
  }

  function toggleWishlist(productId, productObj = null) {
    if (!productId) return false;
    if (isWishlisted(productId)) {
      removeFromWishlist(productId);
      return false;
    } else {
      addToWishlist(productId, productObj);
      return true;
    }
  }

  function getWishlistCount() {
    return getWishlist().length;
  }

  function updateWishlistUI() {
    const currentWishlist = getWishlist();
    const count = currentWishlist.length;

    document.querySelectorAll('a[aria-label*="Wishlist"] span:last-child, #wishlist-page-badge, .wishlist-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.classList.add('animate-badge-pop');
      setTimeout(() => badge.classList.remove('animate-badge-pop'), 300);
    });

    document.querySelectorAll('a[aria-label*="Wishlist"]').forEach(link => {
      link.setAttribute('aria-label', `Wishlist (${count} item${count === 1 ? '' : 's'})`);
    });

    document.querySelectorAll('[data-product-id], .group').forEach((card, idx) => {
      const product = extractProductFromCard(card, idx);
      if (!product || !product.id) return;

      const favBtn = card.querySelector('button[aria-label*="wishlist"], button[aria-label*="Wishlist"], button[aria-label*="favorite"], button[aria-label*="Favorite"], .wishlist-toggle-btn') ||
                     Array.from(card.querySelectorAll('button')).find(b => b.querySelector('.material-symbols-outlined')?.textContent.trim() === 'favorite');

      if (!favBtn) return;

      const icon = favBtn.querySelector('.material-symbols-outlined');
      const saved = currentWishlist.includes(product.id);

      favBtn.setAttribute('aria-pressed', saved ? 'true' : 'false');
      favBtn.setAttribute('aria-label', saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`);

      if (icon) {
        if (saved) {
          icon.classList.add('fill-active');
          icon.style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24";
          icon.style.color = '#E53935';
          favBtn.classList.add('wishlist-btn-active');
        } else {
          icon.classList.remove('fill-active');
          icon.style.fontVariationSettings = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
          icon.style.color = '';
          favBtn.classList.remove('wishlist-btn-active');
        }
      }
    });
  }

  // ==========================================
  // 5. WISHLIST PAGE & EMPTY STATE RENDERER
  // ==========================================
  function renderWishlist() {
    const container = document.getElementById('wishlist-items-grid');
    if (!container) return;

    const wishlistIds = getWishlist();

    if (wishlistIds.length === 0) {
      container.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center max-w-lg mx-auto">
          <div class="w-24 h-24 rounded-full bg-sale-crimson/10 flex items-center justify-center mb-6 text-sale-crimson shadow-inner">
            <span class="material-symbols-outlined text-[48px]" style="font-variation-settings: 'FILL' 0; color: #E53935;">favorite_border</span>
          </div>
          <h2 class="font-headline-md text-headline-md md:text-headline-lg font-bold text-primary tracking-tight">Your wishlist is empty</h2>
          <p class="font-body-md text-body-md text-secondary mt-2 mb-8 leading-relaxed">Save your favourite pieces here and find them whenever you're ready.</p>
          <a href="men.html" class="px-8 py-4 rounded-full bg-primary text-on-primary font-label-lg font-bold hover:bg-primary-container transition-all shadow-lg active:scale-95 flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span>Continue Shopping</span>
          </a>
        </div>
      `;
      return;
    }

    const items = wishlistIds.map(id => getProductById(id)).filter(Boolean);

    container.innerHTML = items.map((item) => {
      const discountPercent = item.originalPrice && item.originalPrice > item.price ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;
      const inCart = isInCart(item.id);

      return `
        <div data-product-id="${item.id}" class="group flex flex-col bg-surface-canvas rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border-hairline relative">
          <div class="relative w-full aspect-[3/4] bg-surface-subtle overflow-hidden image-zoom-container">
            <img class="w-full h-full object-cover image-zoom-target transition-transform duration-500 cursor-pointer zoom-trigger-img" data-product-id="${item.id}" alt="${item.name}" src="${item.image}" onerror="this.onerror=null; this.src='images/sando_achiever.jpg';"/>
            <span class="absolute top-3 left-3 bg-primary text-on-primary px-2.5 py-0.5 rounded-full font-label-xs text-label-xs uppercase font-bold shadow-md">${item.tag || '#SAVED'}</span>
            
            <button aria-label="Remove ${item.name} from wishlist" aria-pressed="true" class="remove-wishlist-item-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-canvas/90 backdrop-blur flex items-center justify-center text-sale-crimson hover:bg-sale-crimson hover:text-white transition-colors active:scale-110 z-10 shadow-sm" data-product-id="${item.id}">
              <span class="material-symbols-outlined text-[20px] fill-active" style="font-variation-settings: 'FILL' 1; color: #E53935;">favorite</span>
            </button>
          </div>

          <div class="p-space-md flex flex-col flex-1 justify-between">
            <div>
              <span class="font-label-xs text-label-xs text-secondary font-bold uppercase">${item.tag || ('#' + item.id)}</span>
              <h3 class="font-title-md text-title-md text-primary mt-0.5 line-clamp-1 font-bold cursor-pointer hover:underline product-title-trigger">${item.name}</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">${item.desc || 'Super combed pure cotton apparel crafted for maximum comfort.'}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-border-hairline space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-title-md text-headline-sm font-bold text-primary">₹${item.price.toFixed(2)}</span>
                  ${item.originalPrice ? `<span class="font-label-xs text-label-xs text-secondary line-through ml-1.5">₹${item.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                ${discountPercent > 0 ? `<span class="font-label-xs text-label-xs text-sale-crimson font-bold bg-sale-crimson/10 px-2 py-0.5 rounded">${discountPercent}% OFF</span>` : ''}
              </div>

              <div class="flex items-center gap-2">
                <button class="move-to-bag-btn flex-1 py-2.5 px-4 rounded-full ${inCart ? 'bg-badge-fresh text-on-primary' : 'bg-primary text-on-primary'} font-label-md text-label-md font-bold hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1.5 active:scale-95" data-product-id="${item.id}">
                  <span class="material-symbols-outlined text-[18px]">${inCart ? 'shopping_cart' : 'shopping_bag'}</span>
                  <span>${inCart ? 'GO TO CART →' : 'ADD TO BAG'}</span>
                </button>
                <button class="remove-wishlist-item-btn p-2 rounded-full border border-border-hairline text-secondary hover:text-sale-crimson hover:border-sale-crimson transition-colors" data-product-id="${item.id}" aria-label="Remove ${item.name} from wishlist">
                  <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.remove-wishlist-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pId = btn.getAttribute('data-product-id');
        const prod = getProductById(pId);
        removeFromWishlist(pId);
        showToast(`Removed "${prod ? prod.name : 'Item'}" from wishlist`, 'favorite_border');
      });
    });

    container.querySelectorAll('.move-to-bag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pId = btn.getAttribute('data-product-id');
        const item = getProductById(pId);
        if (!item) return;

        const selectedSizeBtn = btn.closest('[data-product-id]')?.querySelector('.size-btn.active, [data-size].selected');
        const selectedSize = selectedSizeBtn?.getAttribute('data-size') || '';
        if (!selectedSize) {
          showToast('Please select a size first', 'straighten');
          btn.closest('[data-product-id]')?.querySelector('.well-icon-size-picker button')?.focus();
          return;
        }

        if (findCartIndex(item.id, selectedSize) > -1) {
          window.location.href = 'cart.html';
          return;
        }

        addToCart(item.id, selectedSize, 1, item);
        markButtonAsGoToCart(btn, item);
        showToast(`Added "${item.name}" to Shopping Bag!`, 'shopping_bag');
      });
    });

    container.querySelectorAll('.zoom-trigger-img, .product-title-trigger').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pId = el.getAttribute('data-product-id') || el.closest('[data-product-id]')?.getAttribute('data-product-id');
        const prod = getProductById(pId);
        if (prod) window.location.href = `product.html?id=${encodeURIComponent(prod.id)}`;
      });
    });
    updateProductButtonsState();
  }

  // ==========================================
  // 6. PRODUCT CARD & DATA EXTRACTION
  // ==========================================
  function extractProductFromCard(card, idx = 0) {
    if (!card) return null;

    let id = card.getAttribute('data-product-id');
    const tagEl = card.querySelector('.font-label-xs.text-secondary, .bg-primary, .bg-badge-fresh, .bg-secondary');
    if (!id && tagEl) {
      const tagText = tagEl.textContent.trim();
      if (tagText.startsWith('#')) {
        id = tagText.replace('#', '').trim();
      }
    }

    const titleEl = card.querySelector('h3, h4, .font-title-md, .font-headline-sm');
    const name = titleEl ? titleEl.textContent.trim() : 'Well Icon Apparel';
    if (!id) {
      id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || ('item-' + idx);
    }

    const master = getProductById(id);
    if (master) return master;

    const priceEl = card.querySelector('.font-bold.text-primary, .text-sale-crimson, .font-title-md') || Array.from(card.querySelectorAll('span, div')).find(s => s.textContent.includes('₹'));
    const imgEl = card.querySelector('img');
    const descEl = card.querySelector('p');

    let price = NaN;
    if (priceEl) {
      const pMatch = priceEl.textContent.replace(/[^0-9.]/g, '');
      if (pMatch && !isNaN(parseFloat(pMatch))) price = parseFloat(pMatch);
    }

    const image = imgEl ? (imgEl.getAttribute('src') || imgEl.src) : 'images/sando_achiever.jpg';
    const tag = tagEl ? tagEl.textContent.trim() : ('#' + id);
    if (!Number.isFinite(price)) return null;
    const desc = descEl ? descEl.textContent.trim() : 'Review the listed details for this Well Icon item.';

    const lowerName = name.toLowerCase();
    const isAccessory = /handkerchief|sock|cap|towel/.test(lowerName);
    const availableSizes = isAccessory ? ['One Size'] : /bra/.test(lowerName) ? ['32B', '34B', '36B', '38B'] : ['XS', 'S', 'M', 'L', 'XL'];
    const prod = {
      id, name, price, originalPrice: null, image, tag, desc, link: 'index.html',
      category: isAccessory ? 'accessories' : 'featured',
      gender: /women|bra|panty|camisole|girl/.test(lowerName) ? 'Women' : (/men|sando|boxer/.test(lowerName) ? 'Men' : 'Unisex'),
      availableSizes, availableColors: [], isSample: true
    };
    registerProduct(prod);
    return prod;
  }

  // UPDATE PRODUCT BUTTON STATES ACROSS THE STOREFRONT (EXCLUDING CART DRAWER & CART PAGE)
  function ensureProductSizePicker(card, product) {
    if (!card || !product || card.querySelector('.well-icon-size-picker')) return;
    const addButton = Array.from(card.querySelectorAll('button')).find(button => {
      const label = button.textContent.trim().toUpperCase();
      return button.matches('.cart-add-btn, .move-to-bag-btn') || label.includes('ADD TO BAG') || label.includes('ADD TO CART') || label === 'ADD';
    });
    if (!addButton || !Array.isArray(product.availableSizes) || !product.availableSizes.length) return;

    const picker = document.createElement('div');
    picker.className = 'well-icon-size-picker';
    picker.setAttribute('role', 'group');
    picker.setAttribute('aria-label', `Select a sample size for ${product.name}`);
    const label = document.createElement('span');
    label.className = 'font-label-xs text-secondary font-bold';
    label.textContent = 'SIZE';
    picker.appendChild(label);

    product.availableSizes.forEach(size => {
      const option = document.createElement('button');
      const existingVariant = cart.find(item => item.id === product.id)?.variant || '';
      const isOneSize = (product.availableSizes.length === 1 && size === 'One Size') || existingVariant === size;
      option.type = 'button';
      option.className = `size-btn${isOneSize ? ' active selected' : ''}`;
      option.dataset.size = size;
      option.setAttribute('aria-pressed', String(isOneSize));
      option.textContent = size;
      option.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        picker.querySelectorAll('[data-size]').forEach(other => {
          const selected = other === option;
          other.classList.toggle('active', selected);
          other.classList.toggle('selected', selected);
          other.setAttribute('aria-pressed', String(selected));
        });
        const hint = picker.querySelector('.size-selection-hint');
        if (hint) hint.textContent = `Selected size: ${size}`;
        updateProductButtonsState();
      });
      picker.appendChild(option);
    });

    const hint = document.createElement('span');
    hint.className = 'size-selection-hint';
    hint.setAttribute('aria-live', 'polite');
    hint.textContent = product.availableSizes.length === 1 ? 'Standard size' : 'Choose a size before adding';
    picker.appendChild(hint);
    const actionRow = addButton.closest('.mt-4') || addButton.parentElement;
    if (actionRow?.parentElement) actionRow.parentElement.insertBefore(picker, actionRow);
  }

  function updateProductButtonsState() {
    cart = getCart();

    document.querySelectorAll('[data-product-id], .group, section div').forEach((card, idx) => {
      // EXCLUDE CART DRAWER & STANDALONE CART PAGE CONTAINERS
      if (card.closest('#cart-drawer') || card.closest('#cart-page-container') || card.closest('#cart-items-container') || card.closest('#cart-page-items-list')) return;

      const product = extractProductFromCard(card, idx);
      if (!product || !product.id) return;

      ensureProductSizePicker(card, product);

      const cardSizeBtn = card.querySelector('.size-btn.active, [data-size].selected');
      const selectedVariant = cardSizeBtn ? cardSizeBtn.getAttribute('data-size') : null;

      // A size-specific item only appears added after the customer chooses the
      // same size variant that is already in the cart.
      const added = Boolean(selectedVariant) && isInCart(product.id, selectedVariant);

      const addBtns = card.querySelectorAll('.cart-add-btn, .move-to-bag-btn');
      const genericBtns = Array.from(card.querySelectorAll('button')).filter(b => {
        // EXCLUDE WISHLIST BUTTONS BY CLASS, POSITION OR ICON
        const isWishlist = b.classList.contains('wishlist-toggle-btn') || 
          b.classList.contains('remove-wishlist-item-btn') ||
          b.classList.contains('top-3') ||
          (b.getAttribute('aria-label') && (b.getAttribute('aria-label').toLowerCase().includes('wishlist') || b.getAttribute('aria-label').toLowerCase().includes('favorite'))) ||
          (b.querySelector('.material-symbols-outlined') && b.querySelector('.material-symbols-outlined').textContent.trim() === 'favorite');

        if (isWishlist) return false;

        const txt = b.textContent.trim().toUpperCase();
        return txt.includes('ADD TO BAG') || txt.includes('ADD TO CART') || txt.includes('GO TO CART') || txt.includes('GO TO BAG') || txt.includes('ADDED TO BAG') || txt.includes('ADDED TO CART') || txt === 'ADD' || txt.endsWith(' ADD');
      });

      const allAddBtns = Array.from(new Set([...addBtns, ...genericBtns]));

      allAddBtns.forEach(btn => {
        if (btn.id === 'zoom-modal-add-bag') return; // Handled separately

        const isDetailButton = btn.classList.contains('detail-add-btn');

        btn.setAttribute('aria-pressed', added ? 'true' : 'false');
        btn.classList.add('flex', 'items-center', 'justify-center', 'rounded-full', 'transition-all', 'active:scale-95', 'shrink-0');
        btn.classList.add('font-label-md', 'text-label-md', 'font-bold');
        if (!isDetailButton) btn.classList.add('w-10', 'h-10', 'sm:w-auto', 'sm:h-auto', 'px-0', 'sm:px-4', 'py-0', 'sm:py-2');

        if (added) {
          btn.classList.remove('w-10', 'h-10', 'px-0');
          btn.classList.add('w-auto', 'h-auto', 'px-3', 'sm:px-4');
          btn.classList.add('added-in-cart', 'bg-badge-fresh', 'text-on-primary');
          btn.classList.remove('bg-primary');
          btn.setAttribute('aria-label', `Go to Cart (${product.name})`);
          btn.innerHTML = `<span class="material-symbols-outlined text-[18px]">shopping_cart</span><span class="ml-1.5 font-bold">GO TO CART →</span>`;
        } else {
          btn.classList.remove('w-auto', 'h-auto', 'px-3');
          btn.classList.add('w-10', 'h-10', 'px-0');
          btn.classList.remove('added-in-cart', 'bg-badge-fresh');
          btn.classList.add('bg-primary', 'text-on-primary');
          btn.setAttribute('aria-label', `Add ${product.name} to Bag`);
          btn.innerHTML = `<span class="material-symbols-outlined text-[18px]">shopping_bag</span><span class="${isDetailButton ? 'ml-1.5' : 'hidden sm:inline-block ml-1.5'} font-bold">ADD TO BAG</span>`;
        }
      });
    });

    // Zoom Modal Button State
    if (currentZoomProduct && zoomAddBagBtn) {
      const inCart = Boolean(currentSelectedZoomSize) && isInCart(currentZoomProduct.id, currentSelectedZoomSize);
      zoomAddBagBtn.setAttribute('aria-pressed', inCart ? 'true' : 'false');
      if (inCart) {
        zoomAddBagBtn.classList.add('bg-badge-fresh');
        zoomAddBagBtn.classList.remove('bg-primary');
        zoomAddBagBtn.setAttribute('aria-label', `Go to Cart (${currentZoomProduct.name})`);
        zoomAddBagBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">shopping_cart</span> GO TO CART →`;
      } else {
        zoomAddBagBtn.classList.remove('bg-badge-fresh');
        zoomAddBagBtn.classList.add('bg-primary');
        zoomAddBagBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">shopping_bag</span> ADD TO BAG`;
      }
    }
  }

  // ==========================================
  // 7. SHOPPING BAG, DRAWER & PAGE RENDERER
  // ==========================================
  function updateCartUI() {
    saveCart(cart);
    const totalItems = getCartCount();
    const subtotal = getCartSubtotal();

    // Update Header Counter Badges (Desktop & Mobile)
    document.querySelectorAll('a[aria-label*="Shopping Bag"] span:last-child, #cart-page-badge, .cart-count-badge').forEach(badge => {
      badge.textContent = totalItems;
      badge.classList.add('animate-badge-pop');
      setTimeout(() => badge.classList.remove('animate-badge-pop'), 300);
    });

    document.querySelectorAll('a[aria-label*="Shopping Bag"]').forEach(link => {
      link.setAttribute('aria-label', `Shopping Bag (${totalItems} item${totalItems === 1 ? '' : 's'})`);
    });

    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `₹${subtotal.toFixed(2)}`;

    document.querySelectorAll('.proceed-order-btn').forEach(button => {
      button.disabled = cart.length === 0;
      button.setAttribute('aria-disabled', String(cart.length === 0));
    });

    // Render Drawer Items
    renderCartDrawerItems();

    // Render Standalone Cart Page if container exists
    if (document.getElementById('cart-page-container')) {
      renderCartPage();
    }

    // Update All Product Button States Across Storefront Cards
    updateProductButtonsState();
  }

  function renderCartDrawerItems() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 text-center text-on-surface-variant">
          <span class="material-symbols-outlined text-[56px] text-outline-variant mb-3">shopping_bag</span>
          <p class="font-headline-sm text-headline-sm font-bold text-primary">Your Shopping Bag is empty</p>
          <p class="font-body-sm text-body-sm text-secondary mt-1 max-w-xs">Browse the sample collections and choose products to add to your cart.</p>
          <a href="men.html" class="mt-6 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-bold hover:bg-primary-container transition-all">Start Shopping</a>
        </div>
      `;
      return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
      <div class="flex items-center gap-4 py-4 border-b border-border-hairline group">
        <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='images/sando_achiever.jpg';" class="w-20 h-24 object-cover rounded-md bg-surface-subtle shrink-0" />
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <h4 class="font-label-lg text-label-lg font-bold text-primary line-clamp-1">${item.name}</h4>
            <button class="remove-cart-item text-sale-crimson hover:bg-sale-crimson/10 transition-colors px-2.5 py-1 rounded-full border border-sale-crimson/30 flex items-center gap-1 font-label-xs font-bold shrink-0" data-index="${index}" aria-label="Remove ${item.name} from bag">
              <span class="material-symbols-outlined text-[16px]">delete</span>
              <span>Remove</span>
            </button>
          </div>
          <p class="font-label-xs text-label-xs text-secondary mt-0.5">Size: ${item.variant || item.color || 'M'} | #${item.id}</p>
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center border border-border-hairline rounded-full bg-surface-subtle px-2 py-0.5 gap-2">
              <button class="qty-btn text-primary hover:text-secondary font-bold text-sm px-2 disabled:opacity-40 disabled:cursor-not-allowed" data-action="dec" data-index="${index}" ${item.qty <= 1 ? 'disabled' : ''} aria-label="Decrease quantity">-</button>
              <span class="font-label-md text-label-md font-semibold text-primary px-1">${item.qty}</span>
              <button class="qty-btn text-primary hover:text-secondary font-bold text-sm px-2" data-action="inc" data-index="${index}" aria-label="Increase quantity">+</button>
            </div>
            <span class="font-title-md text-title-md font-bold text-primary">₹${((item.price) * item.qty).toFixed(2)}</span>
          </div>
        </div>
      </div>
    `).join('');

    cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.getAttribute('data-index'));
        const action = btn.getAttribute('data-action');
        if (action === 'inc') {
          updateCartQuantity(index, cart[index].qty + 1);
        } else if (action === 'dec') {
          if (cart[index].qty > 1) {
            updateCartQuantity(index, cart[index].qty - 1);
          }
        }
      });
    });

    cartItemsContainer.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.getAttribute('data-index'));
        const removed = removeFromCart(index);
        if (removed) showToast(`Removed "${removed.name}" from Bag`, 'delete');
      });
    });
  }

  function renderCartPage() {
    const pageContainer = document.getElementById('cart-page-container');
    if (!pageContainer) return;

    const itemsContainer = document.getElementById('cart-page-items-list');
    const emptyContainer = document.getElementById('cart-page-empty');
    const subtotalEl = document.getElementById('cart-page-subtotal');
    const totalEl = document.getElementById('cart-page-total');
    const countEl = document.getElementById('cart-page-item-count');

    const totalItems = getCartCount();
    const subtotal = getCartSubtotal();

    if (countEl) countEl.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'}`;
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${subtotal.toFixed(2)}`;

    if (cart.length === 0) {
      if (emptyContainer) emptyContainer.classList.remove('hidden');
      if (itemsContainer) itemsContainer.innerHTML = '';
      return;
    }

    if (emptyContainer) emptyContainer.classList.add('hidden');

    if (itemsContainer) {
      itemsContainer.innerHTML = cart.map((item, index) => `
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-6 bg-surface-canvas rounded-xl border border-border-hairline shadow-sm hover:shadow-md transition-all">
          <div class="flex items-center gap-4 w-full sm:w-auto">
            <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='images/sando_achiever.jpg';" class="w-20 h-24 md:w-24 md:h-28 object-cover rounded-lg bg-surface-subtle shrink-0" />
            <div>
              <span class="font-label-xs text-label-xs text-secondary font-bold uppercase">#${item.id}</span>
              <h3 class="font-title-md text-headline-sm font-bold text-primary">${item.name}</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Size: <span class="font-bold text-primary">${item.variant || item.color || 'M'}</span></p>
              <p class="font-label-md text-label-md text-secondary mt-1">Unit Price: <span class="font-bold text-primary">₹${item.price.toFixed(2)}</span></p>
            </div>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-border-hairline">
            <!-- Quantity Controls -->
            <div class="flex items-center border border-border-hairline rounded-full bg-surface-subtle px-3 py-1 gap-3">
              <button class="cart-page-qty-btn text-primary hover:text-secondary font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed" data-action="dec" data-index="${index}" ${item.qty <= 1 ? 'disabled' : ''} aria-label="Decrease quantity">-</button>
              <span class="font-title-md text-title-md font-semibold text-primary px-2">${item.qty}</span>
              <button class="cart-page-qty-btn text-primary hover:text-secondary font-bold text-base" data-action="inc" data-index="${index}" aria-label="Increase quantity">+</button>
            </div>

            <!-- Line Subtotal -->
            <div class="text-right">
              <span class="font-headline-sm text-headline-sm font-bold text-primary block">₹${(item.price * item.qty).toFixed(2)}</span>
            </div>

            <!-- Remove Button -->
            <button class="cart-page-remove-btn text-sale-crimson hover:bg-sale-crimson/10 transition-colors px-3 py-1.5 rounded-full border border-sale-crimson/30 flex items-center gap-1.5 font-label-md font-bold shrink-0" data-index="${index}" aria-label="Remove ${item.name} from cart">
              <span class="material-symbols-outlined text-[18px]">delete</span>
              <span>Remove</span>
            </button>
          </div>
        </div>
      `).join('');

      itemsContainer.querySelectorAll('.cart-page-qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const index = parseInt(btn.getAttribute('data-index'));
          const action = btn.getAttribute('data-action');
          if (action === 'inc') {
            updateCartQuantity(index, cart[index].qty + 1);
          } else if (action === 'dec') {
            if (cart[index].qty > 1) {
              updateCartQuantity(index, cart[index].qty - 1);
            }
          }
        });
      });

      itemsContainer.querySelectorAll('.cart-page-remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const index = parseInt(btn.getAttribute('data-index'));
          const removed = removeFromCart(index);
          if (removed) showToast(`Removed "${removed.name}" from Cart`, 'delete');
        });
      });
    }
  }

  function openCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('hidden');
    setTimeout(() => {
      if (cartBackdrop) cartBackdrop.classList.remove('opacity-0');
      if (cartPanel) cartPanel.classList.remove('translate-x-full');
    }, 10);
  }

  function closeCartDrawer() {
    if (!cartDrawer) return;
    if (cartBackdrop) cartBackdrop.classList.add('opacity-0');
    if (cartPanel) cartPanel.classList.add('translate-x-full');
    setTimeout(() => {
      cartDrawer.classList.add('hidden');
    }, 300);
  }

  document.querySelectorAll('a[aria-label="Shopping Bag"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (cartDrawer && !window.location.pathname.endsWith('cart.html')) {
        e.preventDefault();
        openCartDrawer();
      }
    });
  });

  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

  // ==========================================
  // 8. ZOOM VIEW MODAL HANDLER
  // ==========================================
  function openZoomModal(productData) {
    if (!zoomModal) return;
    currentZoomProduct = productData;
    currentSelectedZoomSize = '';

    if (zoomImg) zoomImg.src = productData.image;
    if (zoomTitle) zoomTitle.textContent = productData.name;
    if (zoomTag) zoomTag.textContent = productData.tag || 'Well Icon Collection';
    if (zoomPrice) zoomPrice.textContent = `₹${(typeof productData.price === 'number' ? productData.price : parseFloat(productData.price) || 699).toFixed(2)}`;
    if (zoomDesc) zoomDesc.textContent = productData.desc || 'Super combed pure cotton fabric crafted for maximum breathability and flexible stretch contour.';

    // Build available sizes from the product's catalogue entry and require an
    // explicit choice when more than one size is available.
    const details = zoomModal.querySelector('.space-y-4');
    let sizeSection = details && Array.from(details.children).find(child => child.classList.contains('pt-2'));
    if (!sizeSection && details) {
      sizeSection = document.createElement('div');
      sizeSection.className = 'pt-2';
      details.appendChild(sizeSection);
    }
    if (sizeSection) {
      const sizes = productData.availableSizes || ['One Size'];
      const sizeLabel = document.createElement('label');
      sizeLabel.className = 'font-label-md text-label-md font-bold text-primary block mb-2';
      sizeLabel.textContent = 'Select size';
      const options = document.createElement('div');
      options.className = 'well-icon-size-picker';
      options.setAttribute('role', 'group');
      options.setAttribute('aria-label', `Select a sample size for ${productData.name}`);
      sizes.forEach(size => {
        const option = document.createElement('button');
        const isOneSize = sizes.length === 1 && size === 'One Size';
        option.type = 'button';
        option.className = `size-btn${isOneSize ? ' active selected' : ''}`;
        option.dataset.size = size;
        option.setAttribute('aria-pressed', String(isOneSize));
        option.textContent = size;
        option.addEventListener('click', () => {
          options.querySelectorAll('[data-size]').forEach(other => {
            const selected = other === option;
            other.classList.toggle('active', selected);
            other.classList.toggle('selected', selected);
            other.setAttribute('aria-pressed', String(selected));
          });
          currentSelectedZoomSize = size;
          updateProductButtonsState();
        });
        options.appendChild(option);
      });
      const hint = document.createElement('span');
      hint.className = 'size-selection-hint';
      hint.setAttribute('aria-live', 'polite');
      hint.textContent = sizes.length === 1 ? 'Standard size' : 'Choose a size before adding';
      options.appendChild(hint);
      sizeSection.replaceChildren(sizeLabel, options);
      currentSelectedZoomSize = sizes.length === 1 ? sizes[0] : '';
    }

    updateProductButtonsState();
    zoomModal.classList.remove('hidden');
  }

  function closeZoomModal() {
    if (!zoomModal) return;
    zoomModal.classList.add('hidden');
    if (zoomImg) zoomImg.style.transform = 'scale(1)';
  }

  if (zoomModalCloseBtn) zoomModalCloseBtn.addEventListener('click', closeZoomModal);
  if (zoomModalBackdrop) zoomModalBackdrop.addEventListener('click', closeZoomModal);

  // Zoom Modal Size Selector Buttons
  if (zoomModal) {
    zoomModal.querySelectorAll('.size-btn, [data-size]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        zoomModal.querySelectorAll('.size-btn, [data-size]').forEach(b => {
          b.classList.remove('border-2', 'border-primary', 'bg-primary', 'text-on-primary');
          b.classList.add('border-border-hairline', 'text-on-surface-variant');
        });
        btn.classList.remove('border-border-hairline', 'text-on-surface-variant');
        btn.classList.add('border-2', 'border-primary', 'bg-primary', 'text-on-primary');
        currentSelectedZoomSize = btn.getAttribute('data-size') || btn.textContent.trim();
        updateProductButtonsState();
      });
    });
  }

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

  // GLOBAL EVENT DELEGATION FOR ADD TO CART & GO TO CART BUTTONS
  function markButtonAsGoToCart(button, product) {
    if (!button || !product) return;
    button.classList.add('added-in-cart', 'bg-badge-fresh', 'text-on-primary');
    button.classList.remove('bg-primary', 'w-10', 'h-10', 'px-0');
    button.classList.add('w-auto', 'h-auto', 'px-3');
    button.setAttribute('aria-label', `Go to Cart (${product.name})`);
    button.setAttribute('aria-pressed', 'true');
    button.innerHTML = `<span class="material-symbols-outlined text-[18px]" aria-hidden="true">shopping_cart</span><span class="ml-1.5 font-bold">GO TO CART →</span>`;
  }

  function beginOrderReview(items, mode) {
    if (!Array.isArray(items) || items.length === 0) {
      showToast('Your cart is empty', 'shopping_bag');
      return;
    }
    try {
      sessionStorage.setItem('wellIconOrderDraft', JSON.stringify({ mode, items, createdAt: new Date().toISOString() }));
      window.location.href = `order.html?mode=${encodeURIComponent(mode)}`;
    } catch (error) {
      console.warn('Could not save the order review draft:', error);
      showToast('Could not prepare the order summary. Please try again.', 'error');
    }
  }

  document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('button[aria-label*="wishlist"], button[aria-label*="Wishlist"], button[aria-label*="favorite"], button[aria-label*="Favorite"], .wishlist-toggle-btn') ||
                   (e.target.closest('button') && e.target.closest('button').querySelector('.material-symbols-outlined')?.textContent.trim() === 'favorite' ? e.target.closest('button') : null);

    if (favBtn) {
      if (favBtn.closest('#wishlist-items-grid') || favBtn.classList.contains('remove-wishlist-item-btn')) return; // Handled in renderWishlist
      e.preventDefault();
      e.stopPropagation();
      const card = favBtn.closest('[data-product-id]') || favBtn.closest('.group') || favBtn.closest('div');
      const product = extractProductFromCard(card);
      if (product && product.id) {
        const isAdded = toggleWishlist(product.id, product);
        showToast(isAdded ? `Saved "${product.name}" to Wishlist` : `Removed "${product.name}" from Wishlist`, isAdded ? 'favorite' : 'favorite_border');
      }
      return;
    }

    const buyNowButton = e.target.closest('[data-action="buy-now"]');
    if (buyNowButton) {
      e.preventDefault();
      e.stopPropagation();
      const detail = buyNowButton.closest('[data-product-id]');
      const product = getProductById(detail?.getAttribute('data-product-id'));
      const selectedSize = detail?.querySelector('.size-btn.active, [data-size].selected')?.getAttribute('data-size') || '';
      const sizeHint = detail?.querySelector('.detail-size-note');
      if (!product) return;
      if (!selectedSize) {
        if (sizeHint) sizeHint.textContent = 'Please choose a size before continuing.';
        detail.querySelector('.detail-size-fieldset [data-size]')?.focus();
        showToast('Please select a size first', 'straighten');
        return;
      }
      const quantityInput = detail.querySelector('#product-qty');
      const quantity = Math.max(1, Math.min(99, Number.parseInt(quantityInput?.value || '1', 10) || 1));
      beginOrderReview([{ id: product.id, name: product.name, price: Number(product.price), image: product.image, variant: selectedSize, color: '', qty: quantity }], 'direct');
      return;
    }

    const proceedOrderButton = e.target.closest('.proceed-order-btn');
    if (proceedOrderButton) {
      e.preventDefault();
      e.stopPropagation();
      beginOrderReview(cart.map(item => ({ ...item })), 'cart');
      return;
    }

    const addBtn = e.target.closest('.cart-add-btn, .move-to-bag-btn, #zoom-modal-add-bag') ||
      (e.target.closest('button') && (
        e.target.closest('button').textContent.trim().toUpperCase().includes('ADD TO BAG') ||
        e.target.closest('button').textContent.trim().toUpperCase().includes('ADD TO CART') ||
        e.target.closest('button').textContent.trim().toUpperCase().includes('GO TO CART') ||
        e.target.closest('button').textContent.trim().toUpperCase().includes('GO TO BAG') ||
        e.target.closest('button').textContent.trim().toUpperCase().includes('ADDED TO BAG') ||
        e.target.closest('button').textContent.trim().toUpperCase().includes('ADDED TO CART') ||
        (e.target.closest('button').classList.contains('px-4') && (e.target.closest('button').textContent.trim().includes('Add') || e.target.closest('button').textContent.trim().includes('Go')))
      ) ? e.target.closest('button') : null);

    if (!addBtn) return;
    if (addBtn.closest('header') || addBtn.closest('#cart-drawer') || addBtn.closest('#cart-items-container') || addBtn.closest('#cart-page-items-list') || addBtn.classList.contains('qty-btn') || addBtn.classList.contains('remove-cart-item') || addBtn.classList.contains('cart-page-qty-btn') || addBtn.classList.contains('cart-page-remove-btn')) return;

    // PREVENT DEFAULT & BUBBLING TO CARD CONTAINERS
    e.preventDefault();
    e.stopPropagation();

    // Zoom Modal Button Click
    if (addBtn.id === 'zoom-modal-add-bag' || addBtn.closest('#zoom-modal')) {
      if (!currentZoomProduct) return;
      const selectedSize = currentSelectedZoomSize || '';
      if (!selectedSize) {
        zoomModal?.querySelector('.well-icon-size-picker [data-size]')?.focus();
        showToast('Please select a size first', 'straighten');
        return;
      }
      if (findCartIndex(currentZoomProduct.id, selectedSize) > -1) {
        closeZoomModal();
        window.location.href = 'cart.html';
        return;
      }
      addToCart(currentZoomProduct.id, selectedSize, 1, currentZoomProduct);
      updateProductButtonsState();
      showToast(`Added "${currentZoomProduct.name}" to Bag`, 'shopping_bag');
      return;
    }

    // General Product Card Button Click
    const card = addBtn.closest('[data-product-id]') || addBtn.closest('.group') || addBtn.closest('div');
    const product = extractProductFromCard(card);
    if (!product || !product.id) return;

    const selectedSizeBtn = card.querySelector('.size-btn.active, [data-size].selected');
    const selectedSize = selectedSizeBtn ? selectedSizeBtn.getAttribute('data-size') : '';

    if (!selectedSize) {
      card.querySelector('.well-icon-size-picker [data-size]')?.focus();
      card.querySelector('.size-selection-hint')?.replaceChildren(document.createTextNode('Please choose a size before adding'));
      showToast('Please select a size first', 'straighten');
      return;
    }

    if (findCartIndex(product.id, selectedSize) > -1) {
      window.location.href = 'cart.html';
      return;
    }

    const qtyInput = document.getElementById('product-qty');
    const qty = Math.min(99, Math.max(1, parseInt(qtyInput?.value || '1', 10) || 1));
    const updatedCart = addToCart(product.id, selectedSize, qty, product);
    if (updatedCart && findCartIndex(product.id, selectedSize) > -1) {
      // Update the exact button that was clicked immediately, even if a page's
      // card markup is too different for the general state scan to find it.
      markButtonAsGoToCart(addBtn, product);
    }
    showToast(`Added "${product.name}" to Shopping Bag`, 'shopping_bag');
  });

  // BIND PRODUCT DETAIL TRIGGERS (IMAGE, TITLE, VIEW DETAILS BUTTON)
  document.querySelectorAll('[data-product-id], .group').forEach((card, idx) => {
    if (card.closest('#cart-page-container') || card.closest('#cart-drawer')) return;

    const product = extractProductFromCard(card, idx);
    if (!product || !product.id) return;

    const cardImg = card.querySelector('img');
    const cardTitle = card.querySelector('h3, h4, .font-title-md, .font-headline-sm');
    const zoomBtn = card.querySelector('.zoom-trigger-btn, .view-details-btn, [data-action="view-details"]');

    // 1. Image Click -> Opens Detail View Modal ONLY (Does NOT add to cart)
    if (cardImg && !cardImg.classList.contains('detail-view-bound')) {
      cardImg.classList.add('detail-view-bound');
      cardImg.style.cursor = 'pointer';
      cardImg.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        e.preventDefault();
        e.stopPropagation();
        window.location.href = `product.html?id=${encodeURIComponent(product.id)}`;
      });
    }

    // 2. Title Click -> Opens Detail View Modal ONLY (Does NOT add to cart)
    if (cardTitle && !cardTitle.classList.contains('detail-view-bound')) {
      cardTitle.classList.add('detail-view-bound');
      cardTitle.style.cursor = 'pointer';
      cardTitle.classList.add('hover:underline', 'transition-all');
      cardTitle.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        e.preventDefault();
        e.stopPropagation();
        window.location.href = `product.html?id=${encodeURIComponent(product.id)}`;
      });
    }

    // 3. View Details Button -> Opens Detail View Modal ONLY (Does NOT add to cart)
    if (zoomBtn && !zoomBtn.classList.contains('detail-view-bound')) {
      zoomBtn.classList.add('detail-view-bound');
      zoomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = `product.html?id=${encodeURIComponent(product.id)}`;
      });
    }
  });

  // Clear Wishlist Button Handler
  const clearWishlistBtn = document.getElementById('clear-wishlist-btn');
  if (clearWishlistBtn) {
    clearWishlistBtn.addEventListener('click', () => {
      if (getWishlistCount() === 0) {
        showToast('Wishlist is already empty', 'info');
        return;
      }
      saveWishlist([]);
      updateWishlistUI();
      renderWishlist();
      showToast('Wishlist cleared', 'delete_sweep');
    });
  }

  // ==========================================
  // 9. FILTER TABS & MOBILE DRAWER LOGIC
  // ==========================================
  const collectionGrid = document.querySelector('#products .grid');
  const collectionCards = collectionGrid ? Array.from(collectionGrid.children).filter(card => card.matches('.group, [data-product-id]')) : [];
  let activeCollectionFilter = '';

  function matchesCollectionFilter(product, label) {
    const value = label.toLowerCase();
    if (!value || value.startsWith('all ')) return true;
    if (value.includes('gym sando')) return /^SANDO-/.test(product.id);
    if (value.includes('performance tank')) return ['SANDO-02', 'SANDO-03'].includes(product.id);
    if (value.includes('cotton vest')) return ['SANDO-01', 'SANDO-04'].includes(product.id);
    if (value.includes('shorts') || value.includes('jogger') || value.includes('loungewear')) return /bottomwear/.test(product.category) || /short|jogger|lounge|pant/i.test(product.name);
    if (value.includes('bra')) return product.category === 'women-bras';
    if (value.includes('panties') || value.includes('hipster')) return product.category === 'women-innerwear';
    if (value.includes('camisole') || value.includes('slip')) return product.category === 'women-tops' && /camisole|slip|tank/i.test(product.name);
    if (value.includes('handkerchief')) return product.category === 'accessories-handkerchiefs';
    if (value.includes('sock')) return product.category === 'accessories-socks';
    if (value.includes('cap') || value.includes('headwear')) return product.category === 'accessories-headwear';
    if (value.includes('towel')) return product.category === 'accessories-towels';
    return product.category === value.replaceAll(' ', '-');
  }

  function applyCollectionView() {
    if (!collectionGrid) return;
    let visibleCount = 0;
    collectionCards.forEach((card, index) => {
      const product = extractProductFromCard(card, index);
      const visible = product && matchesCollectionFilter(product, activeCollectionFilter);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    let emptyState = collectionGrid.querySelector('.collection-empty-state');
    if (!visibleCount) {
      if (!emptyState) {
        emptyState = document.createElement('p');
        emptyState.className = 'collection-empty-state';
        emptyState.setAttribute('role', 'status');
        emptyState.textContent = 'No products match this collection yet.';
        collectionGrid.appendChild(emptyState);
      }
    } else if (emptyState) emptyState.remove();

    let count = document.getElementById('collection-result-count');
    if (!count) {
      count = document.createElement('p');
      count.id = 'collection-result-count';
      count.className = 'font-label-sm text-secondary';
      count.setAttribute('aria-live', 'polite');
      collectionGrid.parentElement?.insertBefore(count, collectionGrid);
    }
    count.textContent = `${visibleCount} sample product${visibleCount === 1 ? '' : 's'}`;
  }

  document.querySelectorAll('[data-filter-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      const label = tab.textContent.trim();
      if (!collectionGrid) {
        window.location.href = /^men$/i.test(label) ? 'men.html' : 'women.html';
        return;
      }
      const parent = tab.parentElement;
      parent.querySelectorAll('button').forEach(button => {
        button.classList.remove('bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
        button.classList.add('text-on-surface-variant');
        button.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
      tab.classList.remove('text-on-surface-variant');
      tab.setAttribute('aria-pressed', 'true');
      activeCollectionFilter = /^all\b/i.test(label) ? '' : label;
      applyCollectionView();
    });
    tab.setAttribute('aria-pressed', tab.classList.contains('bg-primary') ? 'true' : 'false');
  });

  document.querySelectorAll('#products ~ * select, body > main select, select').forEach(select => {
    if (!collectionGrid || select.closest('#mobile-menu-drawer, #cart-drawer')) return;
    select.addEventListener('change', () => {
      const selected = select.options[select.selectedIndex]?.textContent.toLowerCase() || '';
      const cards = collectionCards.slice().sort((a, b) => {
        const first = extractProductFromCard(a);
        const second = extractProductFromCard(b);
        if (selected.includes('low to high')) return (first?.price || 0) - (second?.price || 0);
        if (selected.includes('high to low')) return (second?.price || 0) - (first?.price || 0);
        if (selected.includes('name a') || selected.includes('alphabetical')) return (first?.name || '').localeCompare(second?.name || '');
        return Number(a.dataset.featuredIndex || 0) - Number(b.dataset.featuredIndex || 0);
      });
      cards.forEach((card, index) => {
        if (card.matches('.group, [data-product-id]')) {
          if (!card.dataset.featuredIndex) card.dataset.featuredIndex = String(index);
          collectionGrid.appendChild(card);
        }
      });
      applyCollectionView();
    });
  });

  if (collectionGrid) {
    collectionCards.forEach((card, index) => { card.dataset.featuredIndex = String(index); });
    applyCollectionView();
  }

  document.querySelectorAll('[aria-label="Slide previous trend"], [aria-label="Slide next trend"], [aria-label="Previous featured products"], [aria-label="Next featured products"]').forEach(button => {
    const section = button.closest('section');
    const carousel = section && Array.from(section.querySelectorAll('.grid')).find(grid => grid.children.length > 1);
    if (!carousel) {
      button.disabled = true;
      return;
    }
    carousel.classList.add('well-icon-horizontal-carousel');
    button.addEventListener('click', () => {
      const direction = /previous|left/i.test(button.getAttribute('aria-label') || '') ? -1 : 1;
      carousel.scrollBy({ left: direction * Math.max(240, carousel.clientWidth * 0.8), behavior: 'smooth' });
    });
  });

  // Lightweight catalog search that remains static-hosting friendly.
  document.querySelectorAll('input[type="search"]').forEach(input => {
    input.setAttribute('aria-label', input.getAttribute('aria-label') || 'Search Well Icon products');
    const host = input.parentElement;
    if (!host) return;
    host.classList.add('well-icon-search-host');
    const results = document.createElement('div');
    results.className = 'well-icon-search-results hidden';
    results.setAttribute('role', 'listbox');
    host.appendChild(results);
    const renderResults = () => {
      const query = input.value.trim().toLowerCase();
      results.replaceChildren();
      if (!query) { results.classList.add('hidden'); return; }
      const matches = WELL_ICON_PRODUCTS.filter(product => `${product.name} ${product.desc} ${product.id}`.toLowerCase().includes(query)).slice(0, 6);
      if (!matches.length) {
        const empty = document.createElement('p');
        empty.className = 'search-empty-state';
        empty.textContent = 'No matching products';
        results.appendChild(empty);
      } else {
        matches.forEach(product => {
          const link = document.createElement('a');
          link.className = 'search-result-link';
          link.href = `product.html?id=${encodeURIComponent(product.id)}`;
          link.setAttribute('role', 'option');
          const name = document.createElement('span');
          name.textContent = product.name;
          const price = document.createElement('span');
          price.textContent = `₹${Number(product.price).toFixed(2)}`;
          link.append(name, price);
          results.appendChild(link);
        });
      }
      results.classList.remove('hidden');
    };
    input.addEventListener('input', renderResults);
    input.addEventListener('keydown', event => {
      if (event.key === 'Escape') { input.value = ''; renderResults(); }
      if (event.key === 'Enter') results.querySelector('a')?.click();
    });
    document.addEventListener('click', event => {
      if (!host.contains(event.target)) results.classList.add('hidden');
    });
  });

  // Resolve any legacy placeholder links to a real collection or a clearly
  // labeled information page instead of leaving them as dead `#` controls.
  document.querySelectorAll('a[href="#"], a[href=""]').forEach(anchor => {
    const label = anchor.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
    const path = (anchor.dataset.path || '').toLowerCase();
    const info = topic => `site-info.html?topic=${encodeURIComponent(topic)}`;
    let destination = '';

    if (label === 'men') destination = 'men.html';
    else if (label === 'women') destination = 'women.html';
    else if (/accessor/.test(path) || /accessor/.test(label)) destination = 'accessories.html';
    else if (/men/.test(label)) {
      if (/brief|trunk|boxer|innerwear|underwear/.test(label)) destination = 'collection.html?category=men-innerwear';
      else if (/sando|vest|tank/.test(label)) destination = 'collection.html?category=men-vests';
      else if (/short|jogger|pant|bottom|bermuda|pajama/.test(label)) destination = 'collection.html?category=men-bottomwear';
      else if (/tee|shirt|top|sweat/.test(label)) destination = 'collection.html?category=men-tops';
      else destination = 'men.html';
    } else if (/women/.test(label)) {
      if (/bra/.test(label)) destination = 'collection.html?category=women-bras';
      else if (/panty|panties|hipster|bikini|brief|shortie/.test(label)) destination = 'collection.html?category=women-innerwear';
      else if (/legging|lounge|short|pant|bottom/.test(label)) destination = 'collection.html?category=women-bottomwear';
      else if (/camisole|top|tee|shirt|tank/.test(label)) destination = 'collection.html?category=women-tops';
      else destination = 'women.html';
    } else if (/handkerchief/.test(label)) destination = 'collection.html?category=accessories-handkerchiefs';
    else if (/sock/.test(label)) destination = 'collection.html?category=accessories-socks';
    else if (/towel/.test(label)) destination = 'collection.html?category=accessories-towels';
    else if (/cap|headwear/.test(label)) destination = 'collection.html?category=accessories-headwear';
    else if (/kid|boy|girl|junior/.test(label) || path === 'juniors') destination = info('kids');
    else if (/thermal/.test(label) || path === 'thermals') destination = info('thermals');
    else if (/track order|tracking/.test(label) || path === 'track-order') destination = info('order-tracking');
    else if (/return|exchange/.test(label) || path === 'returns-exchanges') destination = info('returns');
    else if (/ship|delivery/.test(label) || path === 'shipping-policy') destination = info('shipping');
    else if (/size guide|size information/.test(label) || path === 'size-guide') destination = info('sizing');
    else if (/contact|support|help/.test(label) || path === 'help-support' || path === 'contact-us') destination = info('contact');
    else if (/faq|frequently asked/.test(label) || path === 'faq') destination = info('faq');
    else if (/privacy/.test(label) || path === 'privacy-policy') destination = info('privacy');
    else if (/terms/.test(label) || path === 'terms-conditions') destination = info('terms');
    else if (/accessibility/.test(label)) destination = info('accessibility');
    else if (/store|locator/.test(label) || path === 'store-locator') destination = info('stores');
    else if (/newsletter|subscribe|email updates/.test(label)) destination = info('newsletter');
    else if (/social|community|chat|camera|video|instagram|youtube|facebook/.test(label)) destination = info('social');
    else if (/career/.test(label) || path === 'careers') destination = info('careers');
    else if (/corporate|gifting|franchise|investor/.test(label)) destination = info('corporate-gifting');
    else if (/about|know more|brand/.test(label) || path === 'about-brand') destination = info('about');
    else if (/material|fabric|care/.test(label)) destination = info('other');
    else if (/lookbook|collection|original|international|essence|relax|move|featured/.test(label)) destination = 'collection.html';
    else destination = info('other');

    anchor.href = destination;
  });

  function openMobileMenu() {
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.classList.remove('hidden');
    setTimeout(() => {
      if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('opacity-0');
      if (mobileMenuPanel) mobileMenuPanel.classList.remove('-translate-x-full');
    }, 10);
  }

  function closeMobileMenu() {
    if (!mobileMenuDrawer) return;
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('opacity-0');
    if (mobileMenuPanel) mobileMenuPanel.classList.add('-translate-x-full');
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
  // 10. SPLASH SCREEN CONTROLLER
  // ==========================================
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    let splashDismissed = false;
    const hideSplash = () => {
      if (splashDismissed) return;
      splashDismissed = true;
      splashScreen.style.opacity = '0';
      splashScreen.style.pointerEvents = 'none';
      setTimeout(() => {
        splashScreen.style.display = 'none';
      }, 700);
    };

    setTimeout(hideSplash, 1200);
  }

  // ==========================================
  // 11. MOBILE STICKY CATEGORY NAV ON SCROLL
  // ==========================================
  const mobileCatBar = document.getElementById('mobile-sticky-cat-bar');
  if (mobileCatBar) {
    const handleScroll = () => {
      const scrollThreshold = 120;
      if (window.scrollY > scrollThreshold) {
        mobileCatBar.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
        mobileCatBar.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
      } else {
        mobileCatBar.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
        mobileCatBar.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // CROSS-TAB CART & WISHLIST SYNCHRONIZATION
  window.addEventListener('storage', (e) => {
    if (e.key === CART_STORAGE_KEY || e.key === CART_LEGACY_KEY) {
      cart = getCart();
      updateCartUI();
    }
    if (e.key === WISHLIST_STORAGE_KEY || e.key === WISHLIST_LEGACY_KEY) {
      updateWishlistUI();
      if (document.getElementById('wishlist-items-grid')) {
        renderWishlist();
      }
    }
  });

  // Expose Reusable Public API (Section 8)
  window.wellIconCartAPI = {
    getCart,
    saveCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    isInCart,
    getCartCount,
    getCartSubtotal,
    updateCartUI,
    renderCartPage,
    clearCart
  };

  window.wellIconGetProduct = getProductById;
  window.wellIconListProducts = () => WELL_ICON_PRODUCTS.map(product => ({ ...product, availableSizes: [...product.availableSizes], availableColors: [...product.availableColors] }));
  window.showToast = showToast;

  window.wellIconWishlistAPI = {
    getWishlist,
    isWishlisted,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    getWishlistCount,
    renderWishlist,
    updateWishlistUI
  };

  window.getCart = getCart;
  window.saveCart = saveCart;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateCartQuantity = updateCartQuantity;
  window.isInCart = isInCart;
  window.getCartCount = getCartCount;
  window.getCartSubtotal = getCartSubtotal;
  window.updateCartUI = updateCartUI;
  window.renderCartPage = renderCartPage;
  window.clearCart = clearCart;

  window.getWishlist = getWishlist;
  window.isWishlisted = isWishlisted;
  window.addToWishlist = addToWishlist;
  window.removeFromWishlist = removeFromWishlist;
  window.toggleWishlist = toggleWishlist;
  window.getWishlistCount = getWishlistCount;
  window.renderWishlist = renderWishlist;
  window.updateWishlistUI = updateWishlistUI;

  // Initial Sync
  updateCartUI();
  updateWishlistUI();
  if (document.getElementById('wishlist-items-grid')) {
    renderWishlist();
  }
});
