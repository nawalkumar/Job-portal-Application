// components/LatestJobs.jsx
import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

// Helper: Strip HTML tags
const stripHTML = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);

  // Clean description for preview
  const jobsWithCleanDesc = allJobs.map((job) => ({
    ...job,
    cleanDescription: stripHTML(job.description).slice(0, 120) + "...",
  }));

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h2>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No Job Available
          </p>
        ) : (
          jobsWithCleanDesc
            .slice(0, 6)
            .map((job) =>
              job?._id ? (
                <JobCards key={job._id} job={job} />
              ) : null
            )
        )}
      </div>
    </div>
  );
};

export default LatestJobs;