# 🎭 Joke Studio

A modern joke-fetching single-page application built with React and Vite, featuring a polished UI, smooth animations, and advanced user functionality.

🌐 **Live Demo:** [https://joke-studio.netlify.app/](https://joke-studio.netlify.app/)

---

## Features

### Core Functionality

* Random jokes from the icanhazdadjoke API
* Search with debounced input and loading states
* Favorites management with localStorage
* History of recently viewed jokes
* Automatic cross-tab sync

### User Experience

* Light/Dark/System themes with transitions
* Keyboard shortcuts: `N` (next), `F` (favorite), `S` (speak), `/` (search), `Escape` (close modal)
* Auto-refresh with tab visibility detection
* Responsive design for all screen sizes

### Sharing & Actions

* Copy to clipboard
* Text-to-speech
* Download jokes as text
* Share on Twitter and WhatsApp
* Toast notifications for user feedback

### Technical Details

* React 19 + Vite
* Tailwind CSS v4
* JavaScript only (no TypeScript)
* Bun package manager
* Modular, reusable component architecture
* Unit testing using Vitest + React Testing Library

---

## Screenshots

### Dashboard
<p align="center">
  <img src="/public/first.png" alt="Dashboard Page 01" width="600"/>
</p>

### Web Page
<p align="center">
  <img src="/public/second.png" alt="Dashboard Page 02" width="600"/>
</p>

---

## Quick Start

### Requirements

* Node.js 18+
* Bun package manager installed

### Installation

```bash
git clone https://github.com/your-username/joke-studio.git
cd joke-studio
bun install
```

### Start Development

```bash
bun run dev
```

Open: `http://localhost:5173`

---

## Available Scripts

```bash
bun run dev           # Start development server
bun run preview       # Preview production build
bun run build         # Create production build

bun run test          # Run tests (watch)
bun run test:run      # Run tests once
bun run test:ui       # Test UI interface
bun run test:coverage # Coverage report

bun run lint          # ESLint
bun run format        # Prettier formatting
```

---

## Project Structure

```
src/
  components/
    Button.jsx
    Card.jsx
    SearchInput.jsx
    Switch.jsx
    Toast.jsx
    Modal.jsx
    Loader.jsx
    Confetti.jsx
    Header.jsx
    JokeCard.jsx
    SearchPanel.jsx
    HistoryPanel.jsx
    RecentJokes.jsx
    FavoritesModal.jsx

  hooks/
    useJokeApi.js
    useLocalStorage.js
    useTheme.js
    useDebounce.js
    useKeyboardShortcuts.js
    useAutoRefresh.js

  test/
    setup.js

  App.jsx
  main.jsx
  index.css
```

---

## Docker

### Build the Image

```bash
docker build -t jokestudio .
```

### Run the Container

```bash
docker run -p 3000:80 jokestudio
```

Open: `http://localhost:3000`

### Using Docker Compose (Optional)

```bash
docker compose up --build
```

---

## Testing

Includes:

* Unit tests
* Component tests
* Integration tests

Run tests:

```bash
bun run test
```

---

## Customization

**Theme Colors (`index.css`):**

```css
@theme {
  --color-joke-purple: #7c3aed;
  --color-joke-pink:   #ec4899;
  --color-joke-blue:   #3b82f6;
}
```

**API Config (`useJokeApi.js`):**

```javascript
const API_BASE = 'https://icanhazdadjoke.com';
```

---

## Development Notes

* ESLint and Prettier enabled
* Follows React Hook rules
* WCAG AA-friendly accessibility
* Optimized builds and code-splitting by default

---

## Deployment

### Static Hosting (Netlify, Vercel, etc.)

```bash
bun run build
```

Deploy the `dist/` folder to any static hosting platform. No environment variables required.

### Docker Deployment

```bash
docker build -t jokestudio .
docker run -p 3000:80 jokestudio
```

---

## Contributing

Pull requests are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## Acknowledgments

* [icanhazdadjoke.com](https://icanhazdadjoke.com) — public joke API
* React, Vite, Tailwind CSS, Bun

---

## License

MIT