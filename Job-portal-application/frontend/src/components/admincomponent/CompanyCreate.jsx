import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";
import { Building2 } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to register company");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Building2 className="text-emerald-600 w-5 h-5" />
              </div>
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Step 1: Registration</span>
            </div>
            <h1 className="font-bold text-3xl text-gray-900">What would you like to name your company?</h1>
            <p className="text-gray-500 mt-2">
              You can always change this later in your company settings.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Label className="text-gray-700 font-semibold">Company Name</Label>
            <Input
              type="text"
              placeholder="e.g. Microsoft, Google, etc."
              className="my-2 border-gray-300 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 py-6 text-lg"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 my-10 pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              className="px-8 py-6 rounded-xl border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-all"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-xl font-bold transition-all shadow-lg shadow-emerald-100 active:scale-95"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;