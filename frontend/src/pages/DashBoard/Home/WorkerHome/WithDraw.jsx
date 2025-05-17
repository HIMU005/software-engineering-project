import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const WithDraw = () => {
  const [coin, setCoin] = useState(0);
  const [amount, setAmount] = useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleCoinChange = (e) => {
    const coinValue = e.target.value;
    setCoin(coinValue);
    setAmount(coinValue / 20); // Adjust multiplier as needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const coinNumber = parseInt(form.coin.value);

    if (coinNumber < 20 || coinNumber > 300) {
      toast.error("You can only withdraw between 20 and 300");
      return;
    }

    const amount = coin / 20;
    const paymentSystem = form.method.value;
    const accountNumber = form.accountNumber.value;
    const workerName = user?.displayName;
    const workerEmail = user?.email;
    const withDrawTime = new Date().toLocaleDateString();

    const withDrawData = {
      amount,
      coin: coinNumber,
      paymentSystem,
      accountNumber,
      workerEmail,
      workerName,
      withDrawTime,
    };

    try {
      const { data } = await axiosSecure.post("/withDraw", withDrawData);
      if (data?.insertedId) {
        toast.success("Request approved wait for Admin Approval");
        form.reset();
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <section className="bg-gray-100">
      <Helmet>
        <title> Work Provider || Dashboard | Withdraw </title>
      </Helmet>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <label
                  htmlFor="coin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Coin To Withdraw
                </label>
                <input
                  name="coin"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  placeholder="Withdraw Coin amount"
                  type="number"
                  id="coin"
                  onChange={handleCoinChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Withdraw amount $
                </label>
                <input
                  name="amount"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  placeholder="Amount"
                  type="number"
                  id="amount"
                  disabled
                  value={amount}
                  readOnly
                />
              </div>

              <div>
                <label
                  htmlFor="method"
                  className="block text-sm font-medium text-gray-700"
                >
                  Choose your payment system
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  name="method"
                  id="method"
                >
                  <option value="bkash">Bkash</option>
                  <option value="rocket">Rocket</option>
                  <option value="nagad">Nagad</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account Number
                </label>
                <input
                  name="accountNumber"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  placeholder="Submission Information"
                  type="number"
                  id="accountNumber"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <input
                type="submit"
                value="Withdraw"
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WithDraw;
