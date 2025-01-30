import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { LogOut, User2, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const Navbar = () => {
    const { user } = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/login");
                toast.success(res?.data?.message || "Logged out successfully");
            }
        } catch (error) {
            console.error(error?.message);
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="flex items-center justify-between mx-auto max-w-7xl px-6 py-4">
                {/* Logo */}
                <h1 className="text-2xl font-bold">
                    Job <span className="text-[#f83002]">Portal</span>
                </h1>

                {/* Hamburger Menu (Mobile) */}
                <button
                    className="md:hidden text-gray-600"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Menu size={28} />
                </button>

                {/* Navigation Links (Hidden on mobile) */}
                <ul
                    className={`md:flex items-center gap-6 font-medium absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent transition-transform transform ${menuOpen ? "translate-y-0" : "-translate-y-[200%]"
                        } md:translate-y-0 shadow-md md:shadow-none p-6 md:p-0`}
                >
                    <li>
                        <Link
                            to="/"
                            className="block py-2 px-4 hover:text-[#f83002] transition-colors"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/jobs"
                            className="block py-2 px-4 hover:text-[#f83002] transition-colors"
                        >
                            Jobs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/browse"
                            className="block py-2 px-4 hover:text-[#f83002] transition-colors"
                        >
                            Browse
                        </Link>
                    </li>
                </ul>

                {/* User Authentication */}
                {!user ? (
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="outline">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button>
                            <Link to="/signup">Signup</Link>
                        </Button>
                    </div>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer border border-gray-400 hover:border-gray-600 transition">
                                <AvatarImage
                                    src={user?.profile?.profilePhoto ||
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc-mqLayESeL4RE5ayMWt_nFEC3v3b4SvwuQ&s"}
                                    alt="User Profile"
                                />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-72">
                            <div className="p-3">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto ||
                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc-mqLayESeL4RE5ayMWt_nFEC3v3b4SvwuQ&s"}
                                            alt="User Avatar"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">{user?.fullname}</h4>
                                        <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                                    </div>
                                </div>

                                {/* Profile & Logout Options */}
                                <div className="flex flex-col mt-4 space-y-2">
                                    {user.role === "student" && (
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 text-gray-700 hover:text-[#f83002] transition cursor-pointer"
                                        >
                                            <User2 />
                                            <Button variant="link">View Profile</Button>
                                        </Link>
                                    )}
                                    <div className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition cursor-pointer">
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant="link">
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
