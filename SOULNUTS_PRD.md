# Soulnuts — Full Website Build Plan (PRD for Antigravity)

**Client:** Soulnuts (@soln_uts) — Premium dry fruits, nuts, seeds & home-made ladoos
**Goal:** Real, deployable e-commerce site. No user login/signup. Orders confirmed via WhatsApp.
**Reference:** Design direction already approved via demo (`soulnuts-demo.html`) — same palette, fonts, tone.

---

## 1. Why "no authentication"

Soulnuts doesn't need accounts to sell. The flow is:
`Browse → Add to Bag → Checkout button → WhatsApp opens with order pre-filled → Owner confirms payment/delivery manually`

This is how the client already operates (WhatsApp number on every IG post). No login = no signup friction, no password resets, no auth backend to maintain. Cart lives in browser state only (React context + localStorage on a *real* domain — this restriction only applied inside the Claude artifact sandbox, not on Antigravity/Vercel).

If Tejas wants online payment later (Razorpay), that's a phase-2 add-on and still doesn't require accounts — Razorpay checkout is guest checkout by design.

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React + Vite | Fast, matches his existing stack |
| Styling | Tailwind CSS | Speed, but override defaults with custom design tokens (see §4) so it doesn't look templated |
| Animations | Framer Motion (or GSAP if he wants scroll-triggered wheel/marquee) | Matches "premium luxury" brief |
| Routing | React Router | Multi-page feel (Home, Shop, Ladoos, Product Detail, Contact) |
| Data | Static `products.json` (or Firebase Firestore, read-only, no auth rules needed) | No backend needed for v1; Firestore only if he wants to edit products without redeploying |
| Forms | EmailJS (newsletter / contact form) | Already in his stack |
| Cart | React Context + `localStorage` | Persists cart across refresh, zero backend |
| Checkout | `wa.me` deep link with prefilled order summary | Matches real client behavior |
| Hosting | Vercel (free, lifetime — his usual differentiator) | Fast, free SSL, custom domain ready |
| Domain | soulnuts.food (per their teaser posts) | Already teased publicly, use it |

---

## 3. Site Map

```
/                    Home (hero, promise strip, categories, best sellers, ladoos, testimonials, newsletter)
/shop                Full product catalog with filters (category, price)
/shop/:slug          Product detail page (images, description, weight options, add to bag)
/ladoos              Ladoos spotlight page (story + order)
/about               Brand story / sourcing story
/contact             WhatsApp, Instagram, location, contact form
(cart is a slide-in drawer, not a route — matches demo)
```

Keep it to 5 real routes. Don't over-build for v1.

---

## 4. Design Tokens (carry over from approved demo)

```
Colors:
  --ink:      #12241a   (text, dark sections)
  --pine:     #1f3b2c   (primary dark surface)
  --ivory:    #f8f3e6   (primary light bg)
  --gold:     #c6a15b   (accent, borders, highlights)
  --rust:     #a6541e   (CTA / primary action color)
  --sage:     #7e8f60   (tertiary accent — seeds/pistachio)

Fonts:
  Display: 'Fraunces' (italic for emotional headlines)
  Body:    'Manrope'
  Labels/Prices: 'Space Mono' (small caps, boutique grocer feel)

Signature element: rotating "wheel" of nut/seed chips around tree emblem (hero)
Product visual system: CSS-built "pouch" cards (gradient + scattered grain dots) — 
  swap for real product photography once client sends clean shots, same card shape.
```

Do not let Antigravity default to generic Tailwind blue/indigo — paste these tokens into `tailwind.config.js` `theme.extend.colors` first thing.

---

## 5. Data Model — `products.json`

```json
{
  "id": "almonds-californian",
  "name": "Californian Almonds",
  "category": "nuts",        // nuts | seeds | ladoos
  "price": 299,
  "unit": "250g",
  "description": "Crunchy, protein-rich almonds — daily-habit ready.",
  "images": ["/images/almonds-1.jpg"],
  "colorKey": "almond",      // maps to CSS palette for placeholder art
  "inStock": true,
  "weightOptions": [
    {"label": "250g", "price": 299},
    {"label": "500g", "price": 549}
  ]
}
```

Store all products in `/src/data/products.json`. This is the single source of truth — no CMS needed for v1. If he later wants the client to self-edit, swap this file for a Firestore read (still no auth needed, just open read rules on a products collection).

---

## 6. Component Breakdown

