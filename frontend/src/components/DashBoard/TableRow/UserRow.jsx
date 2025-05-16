import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserRow = ({ user, handleDelete, refetch }) => {
  const [newRole, setNewRole] = useState(user?.role);
  const axiosSecure = useAxiosSecure();

  const handleRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleUpdate = async () => {
    if (user?.role === "admin") {
      toast.error("You can't change the role of an admin user");
      refetch();
      return;
    }

    try {
      const { data } = await axiosSecure.patch(`/user/role/${user?.email}`, {
        newRole,
      });
      if (data.modifiedCount) {
        toast.success("User role updated successfully");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <tr>
      <td className="whitespace-nowrap ml-6 text-center py-2 font-medium text-gray-900">
        {user?.displayName}
      </td>
      <td className="whitespace-nowrap ml-6 text-center py-2 text-gray-700">
        later Update
      </td>
      <td>
        <select
          name="newRole"
          value={newRole}
          onChange={handleRoleChange}
          disabled={user?.role === "admin"}
          className={`
            ${user?.role === "admin" ? "text-blue-500" : ""}
            ${user?.role === "worker" ? "text-green-500" : ""}
            ${user?.role === "task-creator" ? "text-red-500" : ""}
          `}
        >
          <option className="text-blue-500" value="admin">
            Admin
          </option>
          <option className="text-green-500" value="worker">
            Worker
          </option>
          <option className="text-red-500" value="task-creator">
            Task Creator
          </option>
        </select>
      </td>
      <td className="whitespace-nowrap ml-6 text-center py-2 text-gray-700">
        <button onClick={handleUpdate} className="btn btn-info btn-outline">
          Update
        </button>
      </td>
      <td className="whitespace-nowrap ml-6 text-center py-2 text-gray-700">
        <button onClick={handleDelete} className="btn btn-warning btn-outline">
          Delete
        </button>
      </td>
    </tr>
  );
};

UserRow.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default UserRow;
