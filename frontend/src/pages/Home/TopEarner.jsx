import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import TopEarnerCard from "../../components/Home/TopEarnerCard";

const TopEarner = () => {
  const axiosCommon = useAxiosCommon();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/usersNormal");
      const sortedData = data.sort((a, b) => a.coin - b.coin);
      return sortedData.length > 6 ? sortedData.slice(0, 6) : sortedData;
    },
  });
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
        Top <span className="text-blue-500">Earner</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <TopEarnerCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default TopEarner;
