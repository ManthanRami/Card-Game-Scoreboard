
# Modern Scoreboard Hub

A modern, web-based scoreboard application designed to keep track of scores for popular card games like KachuFolio and Hearts. Built with Next.js, it offers a clean, responsive, and intuitive interface for a seamless game night experience.

![Scoreboard Hub Screenshot](https://placehold.co/800x450.png)
*A placeholder screenshot of the application.*

---

## ✨ Features

- **Dual Game Support**: Dedicated scoreboards for both **KachuFolio** and **Hearts**.
- **Flexible Game Setup**:
  - **KachuFolio**: Customizable number of players (2-10) and decks (1-3).
  - **Hearts**: Customizable number of players (3-5).
- **Intuitive Score Entry**: Easy-to-use interface for inputting bids, tricks taken, and round scores.
- **Real-time Score Calculation**: Automatic calculation of round and total scores based on game rules.
- **Player Management**: Easily add, remove, and reorder players during the initial game setup.
- **AI-Powered Advice**: Get strategic tips from an AI coach in KachuFolio to improve your gameplay, powered by Google AI and Genkit.
- **Visualizations**: A "Race to Victory" chart in KachuFolio to visually track who's in the lead.
- **Persistent State**: Your game progress is automatically saved to your browser's local storage, so you can pick up where you left off.
- **Dark/Light Mode**: A theme toggle for comfortable viewing in any lighting condition.
- **Responsive Design**: Works beautifully on both desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Google AI](https://ai.google/) & [Genkit](https://firebase.google.com/docs/genkit)
- **State Management**: React Hooks (`useState`, `useCallback`, `useMemo`)

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) (or your package manager of choice)

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root of the project and add your Google AI API key. This is required for the "AI Coach" feature in KachuFolio.
    ```
    GOOGLE_API_KEY="YOUR_API_KEY_HERE"
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

---

## 📂 Project Structure

Here is a brief overview of the project's directory structure:

```
src
├── app/                # Next.js App Router pages and layouts
│   ├── kachufolio/     # KachuFolio game page
│   └── hearts/         # Hearts game page
├── components/         # Reusable React components
│   ├── ui/             # ShadCN UI components
│   ├── kachufolio/     # Components specific to KachuFolio
│   └── hearts/         # Components specific to Hearts
├── hooks/              # Custom React hooks
│   ├── use-kachufolio-game.ts # Core logic for the KachuFolio game
│   └── use-hearts-game.ts     # Core logic for the Hearts game
├── lib/                # Core definitions, types, and utility functions
│   └── kachufolio.ts   # Game rules, types, and round generation
└── ai/                 # Genkit flows and AI-related code
    └── flows/          # AI flows, e.g., the AI coach
```

---

This project was built inside Firebase Studio.
