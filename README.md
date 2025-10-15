# Prysm Stock Dashboard

A responsive stock analysis dashboard built with Next.js 14, TypeScript, and Tailwind CSS featuring real-time data visualization and technical analysis.

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+
- Financial Modeling Prep API key ([Get free key](https://financialmodelingprep.com/))

### Installation
```bash
git clone https://github.com/Saketh-Reddy-Bejadi/prysm_frontend_task.git
cd prysm_frontend_task
npm install
```

### Environment Setup
Create `.env.local`:
```env
NEXT_PUBLIC_FMP_API_KEY=your_api_key_here
NEXT_PUBLIC_DEFAULT_SYMBOL=AAPL
```

### Run
```bash
npm run dev  # Development server at http://localhost:3000
npm run build && npm start  # Production build
```

## 🏗️ Design & Implementation

### Tech Stack
- **Next.js 14** - App Router for modern React patterns and optimizations
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling with responsive design
- **Recharts** - Interactive data visualization
- **Lucide React** - Consistent iconography

### Key Features
- **Fully Responsive** - Mobile-first design with adaptive layouts
- **Real-time Data** - Financial Modeling Prep API integration
- **Interactive Charts** - Multiple timeframes with custom tooltips
- **Technical Analysis** - RSI, moving averages, custom Prysm scoring
- **Modern UI** - Clean design with smooth animations and transitions

### Architecture Decisions
- **Component Structure** - Modular, reusable components with clear separation
- **Data Flow** - Environment-based configuration with TypeScript interfaces
- **Performance** - Client-side rendering only where needed, optimized images
- **Responsive Strategy** - Mobile (< 640px), Tablet (640-1024px), Desktop (> 1024px)
- **Styling** - Utility classes with custom responsive utilities for consistency

