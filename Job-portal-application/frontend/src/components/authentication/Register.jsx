import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react"; // Modern spinner

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("pancard", input.pancard);
    formData.append("adharcard", input.adharcard);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 ">
        {/* Kept original w-1/2 layout, improved border and shadow */}
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-gray-200 rounded-xl p-8 my-10 shadow-sm bg-[#F3F4F6]/20"
        >
          <h1 className="font-bold text-2xl mb-6 text-center text-[#059669]">
            Create Account
          </h1>

          <div className="space-y-4">
            <div>
              <Label className="text-[#1F2937]">Fullname</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="focus-visible:ring-[#10B981] border-gray-300 mt-1"
              />
            </div>

            <div>
              <Label className="text-[#1F2937]">Email Address</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="johndoe@gmail.com"
                className="focus-visible:ring-[#10B981] border-gray-300 mt-1"
              />
            </div>

            <div>
              <Label className="text-[#1F2937]">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="********"
                className="focus-visible:ring-[#10B981] border-gray-300 mt-1"
              />
            </div>

            <div>
              <Label className="text-[#1F2937]">PAN Card Number</Label>
              <Input
                type="text"
                value={input.pancard}
                name="pancard"
                onChange={changeEventHandler}
                placeholder="ABCDE1234F"
                className="focus-visible:ring-[#10B981] border-gray-300 mt-1"
              />
            </div>

            <div>
              <Label className="text-[#1F2937]">Aadhar Card Number</Label>
              <Input
                type="text"
                value={input.adharcard}
                name="adharcard"
                onChange={changeEventHandler}
                placeholder="1234 5678 9012"
                className="focus-visible:ring-[#10B981] border-gray-300 mt-1"
              />
            </div>

            <div>
              <Label className="text-[#1F2937]">Phone Number</Label>
              <Input
                type="tel"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="+91 0000000000"
                className="focus-visible:ring-[#10B981] border-gray-300 mt-1"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <RadioGroup className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={input.role === "Student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer accent-[#10B981] h-4 w-4"
                  />
                  <Label className="cursor-pointer text-[#1F2937]">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="Recruiter"
                    checked={input.role === "Recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer accent-[#10B981] h-4 w-4"
                  />
                  <Label className="cursor-pointer text-[#1F2937]">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-[#1F2937]">Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={ChangeFilehandler}
                className="cursor-pointer mt-1 border-gray-300 focus-visible:ring-[#10B981] py-1.5"
              />
            </div>
          </div>

          {loading ? (
            <button className="w-full py-3 mt-8 text-white flex items-center justify-center bg-[#059669] rounded-md cursor-not-allowed">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 mt-8 text-white font-semibold bg-[#10B981] hover:bg-[#059669] rounded-md transition-all duration-300 shadow-md"
            >
              Register
            </button>
          )}

          <p className="text-[#1F2937] text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#059669] font-bold hover:underline ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;