```
src/
  components/
    Nav.jsx                 sticky header, cart icon+count, mobile menu
    Hero.jsx                headline, CTAs, rotating wheel
    PromiseStrip.jsx        4-icon trust row
    CategoryGrid.jsx        4 category cards
    ProductGrid.jsx         filterable grid, used on Home + /shop
    ProductCard.jsx         pouch visual + add-to-bag
    LadooSpotlight.jsx      dark section, ladoo art + copy
    PouchPackBanner.jsx     30-day pack CTA
    Testimonials.jsx
    Newsletter.jsx          EmailJS form
    Footer.jsx
    CartDrawer.jsx          slide-in, qty controls, WhatsApp checkout button
    Toast.jsx                "added to bag" feedback
  pages/
    Home.jsx
    Shop.jsx
    ProductDetail.jsx
    Ladoos.jsx
    About.jsx
    Contact.jsx
  context/
    CartContext.jsx         cart state + localStorage sync
  data/
    products.json
  lib/
    whatsapp.js              builds wa.me links from cart state
  App.jsx
  main.jsx
```

---

## 7. Key Features Checklist

- [ ] Responsive nav with mobile hamburger drawer
- [ ] Hero with rotating wheel animation (pause on hover, respects `prefers-reduced-motion`)
- [ ] Category grid linking to filtered `/shop` views
- [ ] Product grid with category filter tabs (All / Nuts / Seeds & Blends / Ladoos)
- [ ] Product detail page: weight/qty selector, add to bag, related products
- [ ] Cart drawer: qty +/-, remove, subtotal, persists via localStorage
- [ ] **WhatsApp checkout**: `https://wa.me/918310440354?text=<encoded order summary>`
- [ ] Newsletter signup via EmailJS (or simple mailto fallback)
- [ ] Testimonials section
- [ ] SEO basics: meta title/description per page, OG tags, favicon (tree emblem)
- [ ] Scroll-reveal animations on section entry
- [ ] Lighthouse pass: images lazy-loaded, fonts preloaded, no layout shift

---

## 8. What's explicitly OUT of scope for v1

- User accounts / login / signup
- Online payment gateway (Razorpay) — phase 2 if client wants it
- Admin dashboard — client edits `products.json` via Tejas, or a future Firestore read
- Order tracking / order history — WhatsApp thread *is* the order history for now
- Multi-currency / multi-language

---

## 9. Build Order (phases)

1. **Scaffold**: Vite + React + Tailwind, drop in design tokens, fonts
2. **Static shell**: Nav, Footer, Hero (no animation yet) — get layout right first
3. **Data + Product Grid**: wire `products.json`, build ProductCard, filters
4. **Cart**: CartContext, CartDrawer, localStorage persistence
5. **WhatsApp checkout**: `lib/whatsapp.js`, wire to CartDrawer
6. **Remaining sections**: Categories, Ladoos, Pouch Pack, Testimonials, Newsletter
7. **Pages**: Shop, ProductDetail, Ladoos, About, Contact routes
8. **Polish**: animations (wheel, marquee, scroll reveal), responsive QA, SEO meta
9. **Deploy**: Vercel + connect soulnuts.food domain

---

## 10. Master Prompt for Antigravity (paste this in first)

```
Build a React + Vite + Tailwind e-commerce site for "Soulnuts", a premium dry
fruits, nuts, seeds and home-made ladoos brand. No user authentication —
cart is local state persisted to localStorage, checkout is a WhatsApp deep
link (wa.me) with the order pre-filled, not a payment gateway.

Use this palette in tailwind.config.js: ink #12241a, pine #1f3b2c,
ivory #f8f3e6, gold #c6a15b, rust #a6541e, sage #7e8f60.
Fonts: Fraunces (display, italic for emotional headlines), Manrope (body),
Space Mono (prices/labels).

Site map: Home, /shop (filterable grid), /shop/:slug (product detail),
/ladoos, /about, /contact. Cart is a slide-in drawer, not a route.

Follow the attached PRD (SOULNUTS_PRD.md) for component breakdown, data
model, and feature checklist. Build in the phase order listed in section 9.
Start with the project scaffold and the static shell (Nav, Footer, Hero)
before wiring any data or state.
```

---

## 11. Notes for Tejas

- Reuse the exact hero copy, section copy and product data from the demo — client already saw and (presumably) liked it, don't reinvent tone mid-build.
- Once client sends real product photos, swap `ProductCard`'s CSS "pouch" background for `<img>` — keep the same rounded pouch shape/label overlay so the visual language doesn't break.
- Quote structure: this is a bigger build than his usual ₹10k/₹20k tier (multi-page, cart, product detail) — price it as a full e-commerce project, likely ₹25k–₹40k depending on whether Razorpay gets added.
