import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import ManageTaskRow from "../../../../components/DashBoard/TableRow/ManageTaskRow";

const ManageTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/tasks");
      return data.filter((task) => task.taskNumber > 0);
    },
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Helmet>
        <title>Work Provider || Dashboard | Manage Task</title>
      </Helmet>

      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              #
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Task title
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Task Creator Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Task Count
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Coin Needed
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Availability
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              View
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {tasks.map((task, idx) => (
            <ManageTaskRow
              key={task._id}
              task={task}
              idx={idx}
              refetch={refetch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTasks;
