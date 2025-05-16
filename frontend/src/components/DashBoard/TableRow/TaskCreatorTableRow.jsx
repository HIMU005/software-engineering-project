import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TaskCreatorTableRow = ({ task }) => {
  const { taskName, taskNumber, amount, _id } = task;

  // Optional: You might want to add handlers for Delete with confirmation and call refetch after deletion.

  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {taskName}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {taskNumber}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{amount}</td>
      <td className="whitespace-nowrap px-4 py-2">
        <Link
          to={`/dashboard/update/my-task/${_id}`}
          className="inline-block rounded btn btn-accent btn-outline px-4 py-0 text-xs font-medium"
        >
          Update
        </Link>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <button
          // onClick={handleDelete} // Add your delete handler here
          className="inline-block rounded btn btn-error btn-outline px-4 py-0 text-xs font-medium"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskCreatorTableRow;

TaskCreatorTableRow.propTypes = {
  task: PropTypes.shape({
    taskName: PropTypes.string.isRequired,
    taskNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
