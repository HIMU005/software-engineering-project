import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useInfo from "../Hooks/useInfo";

const TaskCreatorRoute = ({ children }) => {
  const [role, isLoading] = useInfo();
  const { user, loading } = useAuth();

  if (isLoading || loading) return <h3>Wait</h3>;

  if (role?.role === "task-creator" && user) return children;

  return <Navigate to="/dashboard" />;
};

TaskCreatorRoute.propTypes = {
  children: PropTypes.element,
};

export default TaskCreatorRoute;