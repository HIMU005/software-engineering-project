import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const TaskDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const { data: singleWork = {}, isLoading } = useQuery({
    queryKey: ["singleWork", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task/${id}`);
      return data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subInfo = e.target.subInfo.value;

    const submissionDetails = {
      taskId: singleWork._id,
      taskName: singleWork?.taskName,
      taskDetails: singleWork?.taskDetails,
      taskImage: singleWork?.taskImage,
      amount: singleWork?.amount,
      subInfo,
      workerEmail: user?.email,
      worker: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      taskProvider: {
        name: singleWork?.taskProvider?.name,
        email: singleWork?.taskProvider?.email,
      },
      submissionDate: startDate.toLocaleDateString(),
      status: "pending",
    };

    try {
      const { data } = await axiosSecure.post(
        "/submissions",
        submissionDetails
      );
      if (data.insertedId) {
        toast.success(
          "Your task submission has registered. Wait for Task Provider response."
        );
        navigate("/dashBoard/my-submission");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or use a loading spinner component
  }

  return (
    <section className="bg-gray-100">
      <Helmet>
        <title> Work Provider || Dashboard | Task details </title>
      </Helmet>

      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {/* Task Id */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Task ID
                </label>
                <input
                  name="taskId"
                  disabled
                  className="w-full px-3 cursor-not-allowed py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  type="text"
                  defaultValue={singleWork._id}
                />
              </div>

              {/* Task Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Task Title
                </label>
                <input
                  name="taskName"
                  disabled
                  className="w-full px-3 py-2 border cursor-not-allowed rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  type="text"
                  defaultValue={singleWork?.taskName}
                />
              </div>

              {/* Task Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Task Details
                </label>
                <input
                  name="taskDetails"
                  disabled
                  className="w-full px-3 py-2 border cursor-not-allowed rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  type="text"
                  defaultValue={singleWork?.taskDetails}
                />
              </div>

              {/* Task Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Task Image Link
                </label>
                <input
                  name="taskImage"
                  disabled
                  className="w-full px-3 py-2 cursor-not-allowed border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  type="text"
                  defaultValue={singleWork?.taskImage}
                />
              </div>

              {/* Payable Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payable Amount
                </label>
                <input
                  name="amount"
                  disabled
                  className="w-full px-3 cursor-not-allowed py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  type="number"
                  defaultValue={singleWork?.amount}
                />
              </div>

              {/* Worker Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Worker Name
                </label>
                <input
                  name="workerName"
                  disabled
                  className="w-full px-3 py-2 cursor-not-allowed border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  type="text"
                  defaultValue={user?.displayName}
                />
              </div>

              {/* Task Creator Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Task Creator Name
                </label>
                <input
                  name="taskProviderName"
                  disabled
                  className="w-full px-3 cursor-not-allowed py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  type="text"
                  defaultValue={singleWork?.taskProvider?.name}
                />
              </div>

              {/* Task Creator Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Task Creator Email
                </label>
                <input
                  name="taskProviderEmail"
                  disabled
                  className="w-full px-3 py-2 cursor-not-allowed border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  type="text"
                  defaultValue={singleWork?.taskProvider?.email}
                />
              </div>

              {/* Submission Date */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Submission Date
                </label>
                <DatePicker
                  className="w-full cursor-not-allowed px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  disabled
                />
              </div>
            </div>

            {/* Submission Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Submission Information
              </label>
              <textarea
                name="subInfo"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-white text-gray-900"
                placeholder="Message"
                rows="8"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <input
                type="submit"
                value="Add Task"
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TaskDetails;
