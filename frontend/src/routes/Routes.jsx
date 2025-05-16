import { createBrowserRouter } from "react-router-dom";

// Layouts
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Main from "../Layouts/Main";

// Pages - Public
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/Home/About";
import Home from "../pages/Home/Home";

// Pages - Dashboard Common
import Profile from "../components/Shared/Profile";
import DashBoardHome from "../pages/DashBoard/Home/DashBoardHome";

// Worker Pages
import ApprovedSubmission from "../pages/DashBoard/Home/WorkerHome/ApprovedSubmission";
import Mysubmission from "../pages/DashBoard/Home/WorkerHome/Mysubmission";
import TaskDetails from "../pages/DashBoard/Home/WorkerHome/TaskDetails";
import TaskList from "../pages/DashBoard/Home/WorkerHome/TaskList";
import WithDraw from "../pages/DashBoard/Home/WorkerHome/WithDraw";

// Task Creator Pages
import AddTask from "../pages/DashBoard/Home/TaskCreatorMenu/AddTask";
import MyTasks from "../pages/DashBoard/Home/TaskCreatorMenu/MyTasks";
import PaymentHistory from "../pages/DashBoard/Home/TaskCreatorMenu/PaymentHistory";
import PurchaseCoin from "../pages/DashBoard/Home/TaskCreatorMenu/PurchaseCoin";
import ReviewATask from "../pages/DashBoard/Home/TaskCreatorMenu/ReviewATask";
import UpdateMyTask from "../pages/DashBoard/Home/TaskCreatorMenu/UpdateMyTask";

// Admin Pages
import ManageTasks from "../pages/DashBoard/Home/AdminHome/ManageTasks";
import ManageUser from "../pages/DashBoard/Home/AdminHome/ManageUser";
import WithDrawRequest from "../pages/DashBoard/Home/AdminHome/WithDrawRequest";

// Route Protection
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import TaskCreatorRoute from "./TaskCreatorRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/dashBoard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Common Dashboard Home
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashBoardHome />
          </PrivateRoute>
        ),
      },

      // Worker Routes
      {
        path: "approved-submission",
        element: (
          <PrivateRoute>
            <ApprovedSubmission />
          </PrivateRoute>
        ),
      },
      {
        path: "task-list",
        element: (
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        ),
      },
      {
        path: "task-details/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "my-submission",
        element: (
          <PrivateRoute>
            <Mysubmission />
          </PrivateRoute>
        ),
      },
      {
        path: "withdraw",
        element: (
          <PrivateRoute>
            <WithDraw />
          </PrivateRoute>
        ),
      },

      // Task Creator Routes
      {
        path: "add-task",
        element: (
          <PrivateRoute>
            <TaskCreatorRoute>
              <AddTask />
            </TaskCreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "reviewTask",
        element: (
          <PrivateRoute>
            <TaskCreatorRoute>
              <ReviewATask />
            </TaskCreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-task",
        element: (
          <PrivateRoute>
            <TaskCreatorRoute>
              <MyTasks />
            </TaskCreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "update/my-task/:id",
        element: (
          <PrivateRoute>
            <TaskCreatorRoute>
              <UpdateMyTask />
            </TaskCreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "purchase-coin",
        element: (
          <PrivateRoute>
            <TaskCreatorRoute>
              <PurchaseCoin />
            </TaskCreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <TaskCreatorRoute>
              <PaymentHistory />
            </TaskCreatorRoute>
          </PrivateRoute>
        ),
      },

      // Admin Routes
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUser />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "withdrawRequest",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <WithDrawRequest />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-tasks",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageTasks />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      // Shared
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);