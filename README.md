# Micro-Task and Earning Platform (MERN Stack)

![Project Screenshot](https://i.imgur.com/J5q4T0j.png)  
_A full-stack platform connecting Workers, Task-Creators, and Admins for micro-task management._

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🌐 Live Demo](#-live-demo)
- [🛠️ Installation](#-installation)
- [🖥️ Tech Stack](#-tech-stack)
- [🗃️ Database Schema](#-database-schema)
- [🔌 API Endpoints](#-api-endpoints)
- [🔐 Admin Access](#-admin-access)
- [🚀 Deployment](#-deployment)
- [📜 License](#-license)
- [⁉️ Support](#-support)

---

## ✨ Features

### Role-Based System

| Role             | Capabilities                                |
| ---------------- | ------------------------------------------- |
| **Worker**       | Complete tasks, earn coins, withdraw funds  |
| **Task-Creator** | Create tasks, review submissions, buy coins |
| **Admin**        | Manage users, tasks, and platform integrity |

### Core Functionalities

- 🔐 JWT Authentication + Google OAuth
- 📝 Task lifecycle (Create → Submit → Approve/Reject)
- 💰 Coin economy (Earn / Withdraw / Purchase via Stripe)
- 🔔 Real-time notifications
- 📱 Fully responsive UI (Mobile + Desktop)

---

## 🌐 Live Demo

- **Frontend**: [client Link](https://work-managemnt.web.app/)
- **Backend API**: [server Link](https://task-management-himu005.vercel.app)

---

## 🛠️ Installation

### Prerequisites

- Node.js v16+
- MongoDB Atlas account
- Stripe & ImageBB API keys

### Backend Setup

```bash
git clone https://github.com/your-repo/server.git
cd server
npm install

# Configure environment variables
echo "MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/micro-task-db
JWT_SECRET=your_jwt_secret
DB_USER = your_db_userName
DB_PASS = your_db_password
STRIPE_SECRET_KEY=sk_test_your_key
IMAGEBB_KEY=your_imagebb_key" > .env

npm run dev


```
