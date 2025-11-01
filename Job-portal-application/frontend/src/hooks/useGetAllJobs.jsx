// hooks/useGetAllJobs.js
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
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
          `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,
          { withCredentials: true }
        );

        if (res.data.status) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          setError("No jobs found.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]);

  // RETURN loading and error
  return { loading, error };
};

export default useGetAllJobs;