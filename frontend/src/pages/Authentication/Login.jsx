import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const axiosCommon = useAxiosCommon();
  const { signInUser, loading, setLoading, GoogleLogin, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      const result = await signInUser(email, password);
      setUser(result.user);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await GoogleLogin();
      const user = result?.user;
      setUser(user);

      const { data } = await axiosCommon.get(`/user/${user.email}`);
      if (!data) {
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "worker",
          coin: 10,
        };
        const userResponse = await axiosCommon.post("/users", userInfo);
        if (userResponse?.data?.insertedId) {
          toast.success("Your information has been saved in our database.");
        }
      }

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Work Provider || Login</title>
      </Helmet>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Work"
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl w-full">
              <div className="text-blue-600 mb-4">
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.41 10.3847C..." fill="currentColor" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Squid 🦑
              </h1>

              <p className="mt-4 text-gray-500">Login to continue.</p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <input
                    type="submit"
                    disabled={loading}
                    value="Login"
                    className="disabled:cursor-not-allowed inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  />
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don’t have an account?{" "}
                    <Link to="/sign-up" className="text-gray-700 underline">
                      Sign Up
                    </Link>
                    .
                  </p>
                </div>
              </form>

              <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                <p className="px-3 text-sm text-gray-500">Or login with</p>
                <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
              </div>

              <button
                disabled={loading}
                onClick={handleGoogleSignIn}
                className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border mt-4 p-2 border-gray-300 rounded cursor-pointer w-full"
              >
                <FcGoogle size={24} />
                <span>Continue with Google</span>
              </button>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Login;
