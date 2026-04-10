# Focus Hours Tracker

A minimal, offline-first Progressive Web App (PWA) to track and analyze deep focus time.

This is a personal productivity tool designed to measure **actual hours focused**, not enforce rigid Pomodoro cycles.

---

## 🎯 Project Goal

To build a clean, distraction-free focus tracking tool that:

- Encourages intentional deep work
- Tracks real focused time
- Provides visual analytics (heatmap + trends)
- Works fully offline
- Can later be converted into a browser extension if needed

---

## 🚀 Core Features

### ⏱ Focus Session

- Select focus duration before starting
  - Default: **30 minutes**
  - Options: 25 / 30 / 45 / 60 minutes
  - Custom duration (optional future enhancement)
- Countdown timer
- Start / Stop session manually
- Early stop allowed
- Saves **actual focused time** (not planned time)

---

### 🔄 Flexible Usage

- No break enforcement
- No blocking behavior
- User can:
  - Close tab
  - Refresh page
  - Leave browser
- Active session auto-resumes on reload
- If time completes while away → session auto-saved

---

### 💾 Local Storage (No Backend)

- All data stored in browser using `localStorage`
- No database
- No authentication
- No internet required
- Fully offline functionality

---

### 📊 Analytics Dashboard

- Today's total focus time
- Weekly total focus time
- Monthly overview (optional)
- Daily average focus time
- Streak counter (based on daily minimum threshold)

---

### 🔥 Focus Heatmap

- GitHub-style contribution grid
- Color intensity based on total minutes focused per day
- Visualizes:
  - Consistency
  - Productivity patterns
  - High-performance days

---

### 📦 Progressive Web App (PWA)

- Installable on desktop
- Runs in standalone window
- Works offline
- Fast loading via caching
- App icon support

---

## 🧠 Design Philosophy

- Minimal interface
- No gamification pressure
- No punishment mechanics
- Self-accountability driven
- Built for long-term personal use

---

## 🛠 Tech Stack

- React
- MUI (Material UI)
- LocalStorage for persistence
- PWA (Service Worker + Web Manifest)

No backend. No database.

---

## 📌 Future Enhancements (Optional)

- Custom duration input
- Data export (JSON)
- Import backup
- Yearly analytics view
- Goal setting (e.g., 4 hours/day)
- Chrome extension wrapper

---

## 🏗 Project Status

Initial version under development.

---

## 📜 License

To be decided.
