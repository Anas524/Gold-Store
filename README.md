# Gold-Store — Gold & Silver E-Commerce Platform

A full-stack gold and silver e-commerce application built with React.js, Laravel/PHP, Node.js/Express, and MySQL.

The project demonstrates product browsing, shopping cart functionality, authentication, API integration, and checkout workflows.

## Features

- Gold and silver product listings
- Product browsing and shopping cart functionality
- User authentication
- Frontend components built with React.js
- Backend functionality using Laravel/PHP and Node.js/Express
- MySQL database integration
- Gold and silver rate endpoint
- Checkout workflow

## Technology Stack

**Frontend**
- React.js
- JavaScript
- HTML5 and CSS3
- Tailwind CSS

**Backend**
- Laravel
- PHP
- Node.js
- Express.js

**Database**
- MySQL

**Development Tools**
- Git and GitHub
- MySQL Workbench

## Project Structure

```text
Gold-Store/
├── public/
├── src/
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env
├── index.html
├── package.json
└── README.md
```

The structure above describes the main folders and files currently identified in the repository. The Laravel/PHP backend may be maintained separately.

## Backend API

### Health Check

`GET /api/health`

Returns a response indicating whether the Express server is running.

### Gold and Silver Rates

`GET /api/rates`

Returns sample gold and silver rates in AED per gram.

**Note:** The current endpoint uses hardcoded sample values, not live market prices.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Anas524/Gold-Store.git
cd Gold-Store
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Start the Frontend

```bash
npm run dev
```

### 4. Start the Express Server

Open another terminal:

```bash
cd server
npm install
npm start
```

The Express server uses port `5001` by default.

## Development Notes

- Configure any required environment variables before running the application.
- Ensure the frontend uses the correct backend API address.
- Configure database credentials and other application settings locally.
- Never commit passwords, API keys, database credentials, or other secrets.

## Author

Anas Ahamed

GitHub: [Anas524](https://github.com/Anas524)
