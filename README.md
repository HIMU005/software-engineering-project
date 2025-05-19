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

### create a .env file in the server directory:

```bash
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/micro-task-db
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_your_key
ACCESS_TOKEN_SECRET= your_access_token_key
```

#### Start the backend server:

```bash
npm start
```

## 💻 Frontend Setup

```bash
git clone https://github.com/your-repo/client.git
cd client
npm install
```

### Create a .env file in the client directory:

```bash
VITE_apiKey = your_secret_key_to_run_the_project
VITE_authDomain = your_secret_key_to_run_the_project
VITE_projectId = your_secret_key_to_run_the_project
VITE_storageBucket = your_secret_key_to_run_the_project
VITE_messagingSenderId = your_secret_key_to_run_the_project
VITE_appId = your_secret_key_to_run_the_project
VITE_IMGBB_API_KEY = your_secret_key_to_run_the_project
VITE_STRIPE_PUBLISHABLE_KEY = your_secret_key_to_run_the_project
```

## 🖥️ Tech Stack

| Component    | Technologies                              |
| ------------ | ----------------------------------------- |
| **Frontend** | React, TailwindCSS, Swiper                |
| **Backend**  | Node.js, Express.js, JWT, Mongoose        |
| **Database** | MongoDB Atlas                             |
| **APIs**     | Stripe (Payments), ImageBB (Image Upload) |
| **DevOps**   | Firebase Hosting, vercel hosting          |

## 🔐 Admin Access

```bash
Email: abir@gmail.com
Password: 111111
```

## 🚀 Deployment

### Frontend (Firebase)

```bash
npm run build
firebase deploy
```

### Backend (Vercel)

```bash
vercel --prod
```

## 👥 Team Contact

For support, please contact our team leads via:

### 👥 Team Members

| Member             | Professional Links                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Hashanuz Zaman     | [LinkedIn](https://www.linkedin.com/in/hashanuz-zaman-himu/) • [Portfolio](https://himu005-portfolio.netlify.app/)       |
| Md. Jobaer Hossain | [LinkedIn](https://www.linkedin.com/in/jobaer6767/) • [Portfolio](https://portfolio-nu-orpin-70.vercel.app/)             |
| Tanvir Ahmed       | [Facebook](https://www.facebook.com/Iftaker.siddique.tanveer) • [Portfolio](https://istanveer.github.io/Portfolio-IST-/) |

### Team work

| Member         | Work                                                                         |
| -------------- | ---------------------------------------------------------------------------- |
| hashanuz Zaman | Functional Requirements, component design implement(frontend), schema design |
| Jobaer Hossain | data flow diagram, pages(front_end), ER-diagram                              |
| Tanvir         | Normalization, api and firebase setup,                                       |
