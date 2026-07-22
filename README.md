# 🍴 Fork — Choice Range Reducer

> 🏆 **NYC Hackathon 2026** — Eliminate decision fatigue by letting AI narrow it down to **exactly 3 choices**. No more endless scrolling. No more analysis paralysis. Just pick.

---

## 🗂️ Project Structure

```
├── 🎨 frontend/          # React 19 + Vite 8 + TypeScript
│   └── src/
│       ├── 📄 pages/
│       │   ├── home.tsx          — 🏠 Marketing landing page
│       │   └── fork-app.tsx      — 🍴 The fork tool (search → filters → compare → select)
│       ├── ⚛️ components/
│       │   ├── landing/          — Navbar, HeroSection, HomeHero, HowItWorks, Footer
│       │   └── fork/             — FilterBar, ProductCard, ComparisonGrid, SelectionModal
│       ├── 🧠 lib/
│       │   ├── api.ts            — 🔌 API client for backend /recommend
│       │   ├── fork-data.ts      — 📦 Types, dummy data, filter options
│       │   └── mapper.ts         — 🔄 Maps API response → frontend Product model
│       ├── App.tsx               — 🛣️ wouter routing (/ → marketing, /app → tool)
│       ├── main.tsx              — 🚀 Entry point
│       └── index.css             — 🎨 Tailwind v4 + shadcn + custom utilities
└── ⚙️ backend/           # FastAPI (Python)
    └── app/
        ├── main.py               — 🏗️ FastAPI app with CORS
        ├── recommend.py          — 📨 POST /recommend endpoint
        ├── schema.py             — 📐 Pydantic models
        ├── ai_service.py         — 🤖 Groq AI client (Llama 3.3 70B)
        ├── prompt.py             — 🧾 System prompt for AI recs
        ├── connection.py         — 🔑 Env config via python-dotenv
        ├── .env.example          — 📋 Env template
        └── requirements.txt
```

---

## 🛠️ Tech Stack

### 🎨 Frontend

| Technology | Purpose |
|------------|---------|
| ⚛️ **React 19** + **TypeScript** | UI framework |
| ⚡ **Vite 8** | Bundler |
| 🎨 **Tailwind CSS v4** | Styling |
| 🌀 **Framer Motion** + **Lenis** | Smooth animations |
| 🛣️ **wouter** | Lightweight routing |
| 🧩 **shadcn/ui** + **Base UI** | UI primitives |
| 🔤 **Poppins** | Font |
| 🎯 **Lucide React** | Icons |

### ⚙️ Backend

| Technology | Purpose |
|------------|---------|
| 🐍 **Python 3.12+** | Runtime |
| ⚡ **FastAPI** | Web framework |
| 🤖 **Groq AI** (Llama 3.3 70B) | AI recommendations |
| ✅ **Pydantic v2** | Data validation |
| 🌐 **Uvicorn** | ASGI server |

---

## 🚀 Getting Started

### 📋 Prerequisites

- 🟢 **Node.js 20+**
- 🐍 **Python 3.12+**
- 🔑 A [Groq API key](https://console.groq.com)

### 🔧 Environment Setup

```bash
cp backend/app/.env.example backend/app/.env
# ✏️ Edit backend/app/.env and add your GROQ_API_KEY
```

### ⚙️ Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate    # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

> 🌐 API runs at **`http://localhost:8000`**

### 🎨 Frontend

```bash
cd frontend
npm install
npm run dev
```

> 🖥️ Dev server runs at **`http://localhost:5173`**

---

## 📡 API

### 🔌 Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| 🟢 POST | `/recommend` | Get 3 AI-powered product recommendations |
| 🟢 GET | `/` | Health check |

### 📤 POST /recommend

**📥 Request body:**
```json
{
  "category": "smartphone",
  "budget": 55000,
  "priority": "camera",
  "preference": "good battery life"
}
```

**📤 Response:**
```json
{
  "products": [
    {
      "name": "Example Phone Pro",
      "price": "~₹50,000",
      "reason": "Excellent camera and battery life within budget",
      "specs": ["50MP Main Camera", "5000mAh Battery", "8GB RAM"],
      "tradeoff": "No wireless charging",
      "category_tier": "balanced"
    }
  ]
}
```

> 💡 The three products are ranked: 💰 `budget` → ⚖️ `balanced` → 🚀 `powerhouse`

---

## 📜 Scripts

### 🎨 Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start dev server at `localhost:5173` |
| `npm run build` | 📦 Build for production |
| `npm run lint` | 🔍 Run ESLint |
| `npm run preview` | 👀 Preview production build |

### ⚙️ Backend

| Command | Description |
|---------|-------------|
| `uvicorn app.main:app --reload` | 🚀 Start dev server at `localhost:8000` |

---

## 🛣️ Routes

| Path | Page | Purpose |
|------|------|---------|
| `/` | 🏠 Home | Product marketing landing page |
| `/app` | 🍴 ForkApp | The choice range reducer tool |

---

<div align="center">
  <sub>Built with ❤️ by <strong>Team Axen</strong> for NYC Hackathon 2026</sub>
</div>
