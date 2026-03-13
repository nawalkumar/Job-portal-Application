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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

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
        <TableCaption className="pb-4">A list of your recently registered companies</TableCaption>
        <TableHeader className="bg-emerald-50/50">
          <TableRow>
            <TableHead className="font-bold text-gray-800">Logo</TableHead>
            <TableHead className="font-bold text-gray-800">Company Name</TableHead>
            <TableHead className="font-bold text-gray-800">Date</TableHead>
            <TableHead className="text-right font-bold text-gray-800">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500 italic">
                No companies registered yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow key={company._id} className="hover:bg-emerald-50/30 transition-colors">
                <TableCell>
                  <Avatar className="border border-gray-100 shadow-sm">
                    <AvatarImage
                      src={company.logo || "default-logo-url"}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-emerald-800">{company.name}</TableCell>
                <TableCell className="text-gray-500">{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal className="text-gray-600" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-emerald-50 rounded-md transition-colors text-gray-700 group"
                      >
                        <Edit2 className="w-4 text-emerald-600 group-hover:text-emerald-700" />
                        <span className="text-sm font-medium">Edit</span>
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

export default CompaniesTable;