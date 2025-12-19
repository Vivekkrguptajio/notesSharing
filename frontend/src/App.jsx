import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/public/login/LogIn";
import SignUpPage from "./pages/public/signup/SignUp";
import NotesPage from "./pages/public/notes/NotesPage";
import BooksPage from "./pages/public/books/BooksPage";
import PYQsPage from "./pages/public/pyqs/PYQsPage";
import AboutPage from "./pages/public/about/AboutPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import UploadPage from "./pages/student/UploadPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageUploaderRequests from "./pages/admin/ManageUploaderRequests";
import ManageResources from "./pages/admin/ManageResources";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ProfilePage from "./pages/student/ProfilePage";
import ManageNotifications from "./pages/admin/ManageNotifications";

import Navbar from "./components/common/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/pyqs" element={<PYQsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/student/upload" element={<UploadPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/notes" element={<ManageResources resourceType="note" title="Manage Notes" />} />
        <Route path="/admin/books" element={<ManageResources resourceType="book" title="Manage Books" />} />
        <Route path="/admin/pyqs" element={<ManageResources resourceType="pyq" title="Manage PYQs" />} />
        <Route path="/admin/uploader-requests" element={<ManageUploaderRequests />} />
        <Route path="/admin/notifications" element={<ManageNotifications />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      </Routes>
    </>
  );
}

export default App;
