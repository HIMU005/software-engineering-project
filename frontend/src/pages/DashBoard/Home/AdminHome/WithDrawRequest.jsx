import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import WithdrawRequestRow from "../../../../components/DashBoard/TableRow/WithdrawRequestRow";

const WithDrawRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: withdrawRequests = [], refetch } = useQuery({
    queryKey: ["withdrawRequests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/withDraw");
      return data;
    },
  });

  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>Work Provider || Dashboard | Withdraw Request</title>
      </Helmet>

      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Worker Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Withdraw Coin
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Withdraw Amount
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Payment Number
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Payment System
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Withdraw Time
            </th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {withdrawRequests.map((withdrawRequest) => (
            <WithdrawRequestRow
              key={withdrawRequest._id}
              value={withdrawRequest}
              refetch={refetch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithDrawRequest;
