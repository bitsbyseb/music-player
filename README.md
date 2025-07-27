# 🎵 Music Player

A simple, customizable desktop music player built with **Electron** and **Node.js**. Designed to scan your local music folder, extract metadata, and play your songs directly from a clean user interface.

---

## 🚀 Features

- Scan and list `.mp3` files from a local `songs/` folder
- Play, pause, and navigate songs
- Extract cover art and metadata from each audio file
- Secure communication between frontend and backend (Electron IPC)
- Basic user interface built with HTML, CSS, and JavaScript
- Modular and beginner-friendly code structure

---

## 📁 Project Structure

```

music-player/
├── src/
│   └── static/            # Frontend HTML, CSS, JS
├── songs/                 # Folder for your .mp3 music files
├── covers/                # (Optional) Extracted cover images
├── main.js                # Main Electron process
├── preload.js             # Secure bridge for IPC communication
├── package.json
└── README.md

````

---

## 🛠️ Requirements

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Electron](https://www.electronjs.org/)

---

## 📦 Installation

```bash
git clone https://github.com/bitsbyseb/music-player.git
cd music-player
npm install
````

---

## ▶️ Usage

```bash
npm start
```

Make sure to place your `.mp3` files inside the `songs/` directory.

---

## ⚠️ Disclaimer

This project is for educational and personal use only. Please respect copyright laws when using music files.

---

## 💡 Future Ideas

* Add playlist support
* Show lyrics or synchronized `.lrc` files
* Integrate an audio visualizer
* Drag & drop music support
* Custom themes (light/dark mode)

---

## 🧠 Author

Developed with care by [bitsbyseb](https://github.com/bitsbyseb)
