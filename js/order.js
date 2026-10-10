document.addEventListener('DOMContentLoaded', () => {
  const state = document.getElementById('order-state');
  const review = document.getElementById('order-review');
  const actions = document.getElementById('order-error-actions');
  const storedDraft = sessionStorage.getItem('wellIconOrderDraft');
  let draft;

  try {
    draft = storedDraft ? JSON.parse(storedDraft) : null;
  } catch {
    draft = null;
  }

  if (!draft || !Array.isArray(draft.items) || draft.items.length === 0) {
    state.className = 'order-state order-state-error';
    state.textContent = 'There is no order to review. Your cart contents have not been changed.';
    actions.classList.remove('hidden');
    return;
  }

  const items = draft.items.filter(item => item && typeof item.name === 'string' && Number(item.qty) > 0 && Number.isFinite(Number(item.price)));
  if (!items.length) {
    state.className = 'order-state order-state-error';
    state.textContent = 'The saved order details could not be read. Your cart contents have not been changed.';
    actions.classList.remove('hidden');
    return;
  }

  const formatMoney = value => `₹${Number(value).toFixed(2)}`;
  const list = document.getElementById('order-items');
  let subtotal = 0;
  const summary = ['WELL ICON ORDER DETAILS', 'Please use these details when submitting the order form.'];

  items.forEach(item => {
    const quantity = Math.max(1, Math.min(99, Math.floor(Number(item.qty))));
    const price = Number(item.price);
    const lineTotal = price * quantity;
    subtotal += lineTotal;

    const row = document.createElement('article');
    row.className = 'order-item';
    const title = document.createElement('h3');
    title.textContent = item.name;
    const details = document.createElement('p');
    details.textContent = `Size: ${item.variant || item.color || 'Not selected'} · Quantity: ${quantity} · Unit price: ${formatMoney(price)}`;
    const total = document.createElement('strong');
    total.textContent = formatMoney(lineTotal);
    row.append(title, details, total);
    list.appendChild(row);

    summary.push(`${item.name} | Size/Color: ${item.variant || item.color || 'Not selected'} | Qty: ${quantity} | Unit: ${formatMoney(price)} | Line total: ${formatMoney(lineTotal)}`);
  });

  summary.push(`Subtotal: ${formatMoney(subtotal)}`);
  document.getElementById('order-subtotal').textContent = formatMoney(subtotal);
  document.getElementById('order-summary-copy').value = summary.join('\n');
  review.classList.remove('hidden');

  const formUrl = window.WELL_ICON_CONFIG?.googleFormUrl?.trim() || '';
  const formLink = document.getElementById('open-order-form');
  if (/^https:\/\/docs\.google\.com\/forms\//i.test(formUrl)) {
    formLink.disabled = false;
    formLink.textContent = 'Open Well Icon order form';
    formLink.addEventListener('click', () => window.open(formUrl, '_blank', 'noopener,noreferrer'));
    document.getElementById('form-setup-message').textContent = 'The order form opens in a new tab. Paste the copied order summary into the form before submitting.';
  }

  document.getElementById('copy-order-summary').addEventListener('click', async () => {
    const textArea = document.getElementById('order-summary-copy');
    try {
      await navigator.clipboard.writeText(textArea.value);
      window.showToast?.('Order summary copied', 'content_copy');
    } catch {
      textArea.focus();
      textArea.select();
      const copied = document.execCommand('copy');
      window.showToast?.(copied ? 'Order summary copied' : 'Select and copy the order summary', copied ? 'content_copy' : 'info');
    }
  });
});
