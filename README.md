# ParcelTrack - Multi-Carrier Package Tracking Platform

A complete, production-ready package tracking platform that allows users to track parcels from multiple courier companies through a single, unified interface.

![ParcelTrack](https://via.placeholder.com/1200x400/142B4A/2563EB?text=ParcelTrack+-+Multi-Carrier+Package+Tracking)

## 🚀 Features

### Public Features
- **Universal Package Tracking**: Track packages from multiple carriers in one place
- **Real-time Updates**: Get the latest shipment status and delivery progress
- **Tracking History**: View complete timeline of shipment events
- **No Account Required**: Public users can track packages without registration
- **Responsive Design**: Fully responsive interface works on desktop, tablet, and mobile
- **Help Center**: Comprehensive FAQ section for common tracking questions

### Admin Dashboard
- **Shipment Management**: Register, view, update, and delete shipments
- **Dashboard Analytics**: KPI cards and status breakdown charts
- **Carrier Management**: Monitor courier integration status and performance
- **Tracking Events**: View all tracking events across shipments
- **Exception Monitoring**: Track delayed or problematic shipments
- **Sync Logs**: View synchronization history and retry failed syncs
- **User Settings**: Manage admin profile and password
- **Secure Authentication**: JWT-based authentication with password reset

### Technical Features
- **Multi-Carrier Support**: Integrates with AfterShip API for tracking multiple carriers
- **RESTful API**: Clean, well-documented API endpoints
- **Type-Safe**: Full TypeScript implementation on both frontend and backend
- **Secure**: Helmet, CORS, rate limiting, JWT authentication, password hashing
- **Scalable**: MongoDB Atlas for cloud database, modular architecture
- **Developer-Friendly**: Clear project structure, comprehensive documentation

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **MongoDB Atlas** account (or local MongoDB instance)
- **AfterShip API Key** (optional, falls back to mock data in development)

## 🛠️ Tech Stack

### Frontend
- **React** 18 with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for routing
- **Axios** for HTTP requests
- **Recharts** for data visualization
- **Lucide React** for icons
- **date-fns** for date formatting

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **express-rate-limit** for rate limiting
- **Morgan** for logging

## 📦 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd parceltrack
```

### 2. Install dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. Environment Configuration

#### Frontend (.env)
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

#### Backend (.env)
Create `backend/.env`:
```env
# Server
NODE_ENV=development
PORT=5000

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/parceltrack?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# AfterShip (optional, uses mock data if not provided)
AFTERSHIP_API_KEY=your-aftership-api-key-here

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Database Setup

1. Create a MongoDB Atlas account at https://www.mongodb.net/atlas
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string and update `MONGODB_URI` in backend/.env

### 5. Seed Database (Optional)

Create an initial admin user and sample couriers:

```bash
cd backend
npm run seed
```

## 🚀 Running the Application

### Development Mode

#### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:3000

### Production Build

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Build Backend
```bash
cd backend
npm run build
npm start
```

## 📁 Project Structure

```
parceltrack/
├── frontend/                 # React frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── ui/          # UI components (Button, Input, etc.)
│   │   │   └── layout/      # Layout components (Navbar, Footer, etc.)
│   │   ├── pages/           # Page components
│   │   │   ├── public/      # Public pages (HomePage, TrackingPage, etc.)
│   │   │   └── admin/       # Admin pages (Dashboard, Shipments, etc.)
│   │   ├── contexts/        # React contexts (AuthContext)
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # CSS styles
│   └── package.json
│
└── backend/                  # Node.js backend
    ├── src/
    │   ├── config/          # Configuration (database, etc.)
    │   ├── controllers/     # Route controllers
    │   ├── middleware/      # Express middleware
    │   ├── models/          # Mongoose models
    │   ├── routes/          # API routes
    │   ├── services/        # Business logic services
    │   ├── types/           # TypeScript types
    │   ├── utils/           # Utility functions
    │   └── index.ts         # App entry point
    └── package.json
```

## 🔐 Default Admin Credentials

After seeding the database:
- **Email**: admin@parceltrack.com
- **Password**: Admin123!

**⚠️ Change these credentials immediately in production!**

## 📖 API Documentation

### Public Endpoints
- `GET /api/tracking/:trackingNumber` - Track shipment by tracking number

### Authentication Endpoints
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Protected Endpoints (Require Authentication)
- `GET /api/shipments` - Get all shipments
- `POST /api/shipments` - Register new shipment
- `GET /api/shipments/:id` - Get shipment by ID
- `POST /api/shipments/:id/refresh` - Refresh tracking
- `DELETE /api/shipments/:id` - Delete shipment
- `GET /api/couriers` - Get all couriers
- `GET /api/stats/dashboard` - Get dashboard statistics
- `GET /api/sync-logs` - Get synchronization logs

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Vercel (Frontend)
- Render/Railway/Heroku (Backend)
- MongoDB Atlas (Database)

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [AfterShip](https://www.aftership.com/) for the tracking API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide](https://lucide.dev/) for the icon set
- [Recharts](https://recharts.org/) for charts

## 📧 Support

For support, email support@parceltrack.com or open an issue in the repository.

---

Built with ❤️ for logistics professionals and developers
