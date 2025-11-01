// components/Description.jsx
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !singleJob) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">{error || "Job not found"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
      {/* HEADER: Logo + Title + Company */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-5">
          {/* Company Logo */}
          {singleJob.companyLogo ? (
            <img
              src={singleJob.companyLogo}
              alt={singleJob.company}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {singleJob.company?.[0] || "C"}
            </div>
          )}

          {/* Title + Company */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{singleJob.title}</h1>
            <p className="text-xl text-indigo-600 font-semibold mt-1">
              {singleJob.company}
            </p>
          </div>
        </div>

        {/* Apply Button */}
        <div>
          {singleJob.applicationLink ? (
            <a
              href={singleJob.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition transform hover:scale-105"
            >
              Apply Externally
            </a>
          ) : (
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`px-8 py-3 rounded-full font-bold text-lg transition ${isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          )}
        </div>
      </div>

      {/* BADGES */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Badge className="text-blue-700 bg-blue-50 px-4 py-1 text-sm font-medium">
          {singleJob.position} Positions
        </Badge>
        <Badge className="text-red-700 bg-red-50 px-4 py-1 text-sm font-medium">
          {singleJob.salary} LPA
        </Badge>
        <Badge className="text-purple-700 bg-purple-50 px-4 py-1 text-sm font-medium">
          {singleJob.location}
        </Badge>
        <Badge className="text-gray-700 bg-gray-100 px-4 py-1 text-sm font-medium">
          {singleJob.jobType}
        </Badge>
      </div>

      {/* FULL DESCRIPTION WITH HTML */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-3">
          Job Description
        </h2>

        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{
            __html: singleJob.description || "<p>No description available.</p>",
          }}
        />
      </div>

      {/* JOB DETAILS GRID */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <p className="font-semibold text-lg">
            Role:{" "}
            <span className="font-normal">{singleJob.position} Open Positions</span>
          </p>
          <p className="font-semibold text-lg mt-3">
            Location: <span className="font-normal">{singleJob.location}</span>
          </p>
          <p className="font-semibold text-lg mt-3">
            Salary: <span className="font-normal">{singleJob.salary} LPA</span>
          </p>
          <p className="font-semibold text-lg mt-3">
            Experience: <span className="font-normal">{singleJob.experienceLevel} Year(s)</span>
          </p>
        </div>
        <div>
          <p className="font-semibold text-lg">
            Total Applicants:{" "}
            <span className="font-normal">{singleJob.applications?.length || 0}</span>
          </p>
          <p className="font-semibold text-lg mt-3">
            Job Type: <span className="font-normal">{singleJob.jobType}</span>
          </p>
          <p className="font-semibold text-lg mt-3">
            Posted On:{" "}
            <span className="font-normal">
              {new Date(singleJob.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>

      {/* DEBUG: Remove in production */}
      {process.env.NODE_ENV === "development" && (
        <details className="mt-8 text-xs text-gray-500">
          <summary>Debug: Raw HTML</summary>
          <pre className="bg-gray-100 p-3 rounded mt-2 text-xs overflow-auto">
            {singleJob.description}
          </pre>
        </details>
      )}
    </div>
  );
};

export default Description;