import { setAllJobs, setPaginationData } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = (page = 1) => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      try {
        // We trim and encode to ensure "Pune " or "Mern " doesn't break the query
        const query = encodeURIComponent(searchedQuery.trim());
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${query}&page=${page}`,
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
        console.error("Fetch Error:", err);
        dispatch(setAllJobs([])); // Clear results on error
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, page, dispatch]);

  return { loading };
};

export default useGetAllJobs;
