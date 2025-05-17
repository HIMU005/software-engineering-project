import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

import { Helmet } from "react-helmet-async";

const ApprovedSubmission = () => {
  const axiosSecure = useAxiosSecure();
  const { data: approvedSubmissions = [] } = useQuery({
    queryKey: ["approvedSubmissions"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/submissions");
      return data.filter((task) => task.status === "accepted");
    },
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Helmet>
        <title> Work Provider || Dashboard | Approved submission </title>
      </Helmet>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Task Title
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Payable amount
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Creator Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {approvedSubmissions.map((approvedSubmission) => (
            <tr key={approvedSubmission._id} className="text-center">
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {approvedSubmission?.taskName}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {approvedSubmission?.amount}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {approvedSubmission?.taskProvider?.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-green-400">
                {approvedSubmission?.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedSubmission;
