<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="320" alt="Laravel Logo">
  </a>
</p>

<h1 align="center">🎓 Burma Web Campus</h1>

<p align="center">
  <strong>A full-stack learning platform built with Laravel & React</strong>
</p>

<p align="center">
  <a href="https://github.com/KhantYadanarMoe/BurmaWebCampus/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/KhantYadanarMoe/BurmaWebCampus/laravel.yml?label=build" alt="Build Status">
  </a>
  <a href="https://github.com/KhantYadanarMoe/BurmaWebCampus">
    <img src="https://img.shields.io/github/stars/KhantYadanarMoe/BurmaWebCampus" alt="Stars">
  </a>
  <a href="https://github.com/KhantYadanarMoe/BurmaWebCampus">
    <img src="https://img.shields.io/github/forks/KhantYadanarMoe/BurmaWebCampus" alt="Forks">
  </a>
  <a href="https://github.com/KhantYadanarMoe/BurmaWebCampus/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/KhantYadanarMoe/BurmaWebCampus" alt="License">
  </a>
</p>

---

## 📘 About Burma Web Campus

**Burma Web Campus** is a full-stack learning management system designed for teaching modern web development.  
It combines a **Laravel-powered backend** with a **React (Vite) frontend**, providing structured courses, quizzes, blogs, certificates, and admin management tools.

The platform is built to support:
- Interactive learning
- Progress tracking
- Content management
- Community engagement

---

## ✨ Features

### 🔐 Authentication & Learning
- User authentication
- Courses listing
- Units & sub-units
- Course enrollment
- Progress tracking per course
- Final quiz & score calculation
- Course certificates
- Comment system for each sub-unit

### 📝 Blogs & Community
- Blogs listing
- Blog details page
- Related blogs
- Reviews & ratings
- Contact messages
- Email subscription feature

---

## 👤 User Profile
- Edit profile information
- Change password
- Enrolled courses with progress status
- Certificates listing
- Default payment setup
- Billing history

---

## 🛠️ Admin Panel

### Courses
- Create course categories
- Create courses
- Delete courses

### Blogs
- Create blog categories
- Create blogs
- Edit blogs
- Delete blogs

### Management
- Users listing
- Subscribers listing
- Reviews listing
- Publish / mark reviews
- Contact messages listing
- Reply, mark, or delete contact messages
- Comment notifications

### Admin Settings
- Edit profile information
- Change password
- Application settings
- Dark mode support

---

## 🔍 Additional Features
- Search & filter across courses and blogs
- Responsive UI
- Dark mode

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS

### Backend
- Laravel (PHP)

### Database
- MySQL

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/KhantYadanarMoe/BurmaWebCampus.git
cd BurmaWebCampus
```

### 2️⃣ Install dependencies
```bash
composer install
npm install
```

### 3️⃣ Environment setup
```bash
cp .env.example .env
php artisan key:generate
```

### Update your .env file with the correct database credentials:
```env
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

### 4️⃣ Run database migrations
```bash
php artisan migrate
```

### (Optional: Seed demo data)
```bash
php artisan db:seed
```

### 5️⃣ Start development servers
```bash
npm run dev
php artisan serve
```

Visit the application in your browser:

👉 http://127.0.0.1:8000

---

## 📄 License

This project is open-source software licensed under the **MIT License**.

---

<p align="center">
  Made with ❤️ using Laravel & React
</p>

