import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Button } from "../ui/button";

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Get searchedQuery from store to monitor filter changes
  const { allJobs, paginationData, searchedQuery } = useSelector((store) => store.job);

  // Hook fetches data whenever currentPage or searchedQuery changes
  const { loading, error } = useGetAllJobs(currentPage);

  // RESET TO PAGE 1 when filter changes
  // This prevents being stuck on page 5 when a filter only has 1 page of results
  useEffect(() => {
    setCurrentPage(1);
  }, [searchedQuery]);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5">
          {/* Sidebar - Filter Card */}
          <div className="w-1/4 hidden md:block">
            <FilterCard />
          </div>

          {/* Job Listing Area */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-2xl border border-red-200">
                <span className="text-xl font-semibold text-red-600">Error loading jobs</span>
                <p className="text-gray-500">{error}</p>
              </div>
            ) : allJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-2xl border border-emerald-200">
                <span className="text-xl font-semibold text-emerald-800">No jobs found</span>
                <p className="text-gray-500 mt-2">Try clearing your filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                  <AnimatePresence mode="popLayout">
                    {allJobs.map((job) => (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Job1 job={job} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* --- PAGINATION UI --- */}
                {paginationData.totalPages > 1 && (
                  <div className="flex items-center justify-center mt-10 gap-4">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(prev => prev - 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                    >
                      Previous
                    </Button>

                    <span className="font-medium">
                      Page <span className="text-emerald-600">{currentPage}</span> of {paginationData.totalPages}
                    </span>

                    <Button
                      variant="outline"
                      disabled={currentPage === paginationData.totalPages}
                      onClick={() => {
                        setCurrentPage(prev => prev + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;