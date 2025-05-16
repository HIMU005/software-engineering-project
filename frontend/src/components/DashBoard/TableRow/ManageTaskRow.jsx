import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TaskModal from "../Admin/TaskModal";

const ManageTaskRow = ({ task, idx, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const modalOpen = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { taskName, taskNumber, amount, taskProvider, _id } = task;

  const handleDelete = async () => {
    try {
      const { data } = await axiosSecure.delete(`/task/${_id}`);
      if (data.deletedCount) {
        toast.success("Task deleted successfully");
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <tr className="text-center">
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {idx}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {taskName}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {taskProvider?.name}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {taskNumber}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{amount}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {taskNumber > 0 ? "Yes" : "No"}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          <button onClick={modalOpen} className="btn btn-info btn-outline">
            View
          </button>
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          <button onClick={handleDelete} className="btn btn-error btn-outline">
            Delete
          </button>
        </td>
      </tr>

      <TaskModal task={task} isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

ManageTaskRow.propTypes = {
  task: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ManageTaskRow;
