import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../../api/imageUpload";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useInfo from "../../../../Hooks/useInfo";

const AddTask = () => {
  const { user } = useAuth();
  const [role, , refetch] = useInfo();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const amount = parseInt(form.amount.value);
    const taskNumber = parseInt(form.taskNumber.value);

    if (role.coin < amount * taskNumber) {
      toast.error(
        "You don't have sufficient coin to create a task!!! You should buy some coin."
      );
      navigate("/dashboard/purchase-coin");
      setLoading(false);
      return;
    }

    const taskName = form.taskName.value;
    const completionDate = startDate.toLocaleDateString();
    const subInfo = form.subInfo.value;
    const image = form.image.files[0];
    const taskDetails = form.taskDetails.value;

    try {
      const taskImage = await imageUpload(image);
      const taskData = {
        taskName,
        taskNumber,
        amount,
        completionDate,
        subInfo,
        taskDetails,
        taskImage,
        taskProvider: {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        },
      };

      console.log(taskData);

      const { data } = await axiosSecure.post("/tasks", taskData);
      if (data.insertedId) {
        const newCoin = role?.coin - taskNumber * amount;
        const update = await axiosSecure.patch(`user/${user?.email}`, {
          newCoin,
        });
        console.log(update);
        if (update.data.modifiedCount) {
          toast.success("Your task added into our server");
          refetch();
          form.reset();
          setStartDate(new Date());
          navigate("/dashboard/my-task");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    setLoading(false);
  };

  // Prevent selecting past dates
  const isDateSelectable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  return (
    <section className="bg-gray-100">
      <Helmet>
        <title> Work Provider || Dashboard | Add task </title>
      </Helmet>
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
                  id="taskName"
                  name="taskName"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  placeholder="Task name"
                  type="text"
                  required
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
                  id="taskNumber"
                  name="taskNumber"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  placeholder="Task quantity"
                  type="number"
                  min={1}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Payable amount
                </label>
                <input
                  id="amount"
                  name="amount"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  placeholder="Payable amount"
                  type="number"
                  min={1}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="completionDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deadline
                </label>
                <DatePicker
                  id="completionDate"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  filterDate={isDateSelectable}
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
                  id="subInfo"
                  name="subInfo"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  placeholder="Submission Information"
                  type="text"
                  required
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
                  className="border-primary border-2 px-2 py-3"
                  required
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
                id="taskDetails"
                name="taskDetails"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                placeholder="Message"
                rows="8"
                required
              ></textarea>
            </div>

            <div className="mt-4">
              <input
                type="submit"
                value={loading ? "Adding..." : "Add Task"}
                disabled={loading}
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddTask;
