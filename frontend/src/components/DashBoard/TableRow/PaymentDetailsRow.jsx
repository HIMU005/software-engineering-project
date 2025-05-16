import PropTypes from 'prop-types';
const PaymentDetailsRow = ({ payment, idx }) => {
    const { transactionId, coinNumber, price, date } = payment;

    return (
        <tr className={`${idx % 2 ? 'text-green-400' : 'text-orange-400'}`}>
            <td className="whitespace-nowrap text-center px-4 py-2 font-medium">{idx + 1} </td>
            <td className="whitespace-nowrap text-center px-4 py-2 font-medium">{transactionId} </td>
            <td className="whitespace-nowrap text-center px-4 py-2">{coinNumber}</td>
            <td className="whitespace-nowrap text-center px-4 py-2">{price}</td>
            <td className="whitespace-nowrap text-center px-4 py-2">{date}</td>
        </tr>
    );
};

export default PaymentDetailsRow;

PaymentDetailsRow.propTypes = {
    payment: PropTypes.object,
    idx: PropTypes.number,
}