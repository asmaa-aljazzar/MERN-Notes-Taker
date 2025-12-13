# MERN Stack Note-Taking Application
Visit The Application From <a href="https://mern-notes-taker.onrender.com">here</a>

## Project Overview

This is a full-stack note-taking application built using the MERN stack (MongoDB, Express.js, React, Node.js).  
It allows users to create, read, update, and delete notes, with a responsive design and secure backend.

---

## Features

- Create, read, update, and delete notes (CRUD).  
- RESTful API with Node.js and Express.js.  
- Data stored in MongoDB using Mongoose.  
- Responsive interface for desktop and mobile.  
- Basic API security with rate limiting.  
- Ready for deployment on services like Render or Heroku.

---

## Tech Stack

- **Frontend:** React  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose

---

## Installation

### Prerequisites

- Node.js  
- npm or yarn  
- MongoDB Atlas account or local MongoDB

### Steps

a. Clone the repository:  

```bash
git clone '<YOUR_REPOSITORY_URL>'
cd '<YOUR_PROJECT_FOLDER>'
```
b. Backend setup:  
```bash
cd backend
npm install
```
Create a `.env` file:  
```bash
`PORT=5000`
MONGODB_URI='<YOUR_MONGO_DB_CONNECTION_STRING>'
```
c. Frontend setup:  
```bash
cd ../frontend 
npm install  
```
Make sure the frontend API calls point to your backend.

d. Run the application:  

- Backend:  
```bash
cd backend  
npm start  '(or npm run dev)'
```
- Frontend: 
 ```bash
cd frontend 
npm start 
```
Click on the link that appears in your terminal

---

## Learning Resource

This project was based on the freeCodeCamp.org MERN Stack tutorial:  

[MERN Stack Tutorial for Beginners with Deployment – 2025](https://youtu.be/F9gB5b4jgOI)

---
