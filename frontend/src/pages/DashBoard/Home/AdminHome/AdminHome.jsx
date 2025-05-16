import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();
  // Fetch Admin Stat Data here
  const { data: adminData = {}, isLoading } = useQuery({
    queryKey: ["statData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stat");
      return data;
    },
  });

  // console.log(adminData);
  const chartData = [
    { name: "Total Users", value: adminData.totalUsers },
    { name: "Total Submissions", value: adminData.totalSubmission },
    { name: "Total Purchases", value: adminData.totalPurchase },
    { name: "Total Tasks", value: adminData.totalTask },
  ];
  // console.log(chartData);

  if (isLoading) return <LoadingSpinner />;
  return (
    <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default AdminStatistics;
