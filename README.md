# Axen

NYC hackathon project — a modern digital platform.

## Project Structure

```
frontend/   - React 19 + Vite 8 + TypeScript frontend
  src/
    pages/          - Route page components
    components/     - Reusable UI components
      landing/      - Landing page components (HeroSection, Navbar)
    App.tsx         - Root component with wouter routing
    main.tsx        - Entry point
backend/    - Backend API (coming soon)
```

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** for bundling
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **wouter** for routing
- **shadcn/ui** + **Base UI** for components
- **Lucide** for icons
- **Geist Variable** font

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
