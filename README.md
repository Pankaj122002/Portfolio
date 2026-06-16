# Pankaj Pal - Full Stack Developer Portfolio

A highly interactive, modern, and visually stunning 3D developer portfolio built with React, Three.js, and GSAP. Designed to showcase projects, skills, and professional experience with a futuristic, "Apple-like" premium aesthetic.

## 🚀 Features
* **Interactive 3D Intro Experience**: A stunning cinematic video introduction transitioning seamlessly into the website content.
* **Persistent 3D Background**: An animated, immersive Three.js star-field canvas that persists across scroll.
* **Smooth Animations**: High-performance scrolling and micro-animations powered by GSAP and Framer Motion.
* **Responsive Design**: Flawless layout on desktop, tablet, and mobile viewing using Tailwind CSS and CSS `clamp()`.
* **Dark Theme UI**: Premium aesthetic with deep blacks, dynamic glassmorphism cards, and sophisticated typography mixing Sans-Serif and elegant Serif fonts.
* **Backend Integration**: Fully working Contact Form synced with Supabase Backend-as-a-Service.

## 💻 Tech Stack
* **Framework**: [React.js](https://react.dev/) (v18)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **3D & Canvas**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
* **Animations**: [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/)
* **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)
* **Database / Backend**: [Supabase](https://supabase.com/)

## 📂 Project Structure
```text
src/
├── components/          # Reusable UI sections
│   ├── AboutSection.tsx # Typography-heavy bio section
│   ├── ContactSection.tsx # Supabase-integrated contact form
│   ├── ExperienceSection.tsx # Horizontal scrolling career timeline
│   ├── HeroSection.tsx  # Landing view
│   ├── Intro3D/         # Complex 3D cinematic canvas elements
│   ├── Navigation.tsx   # Top sticky navbar
│   ├── ProjectsSection.tsx # Project showcase grid
│   ├── SkillsSection.tsx # Categorized tech skills
│   └── ThreeBackground.tsx # Global persistent 3D canvas
├── hooks/               # Custom React hooks (useScrollProgress, etc.)
├── App.tsx              # Main application entry and phase manager
├── index.css            # Global CSS, utilities, and fonts
└── main.tsx             # React DOM rendering
```

## 🛠️ Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

This project can be fully deployed as a static site (e.g., GitHub Pages, Vercel, Netlify).

**Deploying to GitHub Pages:**
1. In `vite.config.ts`, add: `base: '/your-repo-name/'`
2. Run `npm run build`
3. Push your code to GitHub.
4. Set up a GitHub Actions workflow or push the `dist` folder to your `gh-pages` branch.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
