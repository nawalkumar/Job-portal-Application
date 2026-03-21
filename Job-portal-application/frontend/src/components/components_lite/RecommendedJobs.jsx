import React from 'react';
import { useSelector } from 'react-redux';
import Job1 from './Job1';
import useGetRecommendedJobs from '@/hooks/useGetRecommendedJobs';
import { Sparkles } from 'lucide-react';

const RecommendedJobs = () => {
    const { user } = useSelector(store => store.auth);

    // Add " = [] " here to prevent 'undefined' errors
    const { recommendedJobs = [] } = useSelector(store => store.job);

    useGetRecommendedJobs();

    if (!user) return null;

    // Safety check: Ensure recommendedJobs exists and has items
    if (!recommendedJobs || recommendedJobs.length === 0) {
        return null;
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
                {/* Now .slice() is safe because we guaranteed recommendedJobs is an array */}
                {recommendedJobs.slice(0, 3).map((job) => (
                    <Job1 key={job?._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedJobs;