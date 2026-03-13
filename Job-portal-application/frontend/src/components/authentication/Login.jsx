import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Navigate, useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react"; // Better spinner icon

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-gray-200 rounded-xl p-8 my-10 shadow-sm bg-[#F3F4F6]/30"
        >
          <h1 className="font-bold text-2xl mb-5 text-center text-[#059669]">
            Login
          </h1>

          <div className="my-4">
            <Label className="text-[#1F2937]">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
              className="focus-visible:ring-[#10B981] border-gray-300"
            />
          </div>

          <div className="my-4">
            <Label className="text-[#1F2937]">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="focus-visible:ring-[#10B981] border-gray-300"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-6 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-[#10B981] w-4 h-4"
                />
                <Label className="text-[#1F2937] cursor-pointer">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-[#10B981] w-4 h-4"
                />
                <Label className="text-[#1F2937] cursor-pointer">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <button className="w-full py-3 my-3 text-white flex items-center justify-center bg-[#059669] rounded-md cursor-not-allowed">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 my-3 text-white font-semibold bg-[#10B981] hover:bg-[#059669] rounded-md transition-all duration-300 shadow-md"
            >
              Login
            </button>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-[#1F2937]">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#059669] font-bold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;