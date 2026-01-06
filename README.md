
# 🥛 Dairy ERP System

A full-stack Enterprise Resource Planning system for dairy cooperatives to manage milk collection, farmer payments, and inventory.

![Dairy ERP Dashboard](screenshots/dashboard.png)

## ✨ Features

- **Farmer Management**: Register, track, and manage dairy farmers
- **Milk Collection**: Daily collection recording with quality testing
- **Payment Processing**: Automated farmer payments
- **Inventory Management**: Track milk and product stock
- **Real-time Dashboard**: Analytics and reporting
- **Role-based Access**: Admin and Operator roles

## 🏗️ Architecture
Frontend: React 18 + TypeScript + Material-UI
Backend: ASP.NET Core Web API
Database: SQL Server
Authentication: JWT

## 📦 Project Structure
dairy-erp/
├── frontend/ # React application
├── backend/ # .NET Core API
├── database/ # SQL scripts
└── docs/ # Documentation


## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- .NET 6 SDK
- SQL Server 2019+
- Git

### Backend Setup
```bash
cd backend
dotnet restore
dotnet build
dotnet run

## Frontend Setup
bash
cd frontend
npm install
npm start

Database Setup
1.Run database/Schema.sql in SQL Server
2.Run database/SeedData.sql for sample data

📖 Documentation
API Documentation

Database Schema

Deployment Guide

🧪 Testing
bash
# Backend tests
cd backend
dotnet test

# Frontend tests
cd frontend
npm test
📸 Screenshots
Dashboard	Farmer Management	Milk Collection
https://screenshots/dashboard.png	https://screenshots/farmers.png	https://screenshots/collection.png
🔧 Tech Stack
Frontend
React 18 - UI library

TypeScript - Type safety

Material-UI - Component library

Recharts - Data visualization

Axios - HTTP client

React Router - Navigation

Backend
ASP.NET Core 6 - Web API framework

Entity Framework Core - ORM

SQL Server - Database

JWT - Authentication

Swagger - API documentation

DevOps
Git - Version control

GitHub Actions - CI/CD

Docker - Containerization

📊 Database Schema
https://docs/database-schema.png

🔐 Authentication Flow
User logs in with credentials

Server validates and returns JWT token

Token stored in localStorage

Subsequent requests include token in Authorization header

Server validates token for each request

🧑‍💻 Development
Code Standards
ESLint + Prettier for frontend

EditorConfig for consistent formatting

Conventional commits

Git Workflow
bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: add farmer search functionality"

# Push to remote
git push origin feature/new-feature
🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors
Your Name - Full Stack Developer - Your GitHub

🙏 Acknowledgments
Thanks to Material-UI for the amazing component library

Inspired by real dairy cooperative needs in rural areas

📞 Support
For support, email your.email@example.com or create an issue in the repository.

⭐ Star this repo if you found it useful!

