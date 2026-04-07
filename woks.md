# ⚡ NanoTask: Work Plan

This document serves as the technical and design blueprint for **NanoTask**, a high-performance, minimalist task manager built on the MERN stack.

## 🏗️ Technical Stack
- **Frontend:** React.js (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (via Mongoose)
- **State Management:** Zustand (keeping it "Nano")
- **Animations:** Framer Motion (for punchy, brutalist transitions)
- **Icons:** Lucide React

## 🎨 Design Direction: Bento Brutalism
The UI merges the structured efficiency of **Bento Grids** with the raw, high-contrast energy of **Neo-Brutalism**.

### Design Principles:
*   **Bento Layout:** Adaptive grid tiles of varying sizes to categorize tasks (e.g., Today, Upcoming, Stats).
*   **Brutalist Accents:** 
    *   Thick `4px` solid black borders (`border-4 border-black`).
    *   Hard, non-blurred shadows (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`).
    *   Bold, oversized typography (Space Grotesk or Inter).
*   **Color Palette:** High-saturation accents (Cyber Green, Electric Purple) on a stark background.

## 🚀 Core Features
- **Rapid Entry:** A "Hero" bento tile for instant task creation.
- **Dynamic Grid:** Tasks that expand/contract based on priority or content length.
- **Micro-Interactions:** Haptic-style animations when checking off tasks or deleting blocks.
- **Filter Tiles:** Bento-style sidebar or top bar to filter by status (All, Active, Done).

## 🛠️ Implementation Roadmap

### Phase 1: Foundation (Backend)
- [ ] Initialize Express server with MongoDB connection.
- [ ] Define Task Schema (title, description, status, priority, category).
- [ ] Create CRUD API endpoints.

### Phase 2: Shell (Frontend)
- [ ] Set up Vite + Tailwind with a custom Brutalist configuration.
- [ ] Build the main **Bento-Grid** layout shell.
- [ ] Implement global state using Zustand.

### Phase 3: Integration
- [ ] Connect Frontend components to Backend API.
- [ ] Implement "Optimistic Updates" for a snappier feel.

### Phase 4: Polish & Deployment
- [ ] Add Framer Motion "Pop" animations for task completion.
- [ ] Finalize responsive design (Mobile-first Bento).
- [ ] Deploy to Vercel (Frontend) and Render/Fly.io (Backend).

---
*Created by the NanoTask Team.*
