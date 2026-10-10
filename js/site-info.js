document.addEventListener('DOMContentLoaded', () => {
  const topics = {
    'order-tracking': ['Track an order', 'Order tracking is not connected yet. Orders are pending until the configured order form is submitted and received by Well Icon.'],
    returns: ['Returns and exchanges', 'Well Icon has not provided a confirmed returns or exchanges policy for this storefront preview.'],
    shipping: ['Shipping and delivery', 'Well Icon has not provided delivery regions, timelines, or shipping charges. No delivery estimate is shown.'],
    sizing: ['Size information', 'The sizes shown in this preview are sample options. Confirm the final size range and fit information with Well Icon before ordering.'],
    contact: ['Contact Well Icon', 'A customer support email address and phone number have not been provided for this storefront.'],
    faq: ['Frequently asked questions', 'Customer support answers will be published after Well Icon confirms its policies and contact details.'],
    about: ['About Well Icon', 'This storefront uses original Well Icon branding and sample catalogue content while the company profile is being finalized.'],
    stores: ['Store locator', 'No confirmed Well Icon store locations have been provided.'],
    newsletter: ['Email updates', 'Email updates are not available yet because no mailing list service has been configured. This site does not collect your email address.'],
    social: ['Well Icon social channels', 'Official social media and app destinations have not been supplied.'],
    privacy: ['Privacy information', 'The final privacy policy must be supplied by Well Icon before this storefront collects customer information.'],
    terms: ['Terms of use', 'The final terms of use must be supplied by Well Icon before the storefront is launched.'],
    accessibility: ['Accessibility', 'Accessibility feedback contact details have not been provided.'],
    kids: ['Junior catalogue', 'There are no confirmed Junior products in the sample catalogue yet.'],
    thermals: ['Thermal collection', 'There are no confirmed thermal products in the sample catalogue yet.'],
    'corporate-gifting': ['Corporate gifting', 'Bulk pricing and corporate gifting details have not been provided.'],
    careers: ['Careers', 'Career information has not been provided for this storefront.'],
    other: ['Store information', 'This Well Icon destination is not configured yet.']
  };
  const key = new URLSearchParams(location.search).get('topic') || 'other';
  const [title, message] = topics[key] || topics.other;
  document.title = `${title} | WELL ICON`;
  document.getElementById('info-title').textContent = title;
  document.getElementById('info-message').textContent = message;
});
