import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import RecommendedJobs from "./RecommendedJobs";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Button } from "../ui/button"; 
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setUser } from '@/redux/authSlice'; 

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const jobs = useSelector((state) => state.jobs.allJobs);
  const { recommendedJobs = [] } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

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
        // Check if the user has filled their details out or if recommendations came up empty
        (!user.profile?.skills || user.profile.skills.length === 0 || recommendedJobs.length === 0) ? (
          <div className="max-w-7xl mx-auto my-10 px-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-amber-800 mb-2">
                Complete Your Profile for AI Recommendations!
              </h2>
              <p className="text-gray-600 mb-6">
                Our AI vector matching engine needs your resume or skills data to match you accurately. 
                Please update your profile bio and add your skill sets to unlock curated job listings.
              </p>
              <Link to="/Profile">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Go to Profile Dashboard
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <RecommendedJobs />
        )
      ) : (
        <div className="max-w-7xl mx-auto my-10 px-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Want Personalized Job Recommendations?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl">
              Our AI engine matches your skills with top job openings. 
              Sign up today to see jobs tailored specifically for you.
            </p>
            
            {/* Traditional Email/Password Auth Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              <Link to="/register">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>

            {/* Visual Divider */}
            <div className="flex items-center my-2 w-full max-w-xs justify-center gap-2 mb-4 text-gray-400 text-sm">
              <span className="h-px bg-gray-300 w-full"></span>
              <span>or</span>
              <span className="h-px bg-gray-300 w-full"></span>
            </div>

            {/* Google OAuth 2.0 Button Component */}
            <div className="inline-block shadow-sm rounded-md overflow-hidden">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    // FIXED: Prefixed protocol string to absolute path structure
                    const backendUrl = "https://poetic-imagination-production-b2e9.up.railway.app"; 
                    
                    const res = await axios.post(`${backendUrl}/api/user/google-login`, {
                      token: credentialResponse.credential
                    }, { withCredentials: true });
                    
                    if (res.data.success) {
                      dispatch(setUser(res.data.user)); 
                      // Forces application tree evaluation to immediately refresh layout flags
                      window.location.reload(); 
                    }
                  } catch (err) {
                    console.error("Authentication submission failure:", err);
                  }
                }}
                onError={() => console.log('Google Client Framework Error')}
              />
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