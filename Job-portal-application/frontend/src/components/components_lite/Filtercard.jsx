import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  { filterType: "Location", array: ["Delhi", "Mumbai", "Pune", "Bangalore", "Remote"] },
  { filterType: "Technology", array: ["Mern", "React", "Node", "Python", "Java"] },
  { filterType: "Experience", array: ["0-3 years", "3-5 years", "5-7 years"] },
  { filterType: "Salary", array: ["0-50k", "50k-100k", "100k-200k"] },
];

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    Location: "",
    Technology: "",
    Experience: "",
    Salary: ""
  });

  const dispatch = useDispatch();

  const handleFilterChange = (type, value) => {
    setSelectedFilters(prev => ({ ...prev, [type]: value }));
  };

  const clearAll = () => {
    setSelectedFilters({ Location: "", Technology: "", Experience: "", Salary: "" });
  };

  useEffect(() => {
    // Extract only the first word or main keyword to make search more flexible
    // e.g., "0-3 years" -> "0-3"
    const query = Object.values(selectedFilters)
      .filter(Boolean)
      .map(val => val.split(" ")[0])
      .join(" ")
      .trim();

    dispatch(setSearchedQuery(query));
  }, [selectedFilters, dispatch]);

  const hasFilters = Object.values(selectedFilters).some(val => val !== "");

  return (
    <div className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-emerald-600 hover:underline font-medium">
            Clear All
          </button>
        )}
      </div>
      <hr className="mt-3 mb-5 border-gray-100" />
      <div className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-bold text-md text-[#1F2937] mb-3">{data.filterType}</h2>
            <RadioGroup
              value={selectedFilters[data.filterType]}
              onValueChange={(value) => handleFilterChange(data.filterType, value)}
              className="space-y-2"
            >
              {data.array.map((item, indx) => {
                const itemId = `Id${index}-${indx}`;
                return (
                  <div key={itemId} className="flex items-center space-x-3 group cursor-pointer">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="cursor-pointer font-normal text-gray-600 group-hover:text-emerald-600 transition-colors">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;