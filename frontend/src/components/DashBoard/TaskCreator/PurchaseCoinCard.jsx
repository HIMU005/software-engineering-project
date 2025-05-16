import PropTypes from 'prop-types'; // ES6
import { useState } from 'react';
import PurchaseCoinModal from '../Payment/PurchaseCoinModal';

const PurchaseCoinCard = ({ coinNumber, price }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <div className="p-4 bg-amber-500 rounded-xl space-y-2 ">
            <h2 className='text-2xl font-medium'>Price: {price}</h2>
            <h3 className='text-2xl font-medium'>Coin: {coinNumber}</h3>
            <button className='btn btn-secondary '
                onClick={() => setIsOpen(true)}
            >Purchase</button>
            <PurchaseCoinModal
                isOpen={isOpen}
                closeModal={closeModal}
                price={price}
                coinNumber={coinNumber}
            />
        </div>
    );
};

PurchaseCoinCard.propTypes = {
    coinNumber: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
};

export default PurchaseCoinCard;
