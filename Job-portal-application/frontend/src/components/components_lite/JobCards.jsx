import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

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
      className="flex flex-col h-full p-5 rounded-xl bg-white border border-gray-200 cursor-pointer 
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
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {getInitials(job.company)}
          </div>
        )}
        <div className="overflow-hidden">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
            {job.company}
          </h3>
          <p className="text-xs text-gray-500">India</p>
        </div>
      </div>

      {/* Title - Fixed height for 2 lines ensures alignment */}
      <div className="min-h-[3.5rem] flex items-start">
        <h2 className="font-bold text-xl text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition leading-tight">
          {job.title}
        </h2>
      </div>

      {/* Description - Fixed height for 3 lines */}
      <div className="mt-2 mb-4 flex-grow">
        <div
          className="custom-description text-gray-600 text-sm line-clamp-3 leading-6 tracking-wide"
          dangerouslySetInnerHTML={{
            __html: (job.description || "No description available.").replace(/#/g, ""),
          }}
        />
      </div>

      {/* Badges - Always positioned above the button */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="px-3 py-1 text-xs font-medium shrink-0">
          {job.position} Position{job.position > 1 ? "s" : ""}
        </Badge>
        <Badge variant="destructive" className="bg-red-50 text-red-700 border-none px-3 py-1 text-xs font-medium shrink-0 hover:bg-red-100">
          {job.salary} LPA
        </Badge>
        <Badge variant="outline" className="px-3 py-1 text-xs font-medium shrink-0">
          {job.location}
        </Badge>
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 text-xs font-medium border-none shrink-0">
          {job.jobType}
        </Badge>
      </div>

      {/* Apply Button - mt-auto pushes this to the absolute bottom */}
      {job.applicationLink && (
        <div className="mt-auto">
          <a
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block"
          >
            <Button className="w-full font-medium text-sm py-2 bg-emerald-600 hover:bg-emerald-700">
              Apply Now
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default JobCards;