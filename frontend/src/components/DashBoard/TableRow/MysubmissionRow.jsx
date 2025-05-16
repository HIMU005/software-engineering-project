import PropTypes from 'prop-types';
const MysubmissionRow = ({ mySubmit, idx }) => {
    const { taskId, taskName, taskProvider, amount, status } = mySubmit;
    return (
        <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{idx}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{taskId}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{taskName}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700" >{taskProvider.name} </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700" >{amount}</td>
            <td className={`whitespace-nowrap px-4 py-2
             ${status === 'pending' ? 'text-blue-500' : ''}
             ${status === 'accepted' ? 'text-green-500' : ''}
             ${status === 'rejected' ? 'text-red-500' : ''}
             
             `}>{status}</td>

        </tr >
    );
};

export default MysubmissionRow;
MysubmissionRow.propTypes = {
    mySubmit: PropTypes.object,
    idx: PropTypes.number,
}