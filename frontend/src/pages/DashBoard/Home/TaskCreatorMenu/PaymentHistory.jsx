import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import PaymentDetailsRow from "../../../../components/DashBoard/TableRow/PaymentDetailsRow";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/purchase-coin/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <h2>Loading payment history...</h2>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Helmet>
        <title>Work Provider || Dashboard | Payment History</title>
      </Helmet>

      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              #
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Transaction Id
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Buy Coin
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Pay amount
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Date
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {payments.map((payment, idx) => (
            <PaymentDetailsRow key={payment._id} payment={payment} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
