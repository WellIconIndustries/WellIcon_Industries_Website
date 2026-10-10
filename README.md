# WELL ICON storefront

A responsive, static Well Icon storefront inspired by familiar fashion e-commerce browsing patterns. It uses HTML, CSS, Tailwind utilities from the CDN, and vanilla JavaScript. No customer account, login, server, payment gateway, or order database is used.

## Pages

- `index.html` — homepage and featured collections.
- `men.html`, `women.html`, `accessories.html` — catalogue landing pages with category filters and sorting.
- `collection.html?category=...` — shared filtered collection template.
- `product.html?id=...` — product details, sample size selection, Add to Bag, and Buy Now.
- `cart.html` — persistent cart with quantity controls, line totals, and subtotal.
- `wishlist.html` — saved products and move-to-cart actions.
- `order.html` — review/copy order summary and configured Google Form handoff.
- `site-info.html?topic=...` — transparent notices for business information or services not yet configured.

## Shared code and data

- `js/config.js` — public configuration, including the Google Form URL and sample catalogue mode.
- `js/loader.js` — one branded welcome splash per browser tab session, followed by a lightweight top progress cue on later page loads and navigation.
- `js/main.js` — central sample catalogue, cart/wishlist state, navigation, search, product selection, and shared interactions.
- `js/collection.js`, `js/order.js`, `js/site-info.js` — page-specific behavior built on the shared storefront APIs.
- `css/styles.css` — design tokens, accessibility states, responsive safeguards, and shared page styles.
- `images/` — supplied local campaign and product assets used throughout the storefront.

The products, prices, sizes, product specifications, and much of the imagery are development samples. Replace them with Well Icon-approved catalogue information before accepting live orders. No unverified discounts, stock levels, color counts, reviews, or shipping charges are displayed as live facts.

## Local preview

Serve the repository root so relative links work:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Google Form setup

Edit `js/config.js` and set `googleFormUrl` to the client's published Google Form URL. The URL is public storefront configuration, not a secret. The order page displays a copyable list of products, selected sizes, quantities, prices, and subtotal. Customers must paste the summary into the form and submit it themselves. The storefront does not claim that opening the form submits an order, verifies payment, or generates an order number. Verified Google Form field IDs are needed before reliable prefill can be added.

Buy Now creates a direct-order review draft for the selected product and leaves the existing cart untouched. Standard cart ordering reviews the saved cart contents.

## GitHub Pages

The site is static and uses relative page and asset paths, so it can be served from the project root at `/WellIcon/`. No build step is required. External font, Tailwind CDN, and remote sample-image requests need an internet connection. No deployment was performed as part of this repository work.

## Client information required before launch

- Published Google Form URL and verified prefill entry IDs, if desired.
- Approved product IDs, descriptions, prices, images, sizes, and colors.
- Confirmed shipping, tax, returns, privacy, and terms information.
- Customer support details, store locations, social links, and mailing-list service if those features are wanted.
