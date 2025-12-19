# 🌌 ZenSpace OS | K-Protocol Edition

![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini%201.5-4285F4?style=flat&logo=google&logoColor=white)
![CSS3](https://img.shields.io/badge/Style-CSS3-1572B6?style=flat&logo=css3)
![License](https://img.shields.io/badge/License-Proprietary-red)

A premium, web-based **Virtual Operating System** designed for deep focus and productivity. ZenSpace OS integrates a custom Window Manager (WM), a file system simulation, and a powerful AI Coach powered by **Google Gemini 1.5 Pro**, all within a highly optimized architecture.

### 🚀 [Try it Online: Launch ZenSpace OS](https://zenspaceos.onrender.com)

## 📸 Preview

<img width="1896" height="891" alt="image" src="https://github.com/user-attachments/assets/48b7d52e-fc8d-4178-8676-0f6ba218b285" />
<img width="1918" height="891" alt="image" src="https://github.com/user-attachments/assets/787c9dd9-cf07-4b50-a9b2-ed721db5811f" />



*(An immersive workspace featuring ambient backgrounds, draggable windows, and real-time AI integration)*

## 🌟 Key Features

* **🧠 AI Coach (K-Protocol):** A real-time chat assistant integrated with **Google Gemini 1.5 Pro**. It analyzes your productivity stats (Kanban tasks, Timer sessions) to provide context-aware, actionable advice.
* **💻 Custom Window Manager:** A lightweight WM built entirely from scratch in **Vanilla JavaScript**. It handles window dragging, minimizing, maximizing, and complex `z-index` layering logic without external libraries.
* **🖥️ Terminal Emulator:** A fully functional Command Line Interface (CLI) supporting file operations (`touch`, `nano`, `rm`), system commands (`weather`), and hidden narrative easter eggs (Matrix rain).
* **🌍 Geolocation & Weather:** Uses the browser's Geolocation API combined with Gemini's grounding capabilities to fetch and display real-time weather conditions for your exact location.
* **🎵 Ambient Studio:** A built-in mixer for high-quality background audio and video loops (Rain, Forest, Sea, Fire) designed to induce flow states.
* **⏱️ Focus Suite:** Integrated Pomodoro Timer and Kanban Board with persistence via `localStorage`.

## 🛠 Technical Implementation

### 1. K-Protocol (Robust AI Integration)
The system utilizes a custom `retryFetch` mechanism with **exponential backoff**. This ensures the AI Coach remains responsive even when facing API rate limits (HTTP 429), providing a seamless user experience.

```javascript
// Dynamic AI Query Handling with Exponential Backoff
async function retryFetch(url, options, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            // Delays: 1s, 2s, 4s...
            const delay = Math.pow(2, i) * 1000; 
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
```
### 2. Virtual File System Logic
Simulates a Unix-like file system in the browser's localStorage. It includes validation logic to prevent data corruption or duplicate filenames.
```javascript
// File creation logic with duplicate prevention
add: (title, content) => {
    const d = ZenOS.DB.get();
    const userNotes = d[ZenOS.state.user].notes;

    // Prevention of duplicate filenames
    if (userNotes.some(n => n.title === title)) {
        ZenOS.Apps.Terminal.print(`Error: File ${title}.txt already exists.`, 'error');
        return false;
    }
    // ... saving logic
}
```
### 3. Event-Driven Window Manager
Instead of relying on CSS frameworks, the OS uses a custom JavaScript engine to manage the DOM state, focus events, and drag physics.
```javascript
WM: {
    focus: (id) => {
        ZenOS.state.zIndex++; // Bring to front
        const el = document.getElementById(id);
        if(el) { 
            el.style.zIndex = ZenOS.state.zIndex; 
            el.classList.add('active'); 
        }
    },
    drag: (e, id) => { /* Custom drag physics logic */ }
}
```
### ⚖️ License & Rights
⚠️ PROPRIETARY LICENSE - ALL RIGHTS RESERVED

This software, its design, and its associated source code are the exclusive property of Berk Elmalı.
No Commercial Use: You may not use this source code for commercial purposes without explicit written permission from the author.
No Modification: You may not modify, distribute, or create derivative works based on this project.
No Distribution: You may not host this code on any public repository or server without authorization.
For permission requests, please contact the author directly.
### 🚀 How to Run Locally
Clone this repository.
Open index.html in any modern web browser (Chrome or Edge recommended)
Note: For the AI Coach and Weather features to function locally, you must insert your own valid API_KEY into the source code configuration.
### 👨‍💻 Author Berk Elmalı
Developed as a demonstration of Advanced DOM Manipulation, API Integration, and System Architecture in Vanilla JavaScript.
