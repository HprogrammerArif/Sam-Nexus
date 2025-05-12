import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import SocialLogin from "../Login/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import image from "../../assets/images/placeholder.jpg";
import { useState } from "react";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const SignUp = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const navigate = useNavigate();
  const { createUser, saveUser, updateUserProfile, loading, setLoading, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // ✅ Send OTP
  const handleSendOtp = async () => {
    const email = getValues("email");
    if (!email) return toast.error("Please enter your email first");

    try {
      setSendingOtp(true);
      const { data } = await axiosSecure.post("/send-otp", { email });

      if (data.success) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    const email = getValues("email");
    if (!email || !otp) return toast.error("Enter OTP and Email");

    try {
      setVerifyingOtp(true);
      const { data } = await axiosSecure.post("/verify-otp", { email, otp });

      if (data.success) {
        toast.success("OTP verified!");
        setOtpVerified(true);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("OTP verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // ✅ Final Signup Submit
  const onSubmit = async (data) => {
    if (!otpVerified) return toast.error("Please verify your OTP first");

    const { name, email, password } = data;
    const role = "user";

    try {
      setLoading(true);
       await createUser(email, password);

      await updateUserProfile(name, image);
      await saveUser(email, name, image, role);

      toast.success("Signup Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md w-full p-6 rounded-md sm:px-12 bg-gray-100 text-gray-900">
        <div className="mb-2 text-center">
          <h1 className="mb-3 text-4xl text-purple-900 font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to SamNexus</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 border-gray-300 focus:outline-rose-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                type="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 border-gray-300 focus:outline-rose-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>


             {/* Password (Only show if OTP is verified) */}
            
             <div>
                <label htmlFor="password" className="block mb-2 text-sm">Password</label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  type="password"
                  id="password"
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 border-gray-300 focus:outline-rose-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

            {/* Send OTP Button */}
            {!otpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp}
                className="w-full py-3 mt-1 bg-rose-900  text-white rounded"
              >
                {sendingOtp ? "Sending OTP..." : "Send OTP"}
              </button>
            )}

            {/* OTP Verify */}
            {otpSent && !otpVerified && (
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-gray-200 mt-2"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp}
                  className="w-full py-2 mt-2 bg-green-600 text-white rounded"
                >
                  {verifyingOtp ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            )}

           
            
          </div>

          {/* Final Submit (Only if OTP verified) */}
          {otpVerified && (
            <button
              type="submit"
              disabled={loading}
              className="bg-rose-900 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          )}
        </form>

        {/* Social Login */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-xs text-gray-400">Signup with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>

        <div className="flex justify-center items-center space-x-2 border m-2 p-1 border-gray-300 rounded">
          <SocialLogin />
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline font-semibold text-purple-900">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
