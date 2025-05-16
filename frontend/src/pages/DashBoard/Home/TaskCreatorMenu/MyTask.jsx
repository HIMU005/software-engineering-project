import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import TaskCreatorTableRow from "../../../../components/DashBoard/TableRow/TaskCreatorTableRow";

const MyTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <h2>Loading tasks...</h2>;
  }

  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>Work Provider || Dashboard | My Tasks</title>
      </Helmet>

      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 text-left py-2 font-medium text-gray-900">
              Task Title
            </th>
            <th className="whitespace-nowrap px-4 text-left py-2 font-medium text-gray-900">
              Task Count
            </th>
            <th className="whitespace-nowrap px-4 text-left py-2 font-medium text-gray-900">
              Payable amount
            </th>
            <th className="whitespace-nowrap px-4 text-left py-2 font-medium text-gray-900">
              Action
            </th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <TaskCreatorTableRow key={task._id} task={task} refetch={refetch} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTasks;
