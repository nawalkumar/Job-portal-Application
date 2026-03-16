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
      try {
        // Encode the keyword to handle spaces correctly in the URL
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${encodeURIComponent(searchedQuery)}&page=${page}`,
          { withCredentials: true }
        );

        if (res.data.status) {
          dispatch(setAllJobs(res.data.jobs));
          dispatch(setPaginationData({
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage
          }));
        }
      } catch (err) {
        console.error("Fetch error:", err);
        // Clear jobs so UI doesn't show old data on error
        dispatch(setAllJobs([]));
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, [searchedQuery, page, dispatch]);
  return { loading, error };
};

export default useGetAllJobs;