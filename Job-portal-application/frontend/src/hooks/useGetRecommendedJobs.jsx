import { setRecommendedJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRecommendedJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchRecommendedJobs = async () => {
            // Only fetch if we have a logged-in user
            if (!user) return;

            try {
                const res = await axios.get(`https://job-portal-application-ot68.vercel.app/api/v1/job/recommendations`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setRecommendedJobs(res.data.recommendations));
                }
            } catch (error) {
                console.log("Recommendation fetch failed:", error);
            }
        };
        fetchRecommendedJobs();
    }, [user, dispatch]); // Re-run if user logs in/out
};

export default useGetRecommendedJobs;