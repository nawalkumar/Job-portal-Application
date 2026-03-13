import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }

    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      return (
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.experience?.toLowerCase().includes(query) ||
        job.salary?.toLowerCase().includes(query)
      );
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5">
          {/* Sidebar - Filter Card */}
          <div className="w-1/4">
            <FilterCard />
          </div>

          {/* Job Listing Area */}
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-2xl border border-dashed border-emerald-200 shadow-sm">
                <span className="text-xl font-semibold text-emerald-800">No jobs match your search</span>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search keywords.</p>
              </div>
            ) : (
              <div className="h-[85vh] overflow-y-auto pb-10 no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {filterJobs.map((job) => (
                      <motion.div
                        key={job._id} // Changed from job.id to job._id to match MongoDB convention
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Job1 job={job} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;