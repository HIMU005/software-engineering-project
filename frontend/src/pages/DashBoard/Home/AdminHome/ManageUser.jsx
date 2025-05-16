import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import UserRow from "../../../../components/DashBoard/TableRow/UserRow";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  const handleDelete = async (userId) => {
    // Implement delete functionality here if needed
    console.log("Delete user with id:", userId);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Helmet>
        <title>Work Provider || Dashboard | Manage Users</title>
      </Helmet>

      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap py-2 font-medium text-gray-900">
              Registered at
            </th>
            <th className="whitespace-nowrap py-2 font-medium text-gray-900">
              Role
            </th>
            <th className="whitespace-nowrap py-2 font-medium text-gray-900">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <UserRow
              key={user?._id}
              user={user}
              handleDelete={() => handleDelete(user._id)}
              refetch={refetch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
