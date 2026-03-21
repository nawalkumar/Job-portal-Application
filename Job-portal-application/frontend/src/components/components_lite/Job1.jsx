import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark, BookmarkCheck, Sparkles } from "lucide-react"; // Added Sparkles icon for AI feel
import { useDispatch, useSelector } from "react-redux";
import { setBookmarkedJobs } from "@/redux/jobSlice";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarkedJobs = [] } = useSelector(store => store.job || {});
<<<<<<< HEAD
=======
  
  // Logic to check if this is a recommended job with a match score
>>>>>>> 8cd1599f968d3b91ac2bfcf5f9dc8291194f9719
  const hasMatchScore = job?.matchScore !== undefined;

  const daysAgo = (date) => {
    const created = new Date(date);
    const now = new Date();
    const diff = (now - created) / (1000 * 60 * 60 * 24);
    return diff < 1 ? "Today" : `${Math.floor(diff)} days ago`;
  };

  const getInitials = (name) => {
    if (!name) return "C";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  
  const isBookmarked = bookmarkedJobs.some(item => item._id === job._id) || false;

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="flex flex-col h-full p-5 rounded-xl bg-white border border-gray-200 cursor-pointer 
                 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group relative"
    >
      {/* Header: Time + Match Score + Bookmark */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
           <p className="text-xs text-gray-500 font-medium">{daysAgo(job.createdAt)}</p>
           
           {/* --- AI MATCH BADGE --- */}
           {hasMatchScore && (
             <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-tight">
               <Sparkles className="h-2.5 w-2.5" />
               {job.matchScore}% Match
             </div>
           )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-emerald-50"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setBookmarkedJobs(job)); 
          }}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-4 w-4 text-emerald-600" />
          ) : (
            <Bookmark className="h-4 w-4 text-gray-400" />
          )}
        </Button>
      </div>

      {/* Logo + Company */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-12 w-12 border border-gray-100 shadow-sm shrink-0">
          <AvatarImage
            src={job.companyLogo}
            alt={job.company}
            className="object-cover"
          />
          <AvatarFallback>
            {getInitials(job.company)}
          </AvatarFallback>
        </Avatar>
        <div className="overflow-hidden">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
            {job.company}
          </h3>
          <p className="text-xs text-gray-500 font-medium">India</p>
        </div>
      </div>

      {/* Title */}
      <div className="min-h-[3.5rem] flex items-start">
        <h2 className="font-bold text-xl text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition leading-tight">
          {job.title}
        </h2>
      </div>

      {/* Description */}
      <div className="flex-grow mb-4">
        <div
          className="custom-description text-gray-600 text-sm line-clamp-3 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: (job.description || "No description available.").replace(/#/g, ""),
          }}
        />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4 mt-auto">
        <Badge variant="secondary" className="px-3 py-1 text-xs">
          {job.position} Positions
        </Badge>
        <Badge variant="destructive" className="bg-red-50 text-red-600 border-none px-3 py-1 text-xs">
          {job.salary} LPA
        </Badge>
        <Badge variant="outline" className="px-3 py-1 text-xs">
          {job.location}
        </Badge>
        <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none px-3 py-1 text-xs">
          {job.jobType}
        </Badge>
      </div>

      {/* Apply Button */}
      {job.applicationLink && (
        <div className="mt-auto">
          <a
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block"
          >
            <Button className="w-full font-medium text-sm bg-emerald-600 hover:bg-emerald-700 text-white">
              Apply Externally
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Job1;
