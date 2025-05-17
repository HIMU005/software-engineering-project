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

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: workerData = {}, isLoading } = useQuery({
    queryKey: ["workerStatData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/worker-stat");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const chartData = [
    { name: "Total Submissions", value: workerData.totalSubmission || 0 },
    { name: "Total Withdrawals", value: workerData.totalWithDraw || 0 },
  ];

  return (
    <div className="worker-home-chart-container">
      <h2 className="text-xl font-semibold mb-4">
        Worker Dashboard Statistics
      </h2>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default WorkerHome;
