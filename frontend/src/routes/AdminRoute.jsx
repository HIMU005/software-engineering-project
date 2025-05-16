import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useInfo from "../Hooks/useInfo";

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useInfo();
  const { user, loading: authLoading } = useAuth();

  if (isRoleLoading || authLoading) return <h3>Wait</h3>;

  if (user && role?.role === "admin") return children;

  return <Navigate to="/dashboard" />;
};

AdminRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AdminRoute;