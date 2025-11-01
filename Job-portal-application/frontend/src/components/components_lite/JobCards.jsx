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
                 hover:shadow-2xl hover:shadow-blue-100 hover:border-blue-300 
                 transition-all duration-300 group"
    >
      {/* Logo + Company */}
      <div className="flex items-center gap-3 mb-3">
        {job.companyLogo ? (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-400 transition"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
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
      <h2 className="font-bold text-xl text-gray-900 my-2 line-clamp-1 group-hover:text-blue-600 transition">
        {job.title}
      </h2>

      {/* Description with HTML */}
      <div className="mb-4">
        <div
          className="prose prose-sm max-w-none text-gray-600 line-clamp-3 leading-snug"
          dangerouslySetInnerHTML={{
            __html: job.description || "No description available.",
          }}
        />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 bg-blue-50 px-3 py-1 text-xs font-medium">
          {job.position} Position{job.position > 1 ? "s" : ""}
        </Badge>
        <Badge className="text-red-700 bg-red-50 px-3 py-1 text-xs font-medium">
          {job.salary} LPA
        </Badge>
        <Badge className="text-purple-700 bg-purple-50 px-3 py-1 text-xs font-medium">
          {job.location}
        </Badge>
        <Badge className="text-gray-700 bg-gray-100 px-3 py-1 text-xs font-medium">
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
            <Button className="w-full bg-gray-700 hover:bg-gray-900 text-white font-medium text-sm py-2">
              Apply Now
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default JobCards;