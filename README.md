# Notes Dashboard API

This repository contains the backend and assignment codebase for the Notes Dashboard application. The project is split into a MongoDB-backed production API and a practice/assignment Express server.

---

## 📁 Repository Structure

```text
├── backend/                     # Production Backend API
│   ├── src/
│   │   ├── models/
│   │   │   └── Note.js          # MongoDB schema & text indexes for notes
│   │   ├── routes/
│   │   │   └── notes.js         # Express routes for CRUD & text search
│   │   └── app.js               # Application entry point & configuration
│   ├── package.json             # Backend dependencies & script configurations
│   └── package-lock.json
│
├── assignment/                  # Practice/Assignment folder
│   └── task.js                  # In-memory Express server with user & notes management
│
└── .gitignore                   # Project-wide Git ignore configurations
```

---

## 🛠️ Tech Stack

- **Runtime Environment:** [Node.js](https://nodejs.org/)
- **Web Framework:** [Express.js](https://expressjs.com/) (Express v5 in production)
- **Database Object Modeling:** [Mongoose](https://mongoosejs.com/) / [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Validation:** [Express Validator](https://express-validator.github.io/docs/)
- **CORS Support:** Enabled for cross-origin resource sharing.
- **Process Manager (Development):** [Nodemon](https://nodemon.io/)

---

## 🚀 Setup & Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your local machine, and access to a MongoDB Atlas cluster or local MongoDB instance.

### 2. Configure Environment Variables
Inside the `backend/` directory, create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 3. Installation & Run

#### Run the Production Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server (runs nodemon):
   ```bash
   npm run dev
   ```
4. Or start the production server:
   ```bash
   npm start
   ```

The backend server will run on `http://localhost:5000` (or your configured `PORT`) and connect to MongoDB.

#### Run the Assignment Practice Script
1. Navigate to the `assignment` directory:
   ```bash
   cd assignment
   ```
2. Run the script:
   ```bash
   node task.js
   ```
The assignment server will run on `http://localhost:3000` with an in-memory database.

---

## 🔌 API Endpoints Documentation

### Production Backend API (`http://localhost:5000/api/notes`)

All responses return JSON payloads. Mongoose validation errors or Express validators return detailed error messages with appropriate HTTP status codes.

| Method | Endpoint | Description | Payload / Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/notes` | Get all notes sorted by last updated (newest first) | None |
| **GET** | `/api/notes/search` | Full-text search across titles and content | Query parameter `?query=search_term` |
| **GET** | `/api/notes/:id` | Get details of a single note | URL parameter `:id` |
| **POST** | `/api/notes` | Create a new note | `{ "title": "...", "content": "..." }` |
| **PUT** | `/api/notes/:id` | Update an existing note | `{ "title": "...", "content": "..." }` |
| **DELETE** | `/api/notes/:id` | Delete a note by ID | URL parameter `:id` |

#### Note Model Schema
- `title`: String (Required, max 200 characters)
- `content`: String (Required)
- `timestamps`: `createdAt` and `updatedAt` are auto-managed by Mongoose.
- *Indexes*: Text indexes are created on `title` and `content` for efficient full-text search.

---

### Practice / Assignment API (`http://localhost:3000`)

This is a mock, in-memory REST API useful for testing or sandbox practice.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/users` | Get all mock users |
| **GET** | `/users/:id` | Get single user by ID |
| **PUT** | `/users/:id` | Update user name |
| **GET** | `/notes` | Get all mock notes |
| **GET** | `/notes/count` | Get total count of notes |
| **POST** | `/notes` | Add a new note (with random ID assignment) |
| **DELETE** | `/notes/:id` | Delete a note by ID |
| **GET** | `/user-notes/:userId` | Get notes belonging to a specific user |
| **POST** | `/login` | Basic mock login validation (`admin@test.com` / `123456`) |
| **POST** | `/sum` | Simple sum calculator (expects `{ "a": number, "b": number }`) |
| **GET** | `/external-data` | Fetches external simulated data |

---

## 🔒 CORS Configuration
The backend server is configured with CORS enabled. By default, it allows requests from:
`https://notes-dashboard-nu.vercel.app`
You can modify this in [app.js](file:///c:/notes-dashboard/backend/src/app.js) to support other origins or allow wildcard `*` for development.
