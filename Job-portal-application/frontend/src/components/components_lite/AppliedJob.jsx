import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-white rounded-xl">
      <Table>
        <TableCaption className="text-gray-400 pb-4">A list of your recent job applications</TableCaption>
        <TableHeader>
          <TableRow className="bg-emerald-50/50 hover:bg-emerald-50/50">
            <TableHead className="font-bold text-gray-800">Date</TableHead>
            <TableHead className="font-bold text-gray-800">Job Title</TableHead>
            <TableHead className="font-bold text-gray-800">Company</TableHead>
            <TableHead className="text-right font-bold text-gray-800">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-emerald-50/30 transition-colors"
              >
                <TableCell className="text-gray-600">
                  {appliedJob?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>
                <TableCell className="font-medium text-gray-800">
                  {appliedJob.job?.title || "N/A"}
                </TableCell>
                <TableCell className="text-gray-600">
                  {appliedJob.job?.company?.name || "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`capitalize font-medium px-3 py-1 ${appliedJob?.status === "rejected"
                      ? "bg-red-500 hover:bg-red-600"
                      : appliedJob?.status === "accepted"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-gray-500 hover:bg-gray-600"
                      }`}
                  >
                    {appliedJob?.status || "pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJob;