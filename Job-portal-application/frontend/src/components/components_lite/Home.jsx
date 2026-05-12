import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Added Link
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import RecommendedJobs from "./RecommendedJobs";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Button } from "./ui/button"; // Assuming you use shadcn/ui or similar

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const jobs = useSelector((state) => state.jobs.allJobs);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <Header />
      <Categories />

      {/* Conditional Rendering for Recommendations */}
      {user ? (
        <RecommendedJobs />
      ) : (
        <div className="max-w-7xl mx-auto my-10 px-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Want Personalized Job Recommendations?
            </h2>
            <p className="text-gray-600 mb-6">
              Our AI engine matches your skills with top job openings. 
              Sign up today to see jobs tailored specifically for you.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Rest of the UI */}
      {loading && <p className="text-center my-10">Loading jobs...</p>}
      {error && <p className="text-center my-10 text-red-500">Error: {error}</p>}
      {!loading && !error && <LatestJobs jobs={jobs} />}
      
      <Footer />
    </div>
  );
};

export default Home;
