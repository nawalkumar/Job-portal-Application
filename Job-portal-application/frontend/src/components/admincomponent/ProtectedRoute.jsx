import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * ProtectedRoute
 * Ensures that only authenticated users with the 'Recruiter' role
 * can access specific admin routes.
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Logic remains untouched: Redirect if no user or user is not a Recruiter
    if (!user || user.role !== "Recruiter") {
      navigate("/");
    }
  }, [user, navigate]);

  // Prevent flash of protected content before redirect
  if (!user || user.role !== "Recruiter") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;