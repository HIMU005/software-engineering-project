import PropTypes from 'prop-types';

const TaskModalData = ({ task }) => {
    console.log(task);
    const { amount, completionDate, subInfo, taskDetails, taskImage, taskName, taskNumber, taskProvider } = task;
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

                    <p className="mt-1 text-xs font-medium text-gray-600">By {taskProvider.name}</p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                    <img
                        alt=""
                        // src={taskProvider?.photoURL}
                        src={taskImage}
                        className="size-16 rounded-lg object-cover shadow-sm"
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500"> <span className='font-medium'>Task details:</span>
                    {taskDetails}
                </p>
            </div>
            <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500"> <span className='font-medium'>Submission Info:</span>
                    {subInfo}
                </p>
            </div>

            <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Posted on</dt>
                    <dd className="text-xs text-gray-500">{completionDate}</dd>
                </div>

                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Coin Pay</dt>
                    <dd className="text-xs text-gray-500">{amount}</dd>
                </div>
            </dl>

            <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Task left</dt>
                    <dd className="text-xs text-gray-500">{taskNumber}</dd>
                </div>
            </dl>
        </div>
    );
};

export default TaskModalData;
TaskModalData.propTypes = {
    task: PropTypes.object,

}