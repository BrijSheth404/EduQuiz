# EduQuiz — Online Quiz Platform

A secured full-stack web application built using the MERN Stack
Developed by: Brij | 4th Semester | Computer Engineering | Marwadi University

## Features
- JWT-based authentication
- Role-based access control (Admin / Student)
- Quiz system with 5 subjects: COA, CN, AWT, DM, OS
- Admin dashboard
- Password hashing using bcrypt

## Tech Stack
- Frontend: React.js, React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB
- Security: JWT, bcrypt

## How to Run

### Step 1 - Backend
cd backend
npm install
node server.js

### Step 2 - Frontend
cd quiz-app
npm install
npm start

## Environment Variables
Create a .env file in backend folder with:
MONGO_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=quizmaster_secret_key_2026
PORT=5000

## Login Credentials
Student: brij@gmail.com / brij123
Admin: admin@eduquiz.com / admin123