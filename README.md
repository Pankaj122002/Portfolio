# Pankaj Pal - Full Stack Developer Portfolio

**[🔴 Live Demo: https://pankaj122002.github.io/Portfolio/ ]**

A highly interactive, modern, and visually stunning 3D developer portfolio built with React, GSAP, and Canvas. Designed to showcase projects, skills, and professional experience with a futuristic, "Apple-like" premium aesthetic.

## 🚀 Features
* **Interactive Cinematic Intro Experience**: A stunning pre-rendered sequence with 60fps canvas playback and fading audio transitioning seamlessly into the website content.
* **Scroll-Driven Hero Canvas**: An optimized, high-performance sequence of pre-rendered frames synced precisely to the user's scroll.
* **Persistent Ambient Background**: An animated, immersive CSS-based floating background that persists across scroll.
* **Smooth Animations**: High-performance scrolling and micro-animations powered by GSAP, ScrollTrigger, and Framer Motion.
* **Responsive Design**: Flawless layout on desktop, tablet, and mobile viewing using Tailwind CSS and CSS `clamp()`.
* **Dark Theme UI**: Premium aesthetic with deep blacks, dynamic glassmorphism cards, and sophisticated typography mixing Sans-Serif and elegant Serif fonts.
* **Contact Integration**: Form data is automatically formatted and redirected to WhatsApp or Email directly.
* **Cypress E2E Automation**: Rigorously tested end-to-end user flows including viewport adjustments and form validations.

## 💻 Tech Stack
* **Framework**: [React.js](https://react.dev/) (v18)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [GSAP](https://gsap.com/) (ScrollTrigger), [Framer Motion](https://www.framer.com/motion/)
* **Canvas Rendering**: Native HTML5 Canvas API (for 60fps image sequences)
* **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)
* **E2E Testing**: [Cypress](https://www.cypress.io/)

## 📂 Detailed Project Structure

```text
Portfolio/
├── cypress/                 # Cypress End-to-End Automation Testing
│   ├── e2e/
│   │   └── portfolio.cy.ts  # Main E2E test suite covering full user journey, UI checks, and email intercepts
│   ├── fixtures/            # Static data for Cypress
│   └── support/             # Cypress custom commands and configuration
├── public/                  # Static Assets served directly
│   ├── hero-frames/         # Pre-rendered 3D frames for the scroll-driven hero sequence (multiple resolutions)
│   ├── optimized-photos/    # High-quality optimized images for the cinematic intro sequence
│   ├── intro-music.mp3      # Audio file played during the Intro sequence
│   └── favicon.svg          # Website favicon
├── scripts/                 # Node.js Utilities for Asset Processing
│   ├── optimize-hero-frames.js # Script to resize and compress hero sequence images using sharp
│   └── optimize-images.js      # Script to optimize the intro sequence images
├── src/                     # Main Application Source Code
│   ├── components/          # Reusable UI Sections and Components
│   │   ├── Intro3D/
│   │   │   └── IntroExperience.tsx # High-performance canvas player for the pre-rendered cinematic intro
│   │   ├── AboutSection.tsx        # Typography-heavy biography and philosophy section
│   │   ├── ContactSection.tsx      # Contact form with direct WhatsApp and Email redirect formatting
│   │   ├── CustomCursor.tsx        # Interactive custom cursor (Desktop only)
│   │   ├── ExperienceSection.tsx   # Horizontal scrolling interactive career timeline
│   │   ├── FloatingBackground.tsx  # Ambient floating particle background replacing WebGL for performance
│   │   ├── Footer.tsx              # Page footer with social links
│   │   ├── HeroScrollCanvas.tsx    # Hardware-accelerated canvas that maps scrolling to the hero frame sequence
│   │   ├── HeroSection.tsx         # Landing view overlay containing dynamic text and social buttons
│   │   ├── Navigation.tsx          # Sticky top navigation bar with mobile hamburger menu
│   │   ├── ProjectsSection.tsx     # Showcase grid for featured projects with hover effects
│   │   ├── ServicesSection.tsx     # Display of offered technical services
│   │   ├── SkillsSection.tsx       # Categorized display of technical skills using grid layouts
│   │   ├── StatisticsSection.tsx   # GSAP-powered animated number counters for milestones
│   │   ├── TechStackMarquee.tsx    # Infinite scrolling marquee of technologies
│   │   └── TestimonialsSection.tsx # Client reviews displayed in animated tilt-cards
│   ├── hooks/               # Custom React Hooks
│   │   ├── useHeroSequence.ts      # Logic for preloading, LRU caching, and painting hero sequence frames
│   │   └── useScrollAnimations.ts  # Global GSAP ScrollTrigger configuration for scroll-reveal effects
│   ├── App.tsx              # Main entry point handling the sequence phases (Intro -> Main) and Lenis integration
│   ├── index.css            # Global CSS, Tailwind imports, custom utility classes, and GPU optimizations
│   ├── main.tsx             # React DOM rendering entry point
│   └── vite-env.d.ts        # Vite environment type definitions
├── cypress.config.ts        # Configuration file for Cypress E2E testing
├── eslint.config.js         # ESLint configuration for code quality
├── index.html               # Main HTML template
├── package.json             # Project metadata, dependencies, and NPM scripts
├── postcss.config.js        # PostCSS configuration for Tailwind CSS
├── tailwind.config.js       # Tailwind theme extensions, colors, and fonts configuration
└── vite.config.ts           # Vite bundler configuration including GitHub Pages base path
```

## 🛠️ Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Pankaj122002/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Run Cypress End-to-End Tests:**
   ```bash
   npx cypress open
   ```
   *(Or use `npx cypress run` for headless mode)*

## 🚀 Deployment

This project is fully deployed as a static site on **GitHub Pages**.

**How it's currently deployed:**
1. The `vite.config.ts` includes `base: '/Portfolio/'` to handle the GitHub Pages subdirectory routing.
2. An automated **GitHub Actions** workflow runs `npm run build` and publishes the `dist` folder directly to GitHub Pages on every push to the `main` branch.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
