import React, { useState } from "react"; // Added useState
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react"; // Added Menu and X icons
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State for mobile menu

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message || "Logged out successfully");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Error logging out.");
    }
  };

  return (
    <div className="bg-emerald-600 text-white shadow-md px-5 sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-white">Job </span>
            <span className="text-lime-400">Portal</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "Recruiter" ? (
              <>
                <li><Link to="/admin/companies" className="hover:text-lime-400 transition">Companies</Link></li>
                <li><Link to="/admin/jobs" className="hover:text-lime-400 transition">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/Home" className="hover:text-lime-400 transition">Home</Link></li>
                <li><Link to="/Browse" className="hover:text-lime-400 transition">Browse</Link></li>
                <li><Link to="/Jobs" className="hover:text-lime-400 transition">Jobs</Link></li>
                <li><Link to="/Creator" className="hover:text-lime-400 transition">About</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline" className="text-emerald-600 border-white hover:bg-emerald-50">Login</Button></Link>
              <Link to="/register"><Button className="bg-emerald-700 hover:bg-emerald-800 text-white border-none">Register</Button></Link>
            </div>
          ) : (
            <UserMenu user={user} logoutHandler={logoutHandler} />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {user && <UserMenu user={user} logoutHandler={logoutHandler} />}
          <button onClick={() => setOpen(!open)} className="text-white focus:outline-none">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {open && (
        <div className="md:hidden pb-5 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col gap-4 font-medium mb-4">
            {user && user.role === "Recruiter" ? (
              <>
                <li><Link to="/admin/companies" onClick={() => setOpen(false)}>Companies</Link></li>
                <li><Link to="/admin/jobs" onClick={() => setOpen(false)}>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/Home" onClick={() => setOpen(false)}>Home</Link></li>
                <li><Link to="/Browse" onClick={() => setOpen(false)}>Browse</Link></li>
                <li><Link to="/Jobs" onClick={() => setOpen(false)}>Jobs</Link></li>
                <li><Link to="/Creator" onClick={() => setOpen(false)}>About</Link></li>
              </>
            )}
          </ul>
          {!user && (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setOpen(false)}><Button variant="outline" className="w-full text-emerald-600">Login</Button></Link>
              <Link to="/register" onClick={() => setOpen(false)}><Button className="w-full bg-emerald-800 text-white">Register</Button></Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Sub-component to clean up the code
const UserMenu = ({ user, logoutHandler }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Avatar className="cursor-pointer border-2 border-lime-400">
        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
      </Avatar>
    </PopoverTrigger>
    <PopoverContent className="w-80">
      <div className="flex items-center gap-4 space-y-2">
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
        </Avatar>
        <div>
          <h3 className="font-medium text-emerald-900">{user?.fullname}</h3>
          <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
        </div>
      </div>
      <div className="flex flex-col my-2 text-gray-600">
        {user?.role === "Student" && (
          <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-emerald-600">
            <User2 size={18} />
            <Button variant="link" className="p-0 h-auto"><Link to="/Profile">Profile</Link></Button>
          </div>
        )}
        <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-red-600 mt-2">
          <LogOut size={18} />
          <Button onClick={logoutHandler} variant="link" className="p-0 h-auto">Logout</Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

export default Navbar;