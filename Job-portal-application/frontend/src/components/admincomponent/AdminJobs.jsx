import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { Plus } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex items-center justify-between my-5 gap-4">
          <Input
            className="w-fit border-gray-300 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 shadow-sm"
            placeholder="Filter by Name & Jobs"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2 transition-all shadow-md shadow-emerald-100"
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;