import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChooseModality from "./pages/ChooseModality";
import XRayUpload from "./pages/XRayUpload";
import Products from "./pages/Products";
import Impact from "./pages/Impact";
import Evidence from "./pages/Evidence";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import ProtectedRoute, { SignIn, SignUp } from "./components/AuthComponents";
import SelectRole from "./components/SelectRole";
import ChatbotPopup from "./components/Chatbot";

// Role-based route wrapper
interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/select-role" replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (userRole === "hospital") {
      return <Navigate to="/hospital" replace />;
    } else {
      return <Navigate to="/start" replace />;
    }
  }

  return <>{children}</>;
};

// Dashboard router - redirects to appropriate dashboard based on role
const DashboardRouter: React.FC = () => {
  const userRole = localStorage.getItem("userRole");
  
  if (userRole === "admin") {
    return <Navigate to="/admin" replace />;
  } else if (userRole === "hospital") {
    return <Navigate to="/hospital" replace />;
  } else {
    return <Navigate to="/start" replace />;
  }
};

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Wrist Fracture and Metal Detection System";
        metaDescription = "AI-powered medical imaging analysis";
        break;
      case "/admin":
        title = "Admin Dashboard - Wrist Fracture and Metal Detection System";
        break;
      case "/hospital":
        title = "Hospital Dashboard - Wrist Fracture and Metal Detection System";
        break;
      case "/start":
        title = "Choose Analysis - Wrist Fracture and Metal Detection System";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard Router - Redirects based on role */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </RoleProtectedRoute>
        } />

        {/* Hospital Routes */}
        <Route path="/hospital" element={
          <RoleProtectedRoute allowedRoles={["hospital"]}>
            <HospitalDashboard />
          </RoleProtectedRoute>
        } />

        {/* Client Routes (also accessible by hospital and admin for analysis) */}
        <Route path="/start" element={
          <ProtectedRoute>
            <ChooseModality />
          </ProtectedRoute>
        } />
        <Route path="/xray-upload" element={
          <ProtectedRoute>
            <XRayUpload />
          </ProtectedRoute>
        } />

        {/* Legacy route */}
        <Route path="/protected" element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        } />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatbotPopup />
    </>
  );
}

export default App;
