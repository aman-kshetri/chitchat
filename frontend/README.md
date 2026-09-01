# Chitchat - Real-Time Chat Application
A modern, full-stack real-time chat application built with React, Node.js, Express, and MongoDB. Chat with other users in real-time with support for text messages, image sharing, and online status tracking.

## Features
- **User Authentication**: Secure signup and login with JWT tokens
- **Real-Time Messaging**: Instant message delivery using Socket.IO
- **Online Status**: Live online/offline status for all users
- **Image Sharing**: Send images in chat with Cloudinary integration
- **Profile Management**: Update profile picture, name, and bio
- **Unread Messages**: Track and display unread message count
- **Message History**: Full message history with sender/receiver info
- **Responsive UI**: Mobile-friendly interface with Tailwind CSS
- **Modern Stack**: React 19, Vite, Tailwind CSS, Socket.IO

## Tech Stack
### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications
- **ESLint** - Code linting

### Backend
- **Node.js & Express.js** - Backend framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.IO** - Real-time WebSocket server
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image upload and storage
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## Project Structure
```
chitchat/
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable React components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── RightSidebar.jsx
│   │   ├── context/         # React context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── ChatContext.jsx
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── App.jsx          # Root component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/
│   ├── controllers/         # Route logic
│   │   ├── userController.js
│   │   └── messageController.js
│   ├── models/              # Mongoose schemas
│   │   ├── User.js
│   │   └── Message.js
│   ├── routes/              # API routes
│   │   ├── userRoutes.js
│   │   └── messageRoutes.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js          # JWT authentication
│   ├── lib/                 # Utility functions
│   │   ├── db.js            # MongoDB connection
│   │   ├── utils.js         # Helper functions
│   │   └── cloudinary.js    # Image upload config
│   ├── server.js            # Express & Socket.IO setup
│   ├── package.json
│   └── .gitignore
```

## Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud instance)
- **Cloudinary Account** (for image uploads) - [Sign up here](https://cloudinary.com/users/register/free)

## Installation & Setup
### 1. Clone the Repository
```bash
git clone https://github.com/aman-kshetri/chitchat.git
cd chitchat
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file with required variables
cat > .env << EOF
# MongoDB connection
MONGO_URI=your_mongodb_connection_string

# JWT secret key
JWT_SECRET=your_secure_random_secret_key

# Server port
PORT=5001

# Cloudinary credentials
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EOF
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file (if needed for API endpoints)
cat > .env << EOF
VITE_API_URL=http://localhost:5001/api
EOF
```

## Configuration
### Environment Variables
#### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/chitchat` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key_123` |
| `PORT` | Server port | `5001` |
| `CLOUDINARY_NAME` | Cloudinary account name | `your_account_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcdefghijk` |

#### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5001/api` |

### Getting Cloudinary Credentials
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name from the top
4. Generate API Key and API Secret from Settings → API Keys

## Running the Application

### Development Mode
#### Terminal 1: Start Backend Server
```bash
cd backend
npm run server
```

Expected output:
```
MongoDB connected
Server is running on http://localhost:5001
```

#### Terminal 2: Start Frontend Dev Server
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v8.x.x building for development and client HMR...
Local: http://localhost:5173/
```

Open your browser to `http://localhost:5173/` and start chatting!

### Production Build
#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
# Serves from dist/ folder
npm run preview
```

## Architecture

### Data Flow

```
┌─────────────┐                    ┌──────────────┐
│   React     │                    │   Node.js    │
│   Frontend  │◄──────────────────►│   Backend    │
│   (Vite)    │   HTTP + WebSocket │  (Express)   │
└─────────────┘                    └──────────────┘
       │                                  │
       │                                  │
       ▼                                  ▼
    Local State              ┌────────────────────┐
   (Context API)             │   MongoDB          │
                             │   Database         │
                             └────────────────────┘
                                      ▲
                                      │
                             ┌────────────────┐
                             │  Cloudinary    │
                             │  (Images)      │
                             └────────────────┘
```

### Communication Flow
1. **Authentication**: User signs up/logs in → Backend generates JWT → Stored in frontend
2. **Real-Time Chat**: Client connects via Socket.IO → Backend tracks online users → Messages delivered in real-time
3. **File Upload**: Image selected → Sent to Cloudinary → URL stored in MongoDB
4. **Message Persistence**: All messages stored in MongoDB for history retrieval

## Troubleshooting
### Common Issues

#### **1. MongoDB Connection Error**
```
Error: connect ECONNREFUSED
```
**Solution:**
- Ensure MongoDB is running locally: `mongod`
- Or check your MONGO_URI in .env is correct
- If using MongoDB Atlas, whitelist your IP address

#### **2. Cloudinary Upload Fails**
```
Error: Invalid credentials
```
**Solution:**
- Verify CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET
- Check API secret is not exposed in frontend code
- Images fallback to base64 if upload fails

#### **3. Socket.IO Connection Issues**
```
Failed to connect to server
```
**Solution:**
- Ensure backend server is running on port 5001
- Check CORS settings in backend/server.js
- Verify frontend can reach backend URL

#### **4. JWT Token Invalid**
```
Error: Not authorized
```
**Solution:**
- Clear browser cookies and localStorage
- Log out and log in again
- Check JWT_SECRET matches on backend

#### **5. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5001
```
**Solution:**
```bash
# Find process using port 5001
lsof -i :5001

# Kill the process (macOS/Linux)
kill -9 <PID>

# Or use different port
PORT=5002 npm run server
```

**Happy Chatting!**
