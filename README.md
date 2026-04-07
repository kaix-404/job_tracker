# 💼 AI Job Tracker

A modern job application tracker with AI-powered job description parsing and resume suggestions.

## 🚀 Features

* 📊 Kanban board to track applications
* 🔍 Search & filter applications
* 🤖 AI-powered job description parsing
* ✨ Resume bullet point generation
* 🌙 Modern dark UI

## 🛠 Tech Stack

* Frontend: React, Tailwind CSS, React Query
* Backend: Node.js, Express, MongoDB
* AI: OpenAI API

## ⚙️ Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in `/backend`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
OPENAI_API_KEY=your_key
```

## ⚠️ Note

AI features require valid OpenAI API credits.
If unavailable, fallback/mock responses can be used.

## 📌 Future Improvements

* Drag & drop Kanban
* Authentication UI
* Deployment (Render/Vercel)

---

Built with ❤️
