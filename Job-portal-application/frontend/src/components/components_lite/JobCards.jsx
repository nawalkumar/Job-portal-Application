import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  // Fallback avatar if no logo
  const getInitials = (name) => {
    if (!name) return "C";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-xl bg-white border border-gray-200 cursor-pointer 
                 hover:shadow-2xl hover:shadow-emerald-100 hover:border-emerald-300 
                 transition-all duration-300 group"
    >
      {/* Logo + Company */}
      <div className="flex items-center gap-3 mb-3">
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-emerald-400 transition"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-sm">
            {getInitials(job.company)}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
            {job.company}
          </h3>
          <p className="text-xs text-gray-500">India</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="font-bold text-xl text-gray-900 my-2 line-clamp-1 group-hover:text-emerald-600 transition">
        {job.title}
      </h2>

      {/* Description with HTML */}
      <div className="mb-4">
        <div
          className="custom-description text-gray-600 text-sm line-clamp-3 leading-6 tracking-wide"
          dangerouslySetInnerHTML={{
            // Clean up hashtags and clumping for the card preview
            __html: (job.description || "No description available.").replace(/#/g, "")
          }}
        />
      </div>

      {/* Badges - Using variants defined in your global badge.jsx */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
          {job.position} Position{job.position > 1 ? "s" : ""}
        </Badge>
        <Badge variant="destructive" className="bg-red-50 text-red-700 border-none px-3 py-1 text-xs font-medium hover:bg-red-100">
          {job.salary} LPA
        </Badge>
        <Badge variant="outline" className="px-3 py-1 text-xs font-medium">
          {job.location}
        </Badge>
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 text-xs font-medium border-none">
          {job.jobType}
        </Badge>
      </div>

      {/* Apply Button (External) */}
      {job.applicationLink && (
        <div className="mt-4">
          <a
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Prevent navigate on click
            className="block"
          >
            <Button className="w-full font-medium text-sm py-2">
              Apply Now
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default JobCards;