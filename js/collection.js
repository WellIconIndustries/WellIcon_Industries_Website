document.addEventListener('DOMContentLoaded', () => {
  const products = window.wellIconListProducts?.() || [];
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category') || '';
  const title = document.getElementById('collection-title');
  const breadcrumb = document.getElementById('collection-breadcrumb');
  const description = document.getElementById('collection-description');
  const grid = document.getElementById('collection-grid');
  const empty = document.getElementById('collection-empty');
  const count = document.getElementById('collection-count');
  const sizeFilter = document.getElementById('collection-size-filter');
  const priceFilter = document.getElementById('collection-price-filter');
  const sort = document.getElementById('collection-sort');
  const categoryTitles = {
    'men-vests': 'Men · Sandos and Vests',
    'men-innerwear': 'Men · Innerwear',
    'men-tops': 'Men · Tops',
    'men-bottomwear': 'Men · Bottomwear',
    'women-bras': 'Women · Bras',
    'women-innerwear': 'Women · Innerwear',
    'women-tops': 'Women · Tops',
    'women-bottomwear': 'Women · Bottomwear',
    'accessories-handkerchiefs': 'Accessories · Handkerchiefs',
    'accessories-socks': 'Accessories · Socks',
    'accessories-headwear': 'Accessories · Headwear',
    'accessories-towels': 'Accessories · Towels'
  };

  const categoryProducts = products.filter(product => !category || product.category === category);
  const pageTitle = categoryTitles[category] || 'All Well Icon collections';
  document.title = `${pageTitle} | WELL ICON`;
  title.textContent = pageTitle;
  breadcrumb.textContent = pageTitle;
  description.textContent = categoryProducts.length ? `${categoryProducts.length} development sample product${categoryProducts.length === 1 ? '' : 's'} in this collection.` : 'This collection does not have products in the current sample catalogue.';

  const sizes = Array.from(new Set(categoryProducts.flatMap(product => product.availableSizes || [])));
  sizes.forEach(size => {
    const option = document.createElement('option');
    option.value = size;
    option.textContent = size;
    sizeFilter.appendChild(option);
  });

  function makeCard(product, index) {
    const card = document.createElement('article');
    card.className = 'collection-product-card group';
    card.dataset.productId = product.id;
    card.dataset.featuredIndex = String(index);

    const imageLink = document.createElement('a');
    imageLink.className = 'collection-product-image';
    imageLink.href = `product.html?id=${encodeURIComponent(product.id)}`;
    imageLink.setAttribute('aria-label', `View ${product.name}`);
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;
    image.loading = 'lazy';
    image.onerror = () => { image.onerror = null; image.src = 'images/hero_groove_banner.jpg'; };
    imageLink.appendChild(image);

    const body = document.createElement('div');
    body.className = 'collection-product-body';
    const code = document.createElement('span');
    code.className = 'detail-eyebrow';
    code.textContent = product.tag || product.id;
    const nameLink = document.createElement('a');
    nameLink.className = 'collection-product-name';
    nameLink.href = `product.html?id=${encodeURIComponent(product.id)}`;
    nameLink.textContent = product.name;
    const text = document.createElement('p');
    text.textContent = product.desc;

    const sizePicker = document.createElement('div');
    sizePicker.className = 'well-icon-size-picker';
    sizePicker.setAttribute('role', 'group');
    sizePicker.setAttribute('aria-label', `Select a sample size for ${product.name}`);
    (product.availableSizes || []).forEach(size => {
      const option = document.createElement('button');
      const savedVariant = window.wellIconCartAPI?.getCart().find(item => item.id === product.id)?.variant || '';
      const isOneSize = (product.availableSizes.length === 1 && size === 'One Size') || savedVariant === size;
      option.type = 'button';
      option.className = `size-btn${isOneSize ? ' active selected' : ''}`;
      option.dataset.size = size;
      option.setAttribute('aria-pressed', String(isOneSize));
      option.textContent = size;
      option.addEventListener('click', event => {
        event.stopPropagation();
        sizePicker.querySelectorAll('[data-size]').forEach(other => {
          const selected = other === option;
          other.classList.toggle('active', selected);
          other.classList.toggle('selected', selected);
          other.setAttribute('aria-pressed', String(selected));
        });
        const hint = sizePicker.querySelector('.size-selection-hint');
        if (hint) hint.textContent = `Selected size: ${size}`;
        window.wellIconCartAPI?.updateCartUI();
      });
      sizePicker.appendChild(option);
    });
    const sizeHint = document.createElement('span');
    sizeHint.className = 'size-selection-hint';
    sizeHint.textContent = product.availableSizes.length === 1 ? 'Standard size' : 'Choose a size before adding';
    sizePicker.appendChild(sizeHint);

    const footer = document.createElement('div');
    footer.className = 'collection-product-footer';
    const price = document.createElement('strong');
    price.textContent = `₹${Number(product.price).toFixed(2)}`;
    const wishlist = document.createElement('button');
    wishlist.type = 'button';
    wishlist.className = 'wishlist-toggle-btn collection-wishlist-button';
    wishlist.setAttribute('aria-label', `Add ${product.name} to wishlist`);
    wishlist.setAttribute('aria-pressed', String(window.wellIconWishlistAPI?.isWishlisted(product.id) || false));
    wishlist.textContent = '♡';
    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'cart-add-btn collection-add-button';
    add.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">shopping_bag</span><span>ADD TO BAG</span>';
    footer.append(price, wishlist, add);
    body.append(code, nameLink, text, sizePicker, footer);
    card.append(imageLink, body);
    return card;
  }

  categoryProducts.forEach((product, index) => grid.appendChild(makeCard(product, index)));
  window.wellIconCartAPI?.updateCartUI();
  window.wellIconWishlistAPI?.updateWishlistUI();

  function refresh() {
    const chosenSize = sizeFilter.value;
    const maxPrice = Number(priceFilter.value);
    let visible = categoryProducts.filter(product => {
      const sizeMatch = !chosenSize || (product.availableSizes || []).includes(chosenSize);
      const priceMatch = !priceFilter.value || (Number.isFinite(maxPrice) && product.price <= maxPrice);
      return sizeMatch && priceMatch;
    });

    if (sort.value === 'price-asc') visible.sort((a, b) => a.price - b.price);
    if (sort.value === 'price-desc') visible.sort((a, b) => b.price - a.price);
    if (sort.value === 'name') visible.sort((a, b) => a.name.localeCompare(b.name));

    const visibleIds = new Set(visible.map(product => product.id));
    Array.from(grid.children).forEach(card => {
      card.hidden = !visibleIds.has(card.dataset.productId);
      if (visibleIds.has(card.dataset.productId)) grid.appendChild(card);
    });
    count.textContent = `${visible.length} sample product${visible.length === 1 ? '' : 's'}`;
    empty.hidden = visible.length !== 0;
  }

  sizeFilter.addEventListener('change', refresh);
  priceFilter.addEventListener('input', refresh);
  sort.addEventListener('change', refresh);
  document.getElementById('collection-reset').addEventListener('click', () => {
    sizeFilter.value = '';
    priceFilter.value = '';
    sort.value = 'featured';
    refresh();
  });
  refresh();
});
