# GreenTrade Hub

A production-ready full-stack supplier-product management system for sustainable products export.

## 🚀 Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript**
- **Prisma 6** ORM
- **PostgreSQL** database
- **Zod** for validation
- **Swagger/OpenAPI 3.0** for documentation

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript**
- **Material-UI (MUI)** v5
- **Axios** for API communication
- **Recharts** for data visualization
- Fully responsive design

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd GreenTrade-Hub
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Update the .env file with your PostgreSQL credentials

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database with sample data
npm run prisma:seed

# Start the development server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
# The .env.example file is already set to http://localhost:5000

# Start the development server
npm run dev
```

The frontend application will run on `http://localhost:3000`

## 📚 API Documentation

Once the backend server is running, visit:
- **Swagger UI**: `http://localhost:5000/api/docs`
- **Health Check**: `http://localhost:5000/health`

## 🗄️ Database Schema

### Supplier Model
- `id` (UUID)
- `name` (String)
- `email` (String, unique)
- `country` (String)
- `contactPerson` (String, optional)
- `phone` (String, optional)
- `createdAt` (DateTime)
- `products` (One-to-many relationship)

### Product Model
- `id` (UUID)
- `supplierId` (UUID, foreign key)
- `name` (String)
- `category` (Enum: ORGANIC_FOOD, HANDMADE, SUSTAINABLE_GOODS)
- `price` (Decimal)
- `stockQuantity` (Integer)
- `certificationStatus` (Enum: CERTIFIED, PENDING, NOT_CERTIFIED)
- `certificationExpiryDate` (Date, optional)
- `description` (Text, optional)
- `createdAt` (DateTime)

## 🎯 Features

- ✅ Supplier Management (Create, List, View with products)
- ✅ Product Management (CRUD with filters)
- ✅ Analytics Dashboard
- ✅ Global Search (Suppliers & Products)
- ✅ RESTful API with Swagger documentation
- ✅ Type-safe with TypeScript
- ✅ Form validation with Zod
- ✅ Responsive UI with Material-UI

## 📝 Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data
- `npm run prisma:studio` - Open Prisma Studio

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌱 Sample Data

The seed script creates:
- 3 suppliers (from India, Bangladesh, and Kenya)
- 6 products across different categories

## 📂 Project Structure

```
GreenTrade-Hub/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── validations/
│   │   ├── middlewares/
│   │   ├── types/
│   │   └── index.ts
│   └── prisma/
│       ├── schema.prisma
│       └── seed.ts
└── frontend/
    └── src/
        ├── app/
        ├── components/
        └── lib/
```


## Database Schema 

<image src="./frontend/public/images/schema.png" alt="Schema" width="400" height="300" />




## Screenshots of UI

<image src="./frontend/public/images/dashboard.png" alt="Dashboard" width="600" height="350" />
<image src="./frontend/public/images/dashboard_dark.png" alt="Dashboard Dark" width="600" height="350" />
<image src="./frontend/public/images/products.png" alt="Products" width="600" height="350" />
<image src="./frontend/public/images/supplier.png" alt="Suppliers" width="600" height="350" />


## 🚀 Deployed URLs

- Backend: https://greentrade-hub.onrender.com
- Frontend: https://green-trade-hub.vercel.app/

## ------------  End of the file --------------