document.addEventListener('DOMContentLoaded', () => {
  const products = window.wellIconListProducts?.() || [];
  const announce = document.getElementById('home-announcement');
  const announcementMessage = window.WELL_ICON_CONFIG?.announcementMessage?.trim();
  if (announce && announcementMessage) {
    announce.textContent = announcementMessage;
    announce.classList.add('is-active');
  }

  const arrivalsGrid = document.getElementById('home-new-arrivals-grid');
  const arrivalIds = ['SANDO-02', 'M103', 'M104', 'W201', 'W204', 'W202', 'M101', 'CP03'];
  const arrivals = arrivalIds.map(id => products.find(product => product.id === id)).filter(Boolean);
  const money = amount => `₹${Number(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  function makeProductCard(product, className = 'home-product-card') {
    const card = document.createElement('article');
    card.className = `${className} group`;
    card.dataset.productId = product.id;
    card.dataset.gender = product.gender || 'Unisex';

    const imageLink = document.createElement('a');
    imageLink.className = 'home-product-card__image';
    imageLink.href = `product.html?id=${encodeURIComponent(product.id)}`;
    imageLink.setAttribute('aria-label', `View ${product.name}`);
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;
    image.loading = 'lazy';
    image.onerror = () => { image.onerror = null; image.src = 'images/hero_groove_banner.jpg'; };
    imageLink.appendChild(image);

    const body = document.createElement('div');
    body.className = 'home-product-card__body';
    const tag = document.createElement('span');
    tag.className = 'home-product-card__tag';
    tag.textContent = product.tag || `#${product.id}`;
    const name = document.createElement('h3');
    const nameLink = document.createElement('a');
    nameLink.href = `product.html?id=${encodeURIComponent(product.id)}`;
    nameLink.textContent = product.name;
    name.appendChild(nameLink);
    const priceRow = document.createElement('div');
    priceRow.className = 'home-product-card__price-row';
    const price = document.createElement('strong');
    price.textContent = money(product.price);
    const wishlist = document.createElement('button');
    wishlist.type = 'button';
    wishlist.className = 'wishlist-toggle-btn home-product-card__wishlist';
    wishlist.setAttribute('aria-label', `Add ${product.name} to wishlist`);
    wishlist.setAttribute('aria-pressed', String(window.wellIconWishlistAPI?.isWishlisted(product.id) || false));
    wishlist.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">favorite_border</span>';
    priceRow.append(price, wishlist);

    const action = document.createElement('button');
    action.type = 'button';
    action.className = 'cart-add-btn home-product-card__add';
    action.textContent = 'ADD TO BAG';
    body.append(tag, name, priceRow, action);
    card.append(imageLink, body);
    return card;
  }

  document.querySelectorAll('#products [data-product-id]').forEach(card => {
    const product = products.find(item => item.id === card.dataset.productId);
    if (!product) return;
    const image = card.querySelector('img');
    if (image && product.image) {
      image.src = product.image;
      image.alt = product.name;
    }
    const title = card.querySelector('h3, h4');
    if (title) title.textContent = product.name;
    const tag = Array.from(card.querySelectorAll('span')).find(node => /^#[\w-]+$/.test(node.textContent.trim()));
    if (tag) tag.textContent = product.tag || `#${product.id}`;
    const price = card.querySelector('.font-title-md.text-title-md');
    if (price) price.textContent = money(product.price);
  });

  if (arrivalsGrid && arrivals.length) {
    arrivals.forEach(product => arrivalsGrid.appendChild(makeProductCard(product)));
    window.wellIconCartAPI?.updateCartUI();
    window.wellIconWishlistAPI?.updateWishlistUI();
  }

  document.querySelectorAll('[data-home-scroll]').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(`home-${button.dataset.homeScroll}-grid`);
      if (!target) return;
      target.scrollBy({ left: Number(button.dataset.direction || 1) * target.clientWidth * .82, behavior: 'smooth' });
    });
  });

  const multipacks = document.getElementById('multipacks-grid');
  multipacks?.querySelectorAll('[data-product-id]').forEach(card => {
    const product = products.find(item => item.id === card.dataset.productId);
    if (!product) return;
    card.dataset.gender = product.gender || card.dataset.gender || 'Unisex';
    const image = card.querySelector('img');
    if (image && product.image) {
      image.src = product.image;
      image.alt = product.name;
      image.onerror = () => { image.onerror = null; image.src = 'images/hero_groove_banner.jpg'; };
    }
  });
  document.querySelectorAll('[data-home-multipack-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const gender = button.dataset.homeMultipackFilter;
      document.querySelectorAll('[data-home-multipack-filter]').forEach(other => {
        const active = other === button;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });
      multipacks?.querySelectorAll('[data-product-id]').forEach(card => {
        card.hidden = gender === 'all' ? false : card.dataset.gender !== gender;
      });
    });
  });
});
