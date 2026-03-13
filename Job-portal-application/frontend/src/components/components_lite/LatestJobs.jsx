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
  // Ensuring we access the correct slice of the state based on your redux setup
  const allJobs = useSelector((state) => state.job?.allJobs || []);

  // Clean description for preview
  const jobsWithCleanDesc = allJobs.map((job) => ({
    ...job,
    cleanDescription: stripHTML(job.description).slice(0, 120) + "...",
  }));

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">
        <span className="text-emerald-600">Latest & Top </span>Job Openings
      </h2>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length === 0 ? (
          <div className="col-span-full text-center py-10 bg-emerald-50/50 rounded-xl border border-dashed border-emerald-200">
            <p className="text-emerald-700 font-medium">
              No Job Openings Available at the moment.
            </p>
          </div>
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