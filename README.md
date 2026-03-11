# MintURL – URL Shortener

MintURL is a full-stack URL shortening application that converts long URLs into short, shareable links.
It includes caching, rate limiting, analytics tracking, and expiration support.

---

## 🚀 Live Demo

Frontend: https://your-frontend-url
Backend API: https://your-backend-url

---

## 🧰 Tech Stack

### Backend

* Java
* Spring Boot
* Spring Data MongoDB
* Redis (Caching)
* Maven

### Frontend

* React
* Vite
* TailwindCSS
* Axios

### Infrastructure

* MongoDB Atlas (Database)
* Upstash Redis (Cache)
* Vercel (Frontend Hosting)
* Railway / Render (Backend Hosting)

---

## ✨ Features

* 🔗 URL shortening
* ⚡ Redis caching for fast redirects
* 📊 Click analytics tracking
* ⏱️ Expiring URLs support
* 🚦 Rate limiting to prevent abuse
* 🧩 RESTful API architecture
* 🎨 Modern React UI

---

## 🏗️ System Architecture

User
↓
React Frontend (Vercel)
↓
Spring Boot API (Railway / Render)
↓
Redis Cache (Upstash)
↓
MongoDB Atlas

---

## 📦 Project Structure

```
MintURL
│
├ backend
│   └ minturl
│       ├ src
│       ├ pom.xml
│
├ frontend
│   └ minturl
│       ├ src
│       ├ package.json
│
└ README.md
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
VITE_API_BASE_URL=https://your-backend-url/api
```

---

## 📡 API Endpoints

### Create Short URL

POST `/api/shorten`

Request

```
{
  "originalUrl": "https://example.com"
}
```

Response

```
{
  "shortUrl": "https://minturl.app/aZ91"
}
```

---

### Redirect to Original URL

GET `/{shortCode}`

Redirects to the original long URL.

---

## 🛠️ Local Development

### Clone repository

```
git clone https://github.com/your-username/minturl.git
cd minturl
```

---

### Run Backend

```
cd backend/minturl
./mvnw spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---

### Run Frontend

```
cd frontend/minturl
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## 👨‍💻 Author

Tanmay Khilari

LinkedIn
https://linkedin.com/in/itsmetanmayk

GitHub
https://github.com/Tanmayk13

---

⭐ If you found this project useful, consider giving it a star.
