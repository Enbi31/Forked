# Fork — Choice Range Reducer

NYC Hackathon 2026 — Eliminate decision fatigue by limiting options to exactly 3 choices.

## Project Structure

```
frontend/   - React 19 + Vite 8 + TypeScript (Tailwind v4, shadcn, Framer Motion)
  src/
    pages/
      home.tsx          - Product marketing homepage
      fork-app.tsx      - The fork tool (search → filters → comparison → select)
    components/
      landing/          - Navbar, HeroSection, HomeHero, HowItWorks, Footer
      fork/             - FilterBar, ProductCard, ComparisonGrid, SelectionModal
    lib/
      fork-data.ts      - Product types, dummy data, filter options
    App.tsx             - wouter routing (/ → marketing, /app → tool)
    main.tsx            - Entry point (Poppins Medium 500)
    index.css           - Tailwind v4 + shadcn + custom utilities (noise, glass, glow)
backend/    - python
app/
pycache
.env
ai_service.py - Groq api along with Buying link
connection.py
recommend.py
main.py
schema.py
```

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** bundler
- **Tailwind CSS v4** styling
- **Framer Motion** animations
- **wouter** routing
- **shadcn/ui** + **Base UI** primitives
- **Poppins Medium** (500) font
- **Lucide React** icons

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `localhost:5173` |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Routes

| Path | Page | Purpose |
|------|------|---------|
| `/` | Home | Product marketing landing page |
| `/app` | ForkApp | The choice range reducer tool |
