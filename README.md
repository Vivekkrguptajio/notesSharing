# 📚 CampusNotes

A comprehensive full-stack web application for students to share and access academic materials including notes, books, and previous year question papers (PYQs). Built with the MERN stack (MongoDB, Express.js, React, Node.js).

## ✨ Features

### 👤 User Management
- **Role-Based Authentication**: Student, Teacher, and Admin roles
- **Secure Registration & Login**: JWT-based authentication with bcrypt password hashing
- **Profile Management**: Edit personal details, branch, and semester
- **User Blocking**: Admins can block/unblock users

### 📤 Upload System
- **Uploader Request System**: Students can request uploader privileges
- **Admin Approval**: Admins review and approve/reject uploader requests
- **Multi-Format Support**: Upload Notes, Books, and PYQs
- **Google Drive Integration**: Files stored securely on Google Drive
- **Metadata Management**: Subject, topic, branch, semester, and file type tracking

### 📥 Download & Browse
- **Resource Browsing**: Separate pages for Notes, Books, and PYQs
- **Advanced Filtering**: Filter by subject, branch, semester, file type, and date range
- **Search Functionality**: Quick search across all resources
- **Download Tracking**: Track user download history
- **View & Download**: Preview or download files directly

### 📝 Note Request System
- **Student Requests**: Students can request specific notes/materials
- **Uploader Notifications**: All uploaders see pending requests
- **Fulfill or Dismiss**: Uploaders can upload requested materials or dismiss requests
- **Status Tracking**: Track request status (Pending/Fulfilled)

### 💬 Feedback System
- **Student Feedback**: Submit feedback and feature requests
- **Admin Dashboard**: View and manage all feedback submissions
- **Responsive UI**: Mobile and desktop optimized feedback interface

### 📊 Admin Dashboard
- **User Management**: View, block/unblock users with advanced filters
- **Resource Management**: Manage all uploaded Notes, Books, and PYQs
- **Uploader Requests**: Approve or reject uploader applications
- **Feedback Management**: View and respond to user feedback
- **Statistics**: View platform statistics and analytics

### 🎨 UI/UX Features
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Dark Mode Elements**: Premium glassmorphism effects
- **Top Contributors**: Display top 3 uploaders on landing page
- **Uploader Guidelines**: Warning card for uploaders about content policies

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Google Drive API** - File storage
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
notesSharing/
├── backend/
│   ├── src/
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   └── app.js          # Express app configuration
│   ├── server.js           # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/          # Page components
    │   │   ├── admin/      # Admin pages
    │   │   ├── student/    # Student pages
    │   │   ├── teacher/    # Teacher pages
    │   │   └── public/     # Public pages
    │   ├── api/            # API service functions
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # Entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google Drive API credentials
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notesSharing
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file in backend directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_DRIVE_CLIENT_ID=your_google_client_id
   GOOGLE_DRIVE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_DRIVE_REDIRECT_URI=your_redirect_uri
   GOOGLE_DRIVE_REFRESH_TOKEN=your_refresh_token
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

   Create `.env` file in frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   App runs on `http://localhost:5173`

## 📋 Available Branches
- **CSE** - Computer Science Engineering
- **CE** - Civil Engineering
- **ME** - Mechanical Engineering
- **EE** - Electrical Engineering

## 🔐 Default Admin Account
To create an admin account, use the signup endpoint with role set to "admin":
```json
{
  "fullName": "Admin Name",
  "email": "admin@example.com",
  "registrationNumber": "ADMIN001",
  "branch": "CSE",
  "semester": 1,
  "password": "securepassword",
  "role": "admin"
}
```

## 🎯 Key API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Upload
- `POST /api/upload/notes` - Upload notes
- `POST /api/upload/books` - Upload books
- `POST /api/upload/pyqs` - Upload PYQs
- `GET /api/upload/notes` - Get all notes
- `GET /api/upload/top-uploaders` - Get top 3 uploaders

### Download
- `POST /api/download/track` - Track download
- `GET /api/download/history/:userId` - Get user's download history

### Uploader Requests
- `POST /api/uploader/request` - Submit uploader request
- `GET /api/uploader/requests` - Get all requests (Admin)
- `PATCH /api/uploader/approve/:id` - Approve request
- `PATCH /api/uploader/reject/:id` - Reject request

### Note Requests
- `POST /api/note-requests` - Create note request
- `GET /api/note-requests/student/:userId` - Get student's requests
- `GET /api/note-requests/uploader` - Get all pending requests
- `DELETE /api/note-requests/:id` - Dismiss request

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/all` - Get all feedback (Admin)
- `PATCH /api/feedback/:id/status` - Update feedback status

### Admin
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users/:id/block` - Block user
- `PATCH /api/admin/users/:id/unblock` - Unblock user

## 🎨 Features Highlights

### Student Dashboard
- Quick access to Notes, Books, and PYQs
- Request Notes functionality
- View personal requests and their status
- My Uploads section (for uploaders)
- My Downloads history
- Submit feedback

### Admin Dashboard
- User management with filters
- Resource management (Notes, Books, PYQs)
- Uploader request approval system
- Feedback management
- Platform statistics

### Upload Page
- Separate forms for Notes, Books, and PYQs
- Google Drive integration
- Metadata input (subject, topic, branch, semester)
- File type selection

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Role-based access control
- Input validation
- CORS configuration

## 📱 Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Touch-friendly interfaces
- Adaptive navigation

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the ISC License.

## 👨‍💻 Developer
Made with ❤️ by **Vivek Kumar Gupta**

Connect: [Instagram](https://instagram.com/kumarvivek.ai)

## 🙏 Acknowledgments
- React team for the amazing library
- Tailwind CSS for the utility-first framework
- MongoDB team for the database
- Google Drive API for file storage
- All contributors and users

---

**Note**: This is an educational project designed to facilitate academic resource sharing among students.
