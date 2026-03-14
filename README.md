# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Project Description
InvoicePro NG is a modern, mobile-first invoice management web application designed for small businesses in Nigeria. It provides a complete solution for managing invoices, customers, and business information with an intuitive interface and local data persistence. The application uses Nigerian Naira (NGN) as the default currency and is built using cutting-edge web technologies for a seamless user experience.

## Key Features
- Dashboard analytics: real-time business metrics
- Invoice management: create, track, mark as paid, delete, search, filter, view details
- PDF export: professional invoices with business/customer info, line items, tax, payment terms
- Customer management: add/edit/delete/search customers, view metrics
- Business settings: configure company info, persists across sessions
- Data persistence: browser localStorage
- Mobile-responsive design: bottom navigation, touch-friendly
- Notifications: toast feedback (Sonner)

## Main Pages/Components
- Dashboard: business metrics, recent invoices, quick actions
- Invoice List: manage/search/filter/status/PDF/delete
- Create Invoice: dynamic form, tax, inline customer creation
- Customer List: manage/search/edit/delete customers
- Settings: business info configuration
- Header: sticky navigation
- BottomNav: mobile navigation
- 40+ Shadcn/UI components: buttons, cards, dialogs, forms, etc.

## Technologies Used
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- Tailwind CSS 3.4.19 (shadcn/ui theme)
- Radix UI, Lucide React, tailwindcss-animate
- React Hook Form, Zod, @hookform/resolvers
- jsPDF, html2canvas
- date-fns, Sonner, recharts, next-themes, vaul, react-resizable-panels, embla-carousel-react, cmdk, class-variance-authority, clsx
- ESLint, PostCSS, Autoprefixer

## Setup Instructions
### Prerequisites
- Node.js 20+
- npm or yarn

### Installation
```bash
# Clone the repository
cd invoicepro

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Configuration Files
- vite.config.ts
- tsconfig.json
- tailwind.config.js
- eslint.config.js
- postcss.config.js

## Usage Instructions
- Launch app via dev server or build
- Configure business info in Settings
- Create invoices: add customer, line items, tax, payment terms, notes
- Manage invoices: search/filter/status/PDF/delete
- Manage customers: add/edit/delete/search, view stats
- Download PDF invoices

## Special Notes & Caveats
- Data stored in browser localStorage (not synced)
- Default currency: NGN
- Mobile-first design
- Client-side only, no backend
- PDF generation uses html2canvas (CSS limitations)
- Invoice numbers: INV-YYYY-XXXX (random)
- Status: paid/unpaid/overdue (manual)
- TypeScript strict types, Zod validation
- Requires modern browser
- Efficient searching/filtering, useMemo

## Future Enhancements
- Cloud sync
- Automatic overdue calculation
- Payment tracking
- Recurring invoices
- Templates
- Multi-currency
- Exchange rates
- Reports/analytics
- Invoice sequences
- Multi-user/auth
- Dark mode
- Email delivery
- Expense tracking
- Tax reports

---
This README summarizes InvoicePro NG's features, architecture, setup, and usage for developers and users.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
