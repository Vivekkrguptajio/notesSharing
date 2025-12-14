import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/public/login/Login";
import SignUpPage from "./pages/public/signup/SignUp";
import NotesPage from "./pages/public/notes/NotesPage";
import BooksPage from "./pages/public/books/BooksPage";
import PYQsPage from "./pages/public/pyqs/PYQsPage";
import AboutPage from "./pages/public/about/AboutPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/pyqs" element={<PYQsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
    </Routes>
  );
}

export default App;
