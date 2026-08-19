# Lakshya's Cybernetic Portfolio

A premium, engineering-focused developer portfolio featuring an interactive dashboard interface, a simulated local AI Twin chatbot assistant, and high-fidelity retro-cybernetic HUD visual aesthetics. Built with React, Vite, and Tailwind CSS.

## Key Features

-   **Interactive Cybernetic Dashboard**: Fluid multi-tab views (Home, About, Projects, Contact) in a unified dashboard layout.
-   **Lakshya AI Twin (Mock Assistant)**: A lightweight, offline simulated chatbot running on a local keyword-matching database. Fully secure with zero external API key requirements.
-   **High-Fidelity Cyber Aesthetics**: Sheared industrial borders, vertical scanning CRT CRT effects, and hover text chromatic aberration glitch effects.
-   **Vercel SPA Routing Rewrite**: Configured router routing rules using `vercel.json` to handle hard page refreshes on sub-routes cleanly without 404 errors.

## Repository Structure

```
.
├── public/            # Static assets and vercel builds
│   └── vercel.json    # Public copy of routing configuration
├── src/
│   ├── components/
│   │   ├── AITwin.jsx    # Simulated AI chatbot drawer component
│   │   └── Sidebar.jsx   # Dashboard sidebar navigation
│   ├── pages/
│   │   ├── About.jsx     # Career summary, skills, and education history
│   │   ├── Contact.jsx   # Contact info and social connect interface
│   │   ├── Home.jsx      # Cyber-terminal welcome view with system simulator
│   │   └── Projects.jsx  # Interactive portfolio projects grid
│   ├── App.jsx           # Client-side router layout
│   ├── index.css         # Styling system and retro CRT animations
│   └── main.jsx          # React app entry point
├── index.html
├── package.json
├── vercel.json        # Root-level Vercel routing rules
└── vite.config.js     # Vite builder setup
```

## Local Development

### Prerequisites

-   Node.js 18+
-   npm, pnpm, or yarn

### Installation & Run

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Lakshyagupta23/portfolio-lakshya.git
    cd portfolio-lakshya
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start development server**:
    ```bash
    npm run dev
    ```

    The application will run locally at [http://localhost:5173](http://localhost:5173).

4.  **Build for production**:
    ```bash
    npm run build
    ```

## Deployment

Deploy directly to **Vercel** via Vercel CLI:

```bash
vercel --prod
```

The site is configured to serve the `dist` build folder using SPA fallback rewrite rules defined in `vercel.json`.

---
*Created by [Lakshya Gupta](https://github.com/Lakshyagupta23).*
