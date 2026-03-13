import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label"; // Using your globalized Label
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
        {selectedValue && (
          <button
            onClick={() => setSelectedValue("")}
            className="text-xs text-emerald-600 hover:underline font-medium"
          >
            Clear All
          </button>
        )}
      </div>
      <hr className="mt-3 mb-5 border-gray-100" />

      <RadioGroup value={selectedValue} onValueChange={handleChange} className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-bold text-md text-[#1F2937] mb-3">{data.filterType}</h2>
            <div className="space-y-2">
              {data.array.map((item, indx) => {
                const itemId = `Id${index}-${indx}`;
                return (
                  <div key={itemId} className="flex items-center space-x-3 group cursor-pointer">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                    />
                    <Label
                      htmlFor={itemId}
                      className="cursor-pointer font-normal text-gray-600 group-hover:text-emerald-600 transition-colors"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;