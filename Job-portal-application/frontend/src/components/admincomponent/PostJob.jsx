import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center w-screen py-10 px-4">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl w-full bg-white border border-gray-200 shadow-sm rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-8 border-b pb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Briefcase className="text-emerald-600 w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-gray-900">Post New Job</h1>
              <p className="text-sm text-gray-500">Fill in the details to list a new opportunity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                placeholder="e.g. Senior Frontend Developer"
                className="focus-visible:ring-emerald-500 border-gray-300"
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">Description</Label>
              <Input
                name="description"
                value={input.description}
                placeholder="Briefly describe the role"
                className="focus-visible:ring-emerald-500 border-gray-300"
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="e.g. Remote, Mumbai"
                className="focus-visible:ring-emerald-500 border-gray-300"
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">Salary (LPA)</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                placeholder="Enter annual salary"
                className="focus-visible:ring-emerald-500 border-gray-300"
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                placeholder="Number of openings"
                className="focus-visible:ring-emerald-500 border-gray-300"
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                placeholder="Skills (comma separated)"
                className="focus-visible:ring-emerald-500 border-gray-300"
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">Experience Level (Years)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                placeholder="Years required"
                className="focus-visible:ring-emerald-500 border-gray-300"
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                placeholder="e.g. Full-time, Contract"
                className="focus-visible:ring-emerald-500 border-gray-300"
                onChange={changeEventHandler}
              />
            </div>

            <div className="col-span-full md:col-span-1 pt-2">
              <Label className="font-semibold text-gray-700">Select Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full border-gray-300 focus:ring-emerald-500">
                    <SelectValue placeholder="Which company?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-red-500 font-medium py-2">
                  *No companies registered. Please create one first.*
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            {loading ? (
              <Button disabled className="w-full py-6 bg-emerald-600 text-white rounded-xl">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={companies.length === 0}
                className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-100 active:scale-[0.98]"
              >
                Create Job Listing
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;