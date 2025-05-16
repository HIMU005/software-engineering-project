import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { imageUpload } from "../../api/imageUpload";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loading, createUser, updateUserProfile, setLoading, GoogleLogin } =
    useAuth();
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    const { role, name, email, password, image } = data;
    const coin = role === "worker" ? 10 : 50;

    try {
      const photo = await imageUpload(image[0]);
      await createUser(email, password);
      await updateUserProfile(name, photo);
      const userInfo = {
        displayName: name,
        email,
        photoURL: photo,
        role,
        coin,
      };

      const res = await axiosCommon.post("/users", userInfo);
      if (res.data.insertedId) {
        toast.success("Your information was saved successfully.");
        reset();
      }
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await GoogleLogin();
      const { email, displayName, photoURL } = result.user;

      const { data } = await axiosCommon.get(`/user/${email}`);
      if (!data) {
        const userInfo = {
          displayName,
          email,
          photoURL,
          role: "worker",
          coin: 10,
        };
        const res = await axiosCommon.post("/users", userInfo);
        if (res.data.insertedId) {
          toast.success("Your information was saved successfully.");
        }
      }
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Work Provider || Register</title>
      </Helmet>

      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Squid 🦑
              </h1>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                {/* Name */}
                <div className="col-span-6">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    {...register("name", { required: true })}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>

                {/* Email */}
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
                    {...register("email", { required: true })}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>

                {/* Password */}
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
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be at least 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password must be under 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must contain uppercase, lowercase, number, and
                      special character
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="col-span-6">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    {...register("image", { required: true })}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200"
                  />
                  {errors.image && (
                    <span className="text-red-600">Image is required</span>
                  )}
                </div>

                {/* Role Select */}
                <div className="col-span-6">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Choose your role
                  </label>
                  <select
                    {...register("role", { required: true })}
                    id="role"
                    className="w-full px-3 py-2 border rounded-md bg-gray-200"
                  >
                    <option value="worker">Worker</option>
                    <option value="task-creator">Task Creator</option>
                  </select>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <input
                    type="submit"
                    disabled={loading}
                    value="Create an account"
                    className="inline-block rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 disabled:opacity-60"
                  />
                </div>
              </form>

              <p className="mt-4 text-sm text-gray-500">
                Already have an account?
                <Link to="/login" className="text-gray-700 underline ml-1">
                  Log in
                </Link>
                .
              </p>

              {/* Google Signin */}
              <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px bg-gray-300"></div>
                <p className="px-3 text-sm text-gray-400">
                  Signup with social accounts
                </p>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="mt-2 flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 disabled:cursor-not-allowed"
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

export default Register;
