# 🚀 AI-Powered Job Application Tracker

A full-stack job application tracker built using the MERN stack with TypeScript.
It helps users manage job applications, track progress through a Kanban board, and leverage AI to parse job descriptions and generate resume bullet points.

---

## ✨ Features

* 🔐 JWT-based authentication (Login/Register)
* 📊 Kanban-style job tracking dashboard
* 🧠 AI-powered job description parsing
* ✍️ AI-generated resume bullet suggestions
* 🎯 Drag-and-drop application status updates
* 🔍 Search applications by company or role
* 🌙 Modern dark-themed UI

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Query
* Framer Motion
* dnd-kit

### Backend

* Node.js + Express
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

### AI Integration

* OpenAI API

---

## ⚙️ How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/kaix-404/job_tracker.git
cd job-tracker
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

Run the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## 🔐 Environment Variables

| Variable         | Description                       |
| ---------------- | --------------------------------- |
| `PORT`           | Backend server port               |
| `MONGO_URI`      | MongoDB connection string         |
| `JWT_SECRET`     | Secret key for JWT authentication |
| `OPENAI_API_KEY` | API key for AI features           |

---

## 🧠 Technical Decisions & Trade-offs

### 1. Authentication (JWT + bcrypt)

* Used JWT for stateless authentication
* Passwords are hashed using bcrypt for security
* Initially implemented hashing using Mongoose pre-save hooks, but switched to explicit hashing in the controller for better control and easier debugging

---

### 2. Database Choice (MongoDB)

* Chosen for flexible schema design
* Ideal for rapidly evolving application structure
* Simplifies storing nested AI-parsed data

---

### 3. State Management (React Query)

* Used React Query instead of Redux
* Handles caching, refetching, and server state efficiently
* Reduces boilerplate and improves performance

---

### 4. Drag & Drop (dnd-kit)

* Chosen over older libraries like react-beautiful-dnd
* More flexible and actively maintained
* Required careful handling to avoid unnecessary re-renders

---

### 5. AI Integration

* OpenAI API used for:

  * Parsing job descriptions
  * Generating resume bullet points
* Trade-off: API quota limits can affect functionality
* Fallback handling implemented for failed AI responses

---

### 6. UI/UX Design

* Tailwind CSS for rapid styling
* Dark theme chosen for modern UI aesthetics
* Framer Motion used for smooth animations

---

## 🚧 Known Limitations

* AI features depend on API quota availability
* No role-based access (admin/user) yet
* Limited mobile responsiveness

---

## 🔮 Future Improvements

* Role-based authentication
* Analytics dashboard
* Resume export feature
* Better AI caching & retry logic
* Deployment with Docker & CI/CD

---

## 👨‍💻 Author

**Kai**

---

## ⭐ If you found this useful

Give it a star ⭐
