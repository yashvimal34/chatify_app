📌 Real-Time Chat Application (MERN + Socket.IO + Arcjet)

A full-stack real-time chat platform built using the MERN stack, featuring secure authentication, live messaging, user presence tracking, and production-grade security using Arcjet rate limiting.


🚀 Features

🔐 User Authentication (Signup, Login, Logout) using JWT

👤 Profile Update with secure middleware

💬 Real-Time Messaging using Socket.IO

🟢 Online Users Indicator and instant message delivery

📩 Welcome Emails on Signup

🛡 Arcjet Rate Limiting & Security to protect APIs

🗂 Modern chat UI with sidebar and chat container

🎨 Responsive UI built with Tailwind CSS

🌍 Global state management using Zustand

🚦 Client-side routing with React Router

☁️ Deployed to production with environment variable support


| Category  | Tools                                         |
| --------- | --------------------------------------------- |
| Frontend  | React.js, Tailwind CSS, Zustand, React Router |
| Backend   | Node.js, Express.js                           |
| Real-Time | Socket.IO                                     |
| Database  | MongoDB & Mongoose                            |
| Security  | JWT, bcrypt, Arcjet rate limiting             |
| Mailing   | Email API (welcome emails)                    |


| Method | Endpoint      | Description                          |
| ------ | ------------- | ------------------------------------ |
| POST   | /signup       | Create new user + send welcome email |
| POST   | /login        | Authenticate and return JWT          |
| POST   | /logout       | Logout user                          |
| GET    | /profile      | Get logged-in user                   |
| PUT    | /profile      | Update profile                       |
| GET    | /messages/:id | Fetch chat messages                  |
| POST   | /messages     | Send a new message                   |



git clone https://github.com/your-username/chat-app.git
cd chat-app

cd server && npm install
cd ../client && npm install


MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
ARCJET_KEY=your_arcjet_key
EMAIL_API_KEY=your_email_key
CLIENT_URL=http://localhost:5173

VITE_SERVER_URL=http://localhost:3000

Backend:
npm run dev

Frontend:
npm run dev
