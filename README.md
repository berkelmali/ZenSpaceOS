# 🌌 ZenSpace OS — K-Protocol Edition

<div align="center">

![Version](https://img.shields.io/badge/Version-2.0.0-blue?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![AI](https://img.shields.io/badge/AI-Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)
![CSS3](https://img.shields.io/badge/Style-CSS3_Custom-1572B6?style=for-the-badge&logo=css3)
![Node](https://img.shields.io/badge/Server-Node.js_18+-339933?style=for-the-badge&logo=nodedotjs)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)

**A premium web-based Virtual Operating System for deep focus and elite productivity.**

### 🚀 [▶ Launch ZenSpace OS Live](https://zenspaceos.onrender.com)

</div>

---

## 📸 Preview

<img width="1896" height="891" alt="ZenSpace OS Desktop" src="https://github.com/user-attachments/assets/48b7d52e-fc8d-4178-8676-0f6ba218b285" />
<img width="1918" height="891" alt="ZenSpace OS AI Coach" src="https://github.com/user-attachments/assets/787c9dd9-cf07-4b50-a9b2-ed721db5811f" />

*Immersive ambient workspace with AI intelligence, draggable windows, real-time analytics, and cinematic backgrounds.*

---

## ✨ Features

### 🖥️ Core OS Engine
| Feature | Description |
|---|---|
| **Window Manager** | Custom JS-powered WM with drag, minimize, resize, and z-index layering |
| **Boot Sequence** | Animated startup with kernel initialization sequence |
| **Multi-User Auth** | Register/login system with `localStorage` persistence |
| **Cinema Mode** | Distraction-free fullscreen with one keypress |
| **Particle Canvas** | Ambient animated particle system in the background |
| **Desktop Clock** | Live clock & date widget, always visible |
| **Right-Click Menu** | Context menu for quick actions on the desktop |
| **Screensaver** | Auto-activates after 3 minutes of inactivity |
| **Spotlight Search** | `Ctrl+K` command palette — search apps, files, and commands |

### 🧠 AI & Intelligence
| Feature | Description |
|---|---|
| **Zen Coach** | Real-time AI chat powered by **Google Gemini 2.5 Flash** |
| **Productivity Analysis** | AI analyzes your Kanban + Timer data for personalized advice |
| **Live Weather** | Geolocation + Gemini Search grounding for real-time weather |
| **Retry Engine** | Exponential backoff handles API rate limits gracefully |

### ⚙️ Productivity Suite
| Feature | Description |
|---|---|
| **Pomodoro Timer** | SVG animated circular progress ring with color feedback |
| **Kanban Board** | Three-column task matrix (Todo → Doing → Done) with persistence |
| **Habit Tracker** | Daily habit tracking with 🔥 streak counters |
| **Stats Dashboard** | Sessions, focus minutes, and completion rate analytics |
| **Virtual File System** | `touch`, `nano`, `rm` commands create real desktop file icons |
| **Note Viewer** | Files open as draggable windows with content editing |

### 🎵 Ambient Studio
| Feature | Description |
|---|---|
| **4 Scenes** | Rain 🌧️ · Sea 🌊 · Forest 🌳 · Fire 🔥 — video + audio sync |
| **Volume Control** | Smooth slider with mute toggle |
| **Theme Picker** | 7 accent presets + custom color picker |

### 💻 Terminal Emulator
| Category | Commands |
|---|---|
| **System** | `help`, `whoami`, `neofetch`, `uptime`, `ls`, `date`, `clear`, `reboot`, `logout` |
| **Files** | `touch [name]`, `nano [name] "content"`, `rm [name]` |
| **Apps** | `open [app]`, `close [app]`, `focus [min]`, `task -a [text]` |
| **Tools** | `calc [expr]`, `dice [n]`, `quote`, `stats`, `export`, `coinflip` |
| **Config** | `lang [tr/en/ru]`, `scene [rain/sea/forest/fire]`, `weather [city?]` |
| **Easter Egg** | `matrix` — Interactive narrative simulation game |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + K` | Open Spotlight Search |
| `Space` | Start / Stop Focus Timer |
| `H` | Toggle Cinema Mode |
| `M` | Mute / Unmute Audio |
| `F` | Toggle Fullscreen |
| `Escape` | Close Spotlight / Context Menu |

---

## 🛠 Technical Architecture

### 1. K-Protocol — Robust AI Integration
Custom `retryFetch` with **exponential backoff** ensures the AI Coach stays responsive under API rate limits.

```javascript
async function retryFetch(url, options, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            const delay = Math.pow(2, i) * 1000; // 1s → 2s → 4s
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
```

### 2. Event-Driven Window Manager
Zero-dependency WM with stacking context, drag physics, and resize handles.

```javascript
WM: {
    resize: (e, id) => {
        const w = document.getElementById(id);
        const startW = w.offsetWidth, startH = w.offsetHeight;
        const move = (ev) => {
            w.style.width = Math.max(280, startW + ev.clientX - e.clientX) + 'px';
            w.style.height = Math.max(180, startH + ev.clientY - e.clientY) + 'px';
        };
        document.addEventListener('mousemove', move);
    }
}
```

### 3. SVG Progress Ring Animation
The Pomodoro timer uses a dynamic SVG circle with color-coded feedback.

```javascript
disp: () => {
    const progress = state.val / state.init;
    ring.style.strokeDashoffset = 464.96 * (1 - progress);
    ring.style.stroke = progress > 0.5 ? 'var(--accent)' : progress > 0.2 ? '#f59e0b' : '#ef4444';
}
```

### 4. Virtual File System
Simulates a Unix-like FS in `localStorage` with duplicate prevention and a 10-file limit.

### 5. Screensaver & Inactivity Detection
Canvas-based particle screensaver auto-activates after 3 minutes. Resets on any mouse/keyboard event.

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- A Google Gemini API Key ([get one here](https://aistudio.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/berkelmali/ZenSpaceOS.git
cd ZenSpaceOS

# Install dependencies
npm install

# Create environment file
echo "API_KEY=your_gemini_api_key_here" > .env

# Start the server
npm start
```

Then open `http://localhost:3000` in your browser.

> **Note:** Chrome or Edge recommended for full Web Audio API and Geolocation support.

### Environment Variables
| Variable | Description | Required |
|---|---|---|
| `API_KEY` | Google Gemini API Key | ✅ Yes |
| `PORT` | Server port (default: 3000) | ❌ Optional |

---

## 📁 Project Structure

```
ZenSpaceOS/
├── index.html      # Entire frontend — OS, CSS, and JS (single-file architecture)
├── server.js       # Express proxy server (protects API key)
├── assets/
│   ├── audio/      # Ambient audio loops (rain, sea, forest, fire)
│   └── video/      # Ambient video backgrounds
├── package.json
└── .env            # API key (not committed)
```

---

## 📜 Changelog

### v2.0.0 — K-Protocol Level Up
- ✅ **Spotlight Search** (`Ctrl+K`) — app/command/file palette
- ✅ **SVG Progress Ring** — animated circular Pomodoro timer
- ✅ **Stats Dashboard** — sessions, focus minutes, task completion analytics
- ✅ **Habit Tracker** — daily habits with 🔥 streak tracking
- ✅ **Desktop Clock** — live clock widget in the corner
- ✅ **Right-Click Context Menu** — quick actions on desktop
- ✅ **Window Resize** — drag corners to resize any window
- ✅ **Screensaver** — particle screensaver after 3min inactivity
- ✅ **Theme Picker** — 7 accent colors + custom color support
- ✅ **New Terminal Commands** — `calc`, `dice`, `quote`, `stats`, `export`, `uptime`
- ✅ **Improved `neofetch`** — detailed system info with uptime and theme
- ✅ **90-min Deep Work** timer preset added
- ✅ Updated to **Gemini 2.5 Flash** model

### v1.0.0 — Initial Release
- Core Window Manager, Pomodoro Timer, Kanban Board
- AI Coach (Gemini 1.5), Audio Studio, Terminal Emulator
- Multi-language support (EN / TR / RU)
- Matrix narrative easter egg

---

## ⚖️ License & Rights

> **⚠️ PROPRIETARY LICENSE — ALL RIGHTS RESERVED**

This software, its design, and associated source code are the exclusive property of **Berk Elmalı**.

- **No Commercial Use** — You may not use this code for commercial purposes without explicit written permission.
- **No Modification** — You may not modify, distribute, or create derivative works.
- **No Distribution** — You may not host this code on any public repository or server without authorization.

For permission requests, contact the author directly.

---

## 👨‍💻 Author

**Berk Elmalı** — Developed as a demonstration of advanced DOM manipulation, AI integration, and system architecture in Vanilla JavaScript.

*"Build tools that feel like the future."*
