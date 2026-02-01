# Setup Guide – Iron Lady Internal Student Management System

This guide explains how to **run and test** the Iron Lady Internal Student Management System locally. It is intentionally concise for quick setup and evaluation.

---

## 🔧 Prerequisites

Ensure the following are installed:

* **Node.js** v18+
* **MongoDB** (local or Atlas)
* **Git**

Verify installation:

```bash
node --version
npm --version
mongod --version
```

---

## 📥 Clone the Repository

```bash
git clone https://github.com/Abhayaj247/Iron_Lady_Internal_System.git
cd iron-lady-internal-system
```

Project structure:

```
iron-lady-internal-system/
├── backend/
└── frontend/
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

### Create `.env`

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/iron-lady-internal
```

### Run Backend

```bash
npm run dev
```

Backend runs at:

* [http://localhost:5000](http://localhost:5000)
* Health check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🎨 Frontend Setup

```bash
cd ../frontend
npm install
```

### Create `.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Run Frontend

```bash
npm start
```

Frontend runs at:

* [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Setup

Start MongoDB locally:

```bash
mongod
# OR (Linux)
sudo systemctl start mongod
```

> Collections are auto-created on first request.

---

## ✅ Testing & Verification

### 1️⃣ API Health Check

```bash
curl http://localhost:5000/api/health
```

Expected:

```json
{ "status": "success" }
```

---

### 2️⃣ Create Test Student

```bash
curl -X POST http://localhost:5000/api/students \
-H "Content-Type: application/json" \
-d '{
  "name": "Test Student",
  "email": "test@example.com",
  "phone": "9876543210",
  "program": "LEP",
  "paymentAmount": 50000,
  "paymentStatus": "Paid"
}'
```

---

### 3️⃣ Fetch Students

```bash
curl http://localhost:5000/api/students
```

---

### 4️⃣ Frontend Testing

1. Open [http://localhost:3000](http://localhost:3000)
2. Verify dashboard loads
3. Add, edit, and delete students
4. Test search and filters

---

## 📌 API Endpoints

| Method | Endpoint            | Description    |
| ------ | ------------------- | -------------- |
| GET    | `/api/health`       | API status     |
| GET    | `/api/students`     | Fetch students |
| POST   | `/api/students`     | Add student    |
| PUT    | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

---

## 🚀 Production (Optional)

```bash
# Build frontend
cd frontend
npm run build

# Run backend in production
cd ../backend
NODE_ENV=production npm start
```

Use **PM2 + Nginx** for deployment.

---

## 🛑 Common Issues

* **MongoDB not running** → Start `mongod`
* **CORS error** → Verify `FRONTEND_URL` in backend `.env`
* **API not reachable** → Ensure backend is running

---
