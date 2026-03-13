// components/Browse.jsx
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-2xl mb-8 text-gray-800">
          Search Results (
          <span className="text-emerald-600">{allJobs.length}</span>)
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-emerald-200">
              <p className="text-gray-500 font-medium">
                No jobs found matching your criteria.
              </p>
            </div>
          ) : (
            allJobs.map((job) => <Job1 key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;