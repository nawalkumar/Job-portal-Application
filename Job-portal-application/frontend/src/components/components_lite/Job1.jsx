// components/Job1.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark, BookmarkCheck } from "lucide-react";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

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

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-xl bg-white border border-gray-200 cursor-pointer 
                 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group"
    >
      {/* Header: Time + Bookmark */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-gray-500">{daysAgo(job.createdAt)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-4 w-4 text-indigo-600" />
          ) : (
            <Bookmark className="h-4 w-4 text-gray-500" />
          )}
        </Button>
      </div>

      {/* Logo + Company */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={job.companyLogo}
            alt={job.company}
            className="object-cover"
          />
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
            {getInitials(job.company)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
            {job.company}
          </h3>
          <p className="text-xs text-gray-500">India</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indigo-600 transition">
        {job.title}
      </h2>

      {/* Description with HTML */}
      <div className="mb-4">
        <div
          className="prose prose-sm max-w-none text-gray-600 line-clamp-3 leading-snug"
          dangerouslySetInnerHTML={{
            __html: job.description || "No description.",
          }}
        />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
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
        <a
          href={job.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block mt-2"
        >
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-sm">
            Apply Externally
          </Button>
        </a>
      )}
    </div>
  );
};

export default Job1;