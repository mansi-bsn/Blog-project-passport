# 🚀 Full-Stack Blog Application  
### Node.js • Express • MongoDB • Passport.js • EJS

A production-ready **Full-Stack Blog Platform** built using  
**Node.js**, **Express.js**, **MongoDB**, **Mongoose**, **EJS Templates**, and **Passport.js Authentication**.

This project includes **secure authentication**, **complete blog CRUD system**, **file uploads**, **route protection**, and a **responsive frontend UI**.

---

## 🌟 Key Features

- 🔐 **Authentication with Passport.js**
  - Local Strategy
  - Secure sessions
  - Password hashing with bcrypt
  - Login / Signup / Logout
  - Protected routes

- ✍️ **Blog Management**
  - Create, Read, Update, Delete blogs
  - Rich content support
  - Author ownership control

- 🖼️ **File Uploads**
  - Image uploads using Multer
  - Files stored in `/uploads`

- 🛡️ **Security**
  - Passport authentication middleware
  - Session-based authorization
  - Error handling

- 🎨 **Frontend**
  - EJS templates
  - Responsive UI
  - Static assets in `/public`

- 🗄️ **Database**
  - MongoDB with Mongoose
  - Clean schema design

---

## 📂 Project Structure

Blog-Project/
│── controllers/
│── routes/
│── models/
│── middlewares/
│── public/
│── views/
│── uploads/
│── db/
│── config/
│── index.js
│── package.json
│── .env


---

## ⚙️ Tech Stack

| Layer | Technology |
|------|-----------|
| Backend | Node.js, Express.js |
| Frontend | EJS Templates |
| Database | MongoDB, Mongoose |
| Authentication | Passport.js |
| Sessions | Express-Session |
| File Upload | Multer |
| Environment | Dotenv |

---

## 🔧 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

2️⃣ Install Dependencies
npm install

3️⃣ Create .env File
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

4️⃣ Run Application
npm start
Server running at: http://localhost:5000

| Method | Route     | Description |
| ------ | --------- | ----------- |
| GET    | `/login`  | Login page  |
| POST   | `/login`  | User login  |
| GET    | `/signup` | Signup page |
| POST   | `/signup` | Create user |
| GET    | `/logout` | Logout user |

| Method | Route               | Description |
| ------ | ------------------- | ----------- |
| GET    | `/blogs`            | All blogs   |
| GET    | `/blogs/:id`        | Single blog |
| POST   | `/blogs`            | Create blog |
| GET    | `/blogs/edit/:id`   | Edit blog   |
| POST   | `/blogs/update/:id` | Update blog |
| POST   | `/blogs/delete/:id` | Delete blog |

🗂️ Database Schemas
User
  name
  email
  password
  createdAt
Blog
  title
  description
  image
  author
  createdAt
