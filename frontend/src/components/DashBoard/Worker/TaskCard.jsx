import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TaskCard = ({ work }) => {
    const { taskName, taskProvider, completionDate, amount, taskNumber } = work;

    return (
        <div
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
        >
            <span
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
            ></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {taskName}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-600">{taskProvider.name}</p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                    <img
                        alt=""
                        src={taskProvider.photoURL}
                        className="size-16 rounded-lg object-cover shadow-sm"
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500">

                </p>
            </div>

            <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Last Date of submission</dt>
                    <dd className="text-xs text-gray-500">{completionDate}</dd>
                </div>

                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Payment</dt>
                    <dt className="text-xs text-gray-500">{amount}</dt>
                </div>
            </dl>

            <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Task left</dt>
                    <dt className="text-xs text-gray-500">{taskNumber}</dt>
                </div>

                <div className="flex justify-end">
                    <Link
                        to={`/dashboard/task-details/${work._id}`}
                        // className="inline-block rounded btn btn-accent btn-outline px-4 py-0 text-xs font-medium"
                        className='btn btn-info btn-outline '
                    >View Details</Link>
                </div>
            </dl>
        </div>
    );
};

export default TaskCard;
TaskCard.propTypes = {
    work: PropTypes.object,
}