import React, { useState } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import Footer from "./Footer";


const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { bookmarkedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-emerald-400 transition-shadow duration-300">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24 border border-emerald-100">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            variant="outline"
          >
            <Pen className="w-4 h-4" />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-gray-700">
            <Mail className="text-emerald-600" />
            <span>
              <a href={`mailto:${user?.email}`} className="hover:text-emerald-600 transition-colors">{user?.email}</a>
            </span>
          </div>
          <div className="flex items-center gap-3 my-2 text-gray-700">
            <Contact className="text-emerald-600" />
            <span>
              <a href={`tel:${user?.phoneNumber}`} className="hover:text-emerald-600 transition-colors">{user?.phoneNumber}</a>
            </span>
          </div>
        </div>

        <div>
          <div className="my-5">
            <h1 className="font-bold text-md mb-2">Skills</h1>
            <div className="flex items-center gap-2 flex-wrap">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400">NA</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label className="text-md font-bold">Resume</label>
            <div>
              {isResume ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user?.profile?.resume
                    ? user.profile.resume.replace("/upload/", "/upload/fl_attachment:resume/")
                    : "#"}
                  className="text-emerald-600 hover:underline cursor-pointer font-medium"
                >
                  Download {user?.profile?.resumeOriginalName || "Resume"}
                </a>
              ) : (
                <span className="text-gray-500 italic">No Resume Found</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4">
        <h1 className="text-lg my-5 font-bold border-b border-emerald-100 pb-2">Applied Jobs</h1>
        <AppliedJob />
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 mt-5 mb-10">
        <h1 className="text-lg my-5 font-bold border-b border-emerald-100 pb-2">Bookmarked Jobs</h1>

        {bookmarkedJobs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarkedJobs.map((job) => (
              <Job1 key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-gray-200 rounded-xl">
            <p className="text-gray-500">You haven't bookmarked any jobs yet.</p>
          </div>
        )}
      </div>
      <Footer />

      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;