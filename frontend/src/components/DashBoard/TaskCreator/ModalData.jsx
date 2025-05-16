import PropTypes from 'prop-types';
const ModalData = ({ reviewTask }) => {
    console.log(reviewTask);
    console.log(reviewTask.worker);
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
                        {reviewTask?.taskName}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-600">By {reviewTask?.worker?.name}</p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                    <img
                        alt=""
                        src={reviewTask?.worker?.image}
                        className="size-16 rounded-lg object-cover shadow-sm"
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500"> <span className='font-medium'>Task details:</span>
                    {reviewTask?.taskDetails}
                </p>
            </div>
            <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500"> <span className='font-medium'>Submission Info:</span>
                    {reviewTask?.subInfo}
                </p>
            </div>

            <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Submitted on</dt>
                    <dd className="text-xs text-gray-500">{reviewTask?.submissionDate}</dd>
                </div>

                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">Coin Pay</dt>
                    <dd className="text-xs text-gray-500">{reviewTask?.amount}</dd>
                </div>
            </dl>
        </div>
    );
};

export default ModalData;
ModalData.propTypes = {
    reviewTask: PropTypes.object,
}