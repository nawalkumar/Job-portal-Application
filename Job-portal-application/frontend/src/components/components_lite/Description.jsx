import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { Sparkles } from "lucide-react"; // Imported for AI Match UI

const Description = () => {
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.status && res.data.job) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (app) => app.applicant === user?._id
            ) || false
          );
        } else {
          setError("Job not found.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError("Failed to load job.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !singleJob) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-xl font-semibold">{error || "Job not found"}</p>
      </div>
    );
  }

  return (
    // Removed fixed heights to ensure content can expand as long as needed
    <div className="max-w-5xl mx-auto my-10 p-4 md:p-10 bg-white rounded-2xl shadow-sm border border-gray-100">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-6">
          {singleJob.companyLogo ? (
            <img
              src={singleJob.companyLogo}
              alt={singleJob.company}
              className="w-24 h-24 rounded-2xl object-cover border border-gray-100 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-3xl font-bold">
              {singleJob.company?.[0] || "C"}
            </div>
          )}

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-extrabold text-gray-900">{singleJob.title}</h1>

              {/* AI Match Badge - Shown if available */}
              {singleJob.matchScore && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-sm font-bold animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  {singleJob.matchScore}% AI Match
                </div>
              )}
            </div>
            <p className="text-lg text-emerald-600 font-medium mt-1">{singleJob.company}</p>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="shrink-0">
          {singleJob.applicationLink ? (
            <Button
              onClick={() => {
                const isProfileComplete = user?.profile?.resume;
                if (!isProfileComplete) {
                  toast.error("Please upload your resume in profile to apply.");
                } else {
                  window.open(singleJob.applicationLink, "_blank");
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 rounded-xl font-bold text-lg transition-all"
            >
              Apply Externally
            </Button>
          ) : (
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`px-10 py-6 rounded-xl font-bold text-lg transition-all ${isApplied ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
            >
              {isApplied ? "Application Submitted" : "Apply Now"}
            </Button>
          )}
        </div>
      </div>

      {/* QUICK STATS BADGES */}
      <div className="flex flex-wrap gap-3 mb-10 pb-8 border-b border-gray-100">
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 px-4 py-1.5 rounded-lg border-none shadow-none">
          {singleJob.position} Positions
        </Badge>
        <Badge variant="secondary" className="bg-orange-50 text-orange-700 hover:bg-orange-50 px-4 py-1.5 rounded-lg border-none shadow-none">
          {singleJob.salary} LPA
        </Badge>
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 px-4 py-1.5 rounded-lg border-none shadow-none">
          {singleJob.location}
        </Badge>
        <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-50 px-4 py-1.5 rounded-lg border-none shadow-none">
          {singleJob.jobType}
        </Badge>
      </div>

      {/* THE DESCRIPTION AREA - Ensures text is never cut off */}
      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          About this Role
        </h2>

        {/* Removed 'line-clamp' and 'overflow' to let text flow naturally */}
        <div
          className="rich-text-content text-gray-700 text-lg leading-relaxed space-y-4 prose prose-emerald max-w-none"
          dangerouslySetInnerHTML={{
            __html: (singleJob.description || "No details provided.")
              .replace(/#/g, "<br/>• ")
              .replace(/\n/g, "<br/>")
          }}
        />
      </div>

      {/* DETAILED INFO GRID */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-gray-50 rounded-3xl border border-gray-100">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Experience Required</span>
          <span className="text-lg font-bold text-gray-800">{singleJob.experienceLevel} Year(s)</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Total Applicants</span>
          <span className="text-lg font-bold text-gray-800">{singleJob.applications?.length || 0} People</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Posted Date</span>
          <span className="text-lg font-bold text-gray-800">
            {new Date(singleJob.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Description;