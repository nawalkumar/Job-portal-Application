import React from 'react';
import { useSelector } from 'react-redux';
import Job1 from './Job1';
import useGetRecommendedJobs from '@/hooks/useGetRecommendedJobs';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const RecommendedJobs = () => {
    const { user } = useSelector(store => store.auth);
    const { recommendedJobs = [] } = useSelector(store => store.job);

    // Run the hook to fetch data
    useGetRecommendedJobs();

    if (!user) return null;

    // Show custom warning banner inside the component layout if profile/skills data is completely blank
    if (!user.profile?.skills || user.profile.skills.length === 0 || recommendedJobs.length === 0) {
        return (
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
        );
    }

    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-emerald-500 w-6 h-6" />
                <h1 className="text-2xl font-bold text-gray-800">
                    Recommended <span className="text-emerald-600">for You</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedJobs.slice(0, 6).map((job) => (
                    <Job1 key={job?._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedJobs;
