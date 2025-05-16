import PropTypes from 'prop-types';
import { useState } from 'react';
import TaskDetailsModal from '../TaskCreator/TaskDetailsModal';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ReviewTaskRow = ({ reviewTask, idx, refetch }) => {
    const [isOpen, setIsOpen] = useState(false)
    const axiosSecure = useAxiosSecure();
    const modalOpen = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    const { workerEmail, taskName, amount, status } = reviewTask;
    const handleAccept = async () => {
        const workerCoin = await axiosSecure.get(`/user/${reviewTask?.worker?.email}`)
        const newCoin = workerCoin?.data?.coin + reviewTask?.amount;

        // update the status and update the coin 
        try {
            const { data } = await axiosSecure.patch(`/user/${reviewTask?.worker?.email}`, { newCoin })
            if (data.modifiedCount) {
                const acceptSubmission = await axiosSecure.patch(`/submission/${reviewTask._id}`, { status: 'accepted' })
                if (acceptSubmission.data.modifiedCount) {
                    toast.success("This submission has accepted");
                    refetch();
                }
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }

    const handleDelete = async () => {

        try {
            const { data } = await axiosSecure.patch(`/submission/${reviewTask._id}`, { status: 'rejected' })
            if (data.modifiedCount) {
                toast.success("This submission has rejected");
                refetch();
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }
    return (
        <>
            <tr>
                <td className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900">{idx + 1}</td>
                <td className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900">{workerEmail}</td>
                <td className="whitespace-nowrap px-4 text-center py-2 text-gray-700">{taskName}</td>
                <td className={`whitespace-nowrap px-4 py-2
             ${status === 'pending' ? 'text-blue-500' : ''}
             ${status === 'accepted' ? 'text-green-500' : ''}
             ${status === 'rejected' ? 'text-red-500' : ''}
             
             `}>{status}</td>
                <td className="whitespace-nowrap px-4 text-center py-2 text-gray-700">{amount}</td>
                <td className="whitespace-nowrap px-4 py-2 ">
                    <button onClick={modalOpen} className='btn btn-info'>View</button>
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                    <button onClick={handleAccept} className='btn btn-success'>Accept</button>
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                    <button onClick={handleDelete} className='btn btn-warning'>Reject</button>
                </td>
            </tr>
            <TaskDetailsModal
                isOpen={isOpen}
                closeModal={closeModal}
                reviewTask={reviewTask}
            />
        </>
    );
};

export default ReviewTaskRow;
ReviewTaskRow.propTypes = {
    reviewTask: PropTypes.object,
    idx: PropTypes.number,
    refetch: PropTypes.func,
}