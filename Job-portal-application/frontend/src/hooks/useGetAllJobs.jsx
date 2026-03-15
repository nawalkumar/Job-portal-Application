import { setAllJobs, setPaginationData } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = (page = 1) => { // Accept page param
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}&page=${page}`, // Pass page to API
          { withCredentials: true }
        );

        if (res.data.status) {
          dispatch(setAllJobs(res.data.jobs));
          // Store pagination info from backend
          dispatch(setPaginationData({
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage
          }));
        } else {
          setError("No jobs found.");
          dispatch(setAllJobs([]));
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, page, dispatch]); // Re-run when page changes

  return { loading, error };
};

export default useGetAllJobs;