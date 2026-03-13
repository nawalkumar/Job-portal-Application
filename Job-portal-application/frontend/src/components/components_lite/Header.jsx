import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <div
        className="relative text-center py-20 px-5 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero1.jpg')" }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col gap-5 my-10">
          <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-emerald-100 text-emerald-700 font-medium">
            <span className="text-emerald-700">
              <PiBuildingOfficeBold />
            </span>
            No.1 Job Hunt Website
          </span>

          <h2 className="text-5xl font-bold text-white">
            Search Apply & <br />
            Get Your <span className="text-emerald-300">Dream Job</span>
          </h2>

          {/* <p className="text-emerald-100">
            Start your hunt for the best, life-changing career opportunities
            from here in your <br />
            selected areas conveniently and get hired quickly.
          </p> */}

          <div className="flex w-full max-w-xl md:w-[40%] shadow-lg border border-emerald-200 rounded-full items-center bg-white overflow-hidden mx-auto">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Your Dream Job"
              className="outline-none border-none w-full text-black ml-10 bg-transparent text-base md:text-lg"
            />

            <Button
              onClick={searchjobHandler}
              className="rounded-r-full rounded-l-none h-12 flex items-center justify-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200"
            >
              <Search className="h-5 w-5 stroke-[2.5px]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;