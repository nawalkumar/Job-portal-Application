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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Download } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        <TableCaption className="pb-4">A list of users who applied recently</TableCaption>
        <TableHeader className="bg-emerald-50/50">
          <TableRow>
            <TableHead className="font-bold text-gray-800">FullName</TableHead>
            <TableHead className="font-bold text-gray-800">Email</TableHead>
            <TableHead className="font-bold text-gray-800">Contact</TableHead>
            <TableHead className="font-bold text-gray-800">Resume</TableHead>
            <TableHead className="font-bold text-gray-800">Date</TableHead>
            <TableHead className="text-right font-bold text-gray-800">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <TableRow key={item._id} className="hover:bg-emerald-50/20 transition-colors">
                <TableCell className="font-medium">{item?.applicant?.fullname}</TableCell>
                <TableCell className="text-gray-600">{item?.applicant?.email}</TableCell>
                <TableCell className="text-gray-600">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1 transition-all"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400">NA</span>
                  )}
                </TableCell>
                <TableCell className="text-gray-500">{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 hover:bg-emerald-50 rounded-full transition-colors">
                      <MoreHorizontal className="text-gray-600" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 shadow-lg border-emerald-100">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className={`flex items-center gap-3 px-3 py-2 my-1 cursor-pointer rounded-md transition-all ${status === "Accepted"
                              ? "hover:bg-emerald-50 text-emerald-700"
                              : "hover:bg-red-50 text-red-600"
                              }`}
                          >
                            <input
                              type="radio"
                              name={`status-${item._id}`}
                              value={status}
                              className="accent-emerald-600 cursor-pointer"
                            />
                            <span className="text-sm font-semibold">{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;