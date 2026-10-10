# WELL ICON implementation checklist

## Repository audit

- [x] Confirm static HTML/CSS/vanilla JavaScript architecture and GitHub Pages target.
- [x] Inventory current pages, local imagery, product data, cart, wishlist, search, and responsive styles.
- [x] Identify existing but incomplete controls and missing business configuration.
- [x] Keep unrelated browser-profile files under `scratch/` untouched.

## Build and verification phases

- [x] Shared design tokens and accessible reusable UI patterns.
- [x] Homepage routes and calls to action.
- [x] Men and Women collections and relevant accessory collections.
- [x] Central catalogue data, real collection filtering, sorting, and empty states.
- [x] Product details, gallery, variant/size selection, quantity, Add to Cart, and Buy Now.
- [x] Persistent cart, quantity validation, line totals, and subtotal.
- [x] Order review, copyable summary, and configurable Google Form handoff.
- [x] Wishlist, search, navigation, newsletter, and remaining optional controls.
- [x] Responsive layout check at 320, 375, 430, 600, 768, 1024, 1280, 1440, and 1920 px; verify keyboard and screen-reader behavior manually before launch.
- [x] Functional, link, asset, and deployment-path checks; fix discovered defects.

## Verification performed

- JavaScript syntax checks passed for the shared catalogue/cart code and collection, order, and site-info scripts.
- Static path audit passed across all 10 HTML pages: no missing local paths or duplicate IDs.
- Headless Chrome confirmed Add to Bag changes immediately to Go to Cart on first click on home, Men, Women, Accessories, and product detail; the second click navigates to the cart.
- Headless Chrome confirmed Buy Now opens the order review draft and preserves the existing cart.
- Homepage has no horizontal overflow at the checked viewport widths above.
- Browser checks did not cover every individual product card, browser/device combinations, or complete screen-reader behavior.

## Business inputs still needed

- A real Google Form URL and verified prefill field IDs (if prefilled submissions are desired).
- Confirmed product catalogue, prices, available sizes/colors, and approved product images.
- Real contact, policy, and social destinations for any links the client wants to publish.

Until supplied, catalogue values are development samples. The site must not claim that opening a form submits an order.
