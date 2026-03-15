import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs"; // Import hook
import { Button } from "../ui/button"; // Assuming you have this

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error } = useGetAllJobs(currentPage); // Use hook with page
  const { allJobs, paginationData } = useSelector((store) => store.job);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5">
          <div className="w-1/4 hidden md:block">
            <FilterCard />
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
              </div>
            ) : allJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-2xl border border-emerald-200">
                <span className="text-xl font-semibold text-emerald-800">No jobs found</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {allJobs.map((job) => (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Job1 job={job} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* --- PAGINATION UI --- */}
                <div className="flex items-center justify-center mt-10 gap-4">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
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
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;