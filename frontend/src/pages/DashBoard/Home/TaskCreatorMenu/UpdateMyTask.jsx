import { useQuery } from "@tanstack/react-query";
import { parse } from "date-fns";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const UpdateMyTask = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: taskData = {}, isLoading } = useQuery({
    queryKey: ["taskData", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task/${id}`);
      return data;
    },
  });

  const { amount, completionDate, subInfo, taskDetails, taskName, taskNumber } =
    taskData;

  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if (completionDate) {
      const parsedDate = parse(completionDate, "M/d/yyyy", new Date());
      setStartDate(parsedDate);
    }
  }, [completionDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updateTask = {
      taskName: form.taskName.value,
      subInfo: form.subInfo.value,
      taskDetails: form.taskDetails.value,
    };

    try {
      const { data } = await axiosSecure.patch(
        `/task/${taskData._id}`,
        updateTask
      );
      if (data.modifiedCount) {
        toast.success("Task Data successfully updated and saved in our server");
        navigate("/dashboard/my-task");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <div>Loading task data...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Work Provider || Dashboard | Update Task</title>
      </Helmet>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="taskName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Task Name
                  </label>
                  <input
                    name="taskName"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    placeholder="Task name"
                    type="text"
                    id="taskName"
                    required
                    defaultValue={taskName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="taskNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Task Quantity
                  </label>
                  <input
                    name="taskNumber"
                    disabled
                    className="w-full px-3 cursor-not-allowed py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    placeholder="Task quantity"
                    type="number"
                    id="taskNumber"
                    required
                    defaultValue={taskNumber}
                  />
                </div>

                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Payable Amount
                  </label>
                  <input
                    name="amount"
                    disabled
                    className="w-full px-3 cursor-not-allowed py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    placeholder="Amount"
                    type="number"
                    id="amount"
                    required
                    defaultValue={amount}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Deadline
                  </label>
                  <DatePicker
                    disabled
                    className="w-full px-3 cursor-not-allowed py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subInfo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Submission Information
                  </label>
                  <input
                    name="subInfo"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    placeholder="Submission Information"
                    type="text"
                    id="subInfo"
                    required
                    defaultValue={subInfo}
                  />
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Image:
                  </label>
                  <input
                    className="border-primary border-2 cursor-not-allowed px-2 py-3"
                    disabled
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="taskDetails"
                  className="block text-sm font-medium text-gray-700"
                >
                  Task Details
                </label>
                <textarea
                  name="taskDetails"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  placeholder="Message"
                  rows="8"
                  id="taskDetails"
                  required
                  defaultValue={taskDetails}
                ></textarea>
              </div>

              <div className="mt-4">
                <input
                  type="submit"
                  value="Update Task"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateMyTask;
