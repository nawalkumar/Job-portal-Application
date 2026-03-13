import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  if (!companies) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <Table>
        <TableCaption className="pb-4">A list of your recently posted jobs</TableCaption>
        <TableHeader className="bg-emerald-50/50">
          <TableRow>
            <TableHead className="font-bold text-gray-800">Company Name</TableHead>
            <TableHead className="font-bold text-gray-800">Role</TableHead>
            <TableHead className="font-bold text-gray-800">Date</TableHead>
            <TableHead className="text-right font-bold text-gray-800">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500 italic">
                No jobs added yet.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job._id} className="hover:bg-emerald-50/30 transition-colors">
                <TableCell className="font-medium text-emerald-700">{job?.company?.name}</TableCell>
                <TableCell className="text-gray-700">{job.title}</TableCell>
                <TableCell className="text-gray-500">{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                      <MoreHorizontal className="text-gray-600" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-emerald-50 rounded-md transition-colors text-gray-700"
                      >
                        <Edit2 className="w-4 text-emerald-600" />
                        <span className="text-sm font-medium">Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-emerald-50 rounded-md transition-colors mt-1 text-gray-700"
                      >
                        <Eye className="w-4 text-emerald-600" />
                        <span className="text-sm font-medium">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;