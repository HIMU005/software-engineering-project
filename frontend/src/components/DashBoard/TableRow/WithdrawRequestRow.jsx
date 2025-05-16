import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const WithdrawRequestRow = ({ value, refetch }) => {
  const {
    workerName,
    workerEmail,
    amount,
    coin,
    accountNumber,
    paymentSystem,
    withDrawTime,
    _id,
  } = value;
  const axiosSecure = useAxiosSecure();

  const handleConfirm = async () => {
    try {
      const { data: worker } = await axiosSecure.get(`/user/${workerEmail}`);
      const newCoin = worker?.coin - coin;

      const { data } = await axiosSecure.patch(`/user/${workerEmail}`, {
        newCoin,
      });
      if (data.modifiedCount) {
        const deleteCollection = await axiosSecure.delete(`/withDraw/${_id}`);
        if (deleteCollection.data.deletedCount) {
          toast.success(`$${amount} paid to ${workerName}`);
          refetch();
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <tr className="text-center">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {workerName}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">${amount}</td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{coin}</td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {accountNumber}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {paymentSystem}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {withDrawTime}
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <button onClick={handleConfirm} className="btn btn-success btn-outline">
          Payment Successful
        </button>
      </td>
    </tr>
  );
};

WithdrawRequestRow.propTypes = {
  value: PropTypes.shape({
    workerName: PropTypes.string.isRequired,
    workerEmail: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    coin: PropTypes.number.isRequired,
    accountNumber: PropTypes.string.isRequired,
    paymentSystem: PropTypes.string.isRequired,
    withDrawTime: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default WithdrawRequestRow;
