# MintURL – URL Shortener

MintURL is a full-stack URL shortening application that converts long URLs into short, shareable links.

It includes caching, rate limiting, analytics tracking, and expiration support to simulate a production-style backend system.

---

## 🚀 Live Demo

**Frontend**
https://mint-url.vercel.app

**Backend API**
https://minturl-backend.onrender.com

---

## 🧰 Tech Stack

### Backend

* Java
* Spring Boot
* Spring Data MongoDB
* Redis (Upstash)
* Maven

### Frontend

* React
* Vite
* TailwindCSS
* Axios

### Infrastructure

* MongoDB Atlas (Database)
* Upstash Redis (Cache + Analytics)
* Vercel (Frontend Hosting)
* Render (Backend Hosting)

---

## ✨ Features

* 🔗 URL shortening using Base62 encoding
* ⚡ Redis caching for fast redirects
* 📊 Click analytics tracking with Redis counters
* ⏱️ Expiring URLs with TTL support
* 🚦 Rate limiting to prevent API abuse
* 🧩 RESTful API architecture
* 🛑 Global exception handling
* ✅ Request validation
* 🎨 Modern React UI

---

## 🏗️ System Architecture

```
User
 ↓
React Frontend (Vercel)
 ↓
Spring Boot API (Render)
 ↓
Redis Cache / Click Analytics (Upstash)
 ↓
MongoDB Atlas
```

---

## 📦 Project Structure

```
minturl
│
├── backend
│   └── minturl
│       ├── src
│       └── pom.xml
│
├── frontend
│   └── minturl
│       ├── src
│       └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend

```
MONGO_URI=your_mongodb_connection_string
REDIS_HOST=your_redis_host
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

### Frontend

```
VITE_API_BASE_URL=https://minturl-backend.onrender.com/api
```

---

## 📡 API Endpoints

### Create Short URL

**POST** `/api/shorten`

#### Request

```json
{
  "url": "https://example.com",
  "expiryDays": 7
}
```

#### Response

```json
{
  "shortUrl": "https://minturl-backend.onrender.com/aZ91"
}
```

---

### Redirect to Original URL

**GET** `/{shortCode}`

Example:

```
https://minturl-backend.onrender.com/aZ91
```

Redirects to the original long URL.

---

### Get URL Analytics

**GET** `/api/stats/{shortCode}`

Returns click analytics for a shortened URL.

Example:

```
GET /api/stats/aZ91
```

#### Response

```json
{
  "shortCode": "aZ91",
  "originalUrl": "https://example.com",
  "totalClicks": 15,
  "createdAt": "2026-03-10T12:30:00Z",
  "expiresAt": "2026-03-17T12:30:00Z"
}
```

This endpoint retrieves analytics such as total clicks and metadata for the shortened URL.

---

## 🛠️ Local Development

### Clone Repository

```
git clone https://github.com/Tanmayk13/minturl.git
cd minturl
```

### Run Backend

```
cd backend/minturl
./mvnw spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

### Run Frontend

```
cd frontend/minturl
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🧠 Key Concepts Demonstrated

* Redis caching strategy
* Rate limiting using Redis counters
* Asynchronous analytics aggregation
* Scheduled jobs for Redis → MongoDB sync
* RESTful API design with Spring Boot
* Global exception handling and validation
* Full-stack deployment with cloud infrastructure

---

## 👨‍💻 Author

**Tanmay Khilari**

LinkedIn
https://linkedin.com/in/itsmetanmayk

---

⭐ If you found this project useful, consider giving it a star.
