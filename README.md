# E-Commerce Web Application (Frontend) .

This is the **React + TypeScript** frontend for the E-Commerce platform. It connects to the backend API, provides a fully functional UI for users and admins, and includes features like authentication, product browsing, cart/checkout flow, order management, and dashboard analytics.

---

## 🛠️ Tech Stack

* **React** with **TypeScript**
* **Redux Toolkit** for state management
* **React Router DOM** for routing
* **Firebase Auth** for authentication
* **React Hot Toast** for notifications
* **Lazy Loading** with `React.lazy()` and `Suspense`
* **Axios** for API requests

---

## 📁 Project Structure

```
├── src/
│   ├── components/           # Shared UI components (Header, Footer, Loader)
│   ├── pages/                # Page components (Home, Login, Cart, Admin Dashboard etc)
│   ├── redux/                # Redux store, reducers, and API functions
│   ├── Firebase.ts           # Firebase auth initialization
│   ├── App.tsx               # Main App entry with routing
│   └── index.tsx             # Root ReactDOM render file
├── public/
├── .env
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/poteswapnil555/Demo_TwinsMart_Frontend.git
cd Demo_TwinsMart_Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

### 4. Run the Development Server

```bash
npm run dev
```

Server will be available at:

```
http://localhost:5173
```

---

## 🧭 Routes Overview

### Public Routes

* `/` – Homepage
* `/search` – Product search
* `/product/:id` – Product detail view
* `/cart` – View cart
* `/login` – Login and signup

### Protected Routes

* `/shipping`, `/orders`, `/order/:id`, `/pay` – Available after login

### Admin Only Routes

* `/admin/dashboard`, `/admin/product`, `/admin/customer`
* `/admin/chart/bar`, `/admin/chart/line`, `/admin/chart/pie`
* `/admin/app/coupon`, `/admin/app/stopwatch`, `/admin/app/toss`
* `/admin/product/new`, `/admin/product/:id`
* `/admin/discount/new`, `/admin/discount/:id`
* `/admin/transaction/:id`

---

## 🔒 Authentication

Firebase is used for authentication. User role-based access is enforced using `ProtectedRoute` logic that checks:

* `isAuthenticated`
* `adminOnly` (with user role from Redux)

---

## 🌐 API Integration

All backend API requests are made using Axios to the base URL provided in `.env`. Redux actions use async thunks to fetch and update data.

---

## 🧹 Code Quality

* **Type Safety** enforced via TypeScript
* **Lazy Loading** used for performance
* **Centralized State** via Redux Toolkit
* **Reusable Components** and modular file structure

---

## 📦 Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext .ts,.tsx"
}
```


