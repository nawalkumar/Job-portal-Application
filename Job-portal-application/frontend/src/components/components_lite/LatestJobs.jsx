import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { Search, RotateCcw, AlertCircle } from "lucide-react";
import useGetAllJobs from "@/hooks/useGetAllJobs"; // Make sure path is correct

const LatestJobs = () => {
  // 1. CALL THE HOOK AND GET STATES
  const { loading, error } = useGetAllJobs();
  const { allJobs } = useSelector((state) => state.job || { allJobs: [] });

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">
        <span className="text-emerald-600">Latest & Top </span>Job Openings
      </h2>

      <div className="min-h-[400px] w-full">
        {loading ? (
          /* --- ROTATING SEARCH ICON DIV --- */
          <div className="flex flex-col items-center justify-center w-full h-[400px] bg-emerald-50/30 rounded-2xl border-2 border-dashed border-emerald-200">
            <div className="animate-spin duration-1000">
              <Search size={60} className="text-emerald-600" />
            </div>
            <p className="mt-6 text-xl font-bold text-emerald-700 animate-pulse">
              Searching for Openings...
            </p>
          </div>
        ) : error ? (
          /* --- ERROR / FAILED TO FETCH DIV --- */
          <div className="flex flex-col items-center justify-center w-full h-[400px] bg-red-50 rounded-2xl border border-red-200">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h3 className="text-2xl font-bold text-red-900">Failed to load jobs</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all shadow-md"
            >
              <RotateCcw size={18} />
              Try Again
            </button>
          </div>
        ) : allJobs.length === 0 ? (
          <div className="flex items-center justify-center w-full h-[400px] text-gray-400">
            No jobs found matching your criteria.
          </div>
        ) : (
          /* --- SHOW JOBS --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.slice(0, 6).map((job) => (
              <JobCards key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;