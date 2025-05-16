import PropTypes from 'prop-types';

const TopEarnerCard = ({ user }) => {
    return (
        <div className="group relative block overflow-hidden">


            <img
                src={user.photoURL}
                alt=""
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-gray-100 bg-white p-6">
                <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"> {user.role} </span>

                <h3 className="mt-4 text-lg font-medium text-gray-900">{user?.displayName} </h3>

                <p className="mt-1.5 text-sm text-gray-700"> Total coin: {user?.coin}</p>

            </div>
        </div>
    );
};

export default TopEarnerCard;
TopEarnerCard.propTypes = {
    user: PropTypes.object,
}