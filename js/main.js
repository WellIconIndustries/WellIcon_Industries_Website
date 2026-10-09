document.addEventListener('DOMContentLoaded', () => {
  // 1. Filter Tabs Switching Logic
  const filterTabs = document.querySelectorAll('[data-filter-tab]');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.parentElement;
      parent.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
        btn.classList.add('text-on-surface-variant');
      });
      tab.classList.add('bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
      tab.classList.remove('text-on-surface-variant');
    });
  });

  // 2. Favorite Buttons Toggle Effect
  const favoriteButtons = document.querySelectorAll('button[aria-label="Favorite item"], button[aria-label="Wishlist item"]');
  favoriteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        if (icon.classList.contains('text-sale-crimson')) {
          icon.classList.remove('text-sale-crimson');
          btn.classList.remove('scale-110');
        } else {
          icon.classList.add('text-sale-crimson', 'scale-110');
        }
      }
    });
  });

  // 3. Add to Bag Feedback
  const addToBagButtons = document.querySelectorAll('button:has(span:contains("Add")), button:has(span:contains("ADD TO BAG"))');
  const bagBadge = document.querySelector('a[aria-label="Shopping Bag"] span:last-child');

  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('ADD TO BAG') || btn.textContent.includes('Add')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (bagBadge) {
          let currentCount = parseInt(bagBadge.textContent) || 0;
          bagBadge.textContent = currentCount + 1;
        }
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">check</span> Added`;
        btn.classList.add('bg-badge-fresh');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-badge-fresh');
        }, 1500);
      });
    }
  });
});
