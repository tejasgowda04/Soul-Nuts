# Soulnuts — The Soulful Way to Snack

**Soulnuts** (@soln_uts) is a premium dry fruits, nuts, seeds, and home-made ladoos e-commerce web application. Built for clean snacking with zero authentication friction, orders are placed directly via pre-filled WhatsApp deep-links.

---

## ✨ Features

- **Zero-Friction Checkout**: No signup or passwords required. Customers browse, add items to their bag, and hit checkout to launch a pre-filled WhatsApp order.
- **Persistent Local Cart**: Cart state persists automatically across browser reloads via `localStorage`.
- **Custom Design Tokens**: Curated aesthetic using HSL-tailored colors (`ink`, `pine`, `ivory`, `gold`, `rust`, `sage`), custom CSS pouch graphics with grain patterns, and Google Fonts (`Fraunces`, `Manrope`, `Space Mono`).
- **Interactive Visuals**: Rotating nut/seed orbital wheel hero component (with pause-on-hover), infinite marquee text strip, and CSS radial-gradient ladoo spheres.
- **Product Weight Selector**: Multi-variant pricing options for 250g/500g pack sizes or box quantities.
- **Fully Responsive**: Mobile-first sliding drawer navigation and responsive product grids across all screen sizes.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API + LocalStorage
- **Animations**: Framer Motion & CSS Keyframes
- **Order Fulfillment**: WhatsApp Web / App API (`wa.me`)

---

## 📁 Project Structure

```text
SoulNuts/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx      # Slide-in cart panel
│   │   ├── CategoryGrid.jsx    # Organic category cards
│   │   ├── Footer.jsx          # Dark pine footer grid
│   │   ├── Hero.jsx            # Animated hero & rotating wheel
│   │   ├── Icons.jsx           # SVG icon collection
│   │   ├── LadooSpotlight.jsx  # Handmade ladoo spotlight section
│   │   ├── Nav.jsx             # Sticky frosted glass navigation
│   │   ├── Newsletter.jsx       # Email subscriber section
│   │   ├── PouchPackBanner.jsx # 30-Day pouch pack banner
│   │   ├── ProductCard.jsx     # CSS pouch card visual
│   │   ├── ProductGrid.jsx     # Filterable product grid
│   │   ├── PromiseStrip.jsx    # 4-trust-pillar band
│   │   ├── Testimonials.jsx   # Customer reviews
│   │   └── Toast.jsx           # Notification toast
│   ├── context/
│   │   └── CartContext.jsx     # React cart state & localStorage sync
│   ├── data/
│   │   └── products.json       # Product catalog & pricing data
│   ├── lib/
│   │   └── whatsapp.js         # WhatsApp deep-link builder & pouch helpers
│   ├── pages/
│   │   ├── About.jsx           # Sourcing & brand story
│   │   ├── Contact.jsx         # Contact cards & messaging form
│   │   ├── Home.jsx            # Main landing page
│   │   ├── Ladoos.jsx          # Ladoo category spotlight page
│   │   ├── ProductDetail.jsx   # Weight selector & product view
│   │   └── Shop.jsx            # Filterable full product catalog
│   ├── App.jsx                 # Routing & Layout wrapper
│   ├── index.css               # Global styles & Tailwind directives
│   └── main.jsx                # Application root entry
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tejasgowda04/Soul-Nuts.git
   cd Soul-Nuts
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📞 Business Details

- **Brand**: Soulnuts (@soln_uts)
- **Locations**: Mandya & Mysuru, Karnataka, India
- **WhatsApp Support**: [+91 83104 40354](https://wa.me/918310440354)
