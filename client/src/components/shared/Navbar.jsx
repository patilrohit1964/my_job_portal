import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { setUser } from "@/redux/authSlice"
import { USER_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { LogOut, User2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from "../ui/button"

const Navbar = () => {
    const { user } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/login");
                toast.success(res?.data?.message || 'User logged out successfully');
            }
        } catch (error) {
            console.log(error?.message);
            toast.error(error?.responce?.data?.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job <span className='text-[#f83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/jobs"}>Jobs</Link></li>
                        <li><Link to={"/browse"}>Browse</Link></li>
                    </ul>
                    {
                        !user ?
                            (
                                <div className="flex items-center justify-center gap-4">
                                    <Button variant="outline"><Link to={"/login"}>Login</Link></Button>
                                    <Button><Link to={"/signup"}>Signup</Link></Button>
                                </div>
                            ) :
                            (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer border border-gray-500">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto
                                                    ? `${user.profile.profilePhoto}`
                                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc-mqLayESeL4RE5ayMWt_nFEC3v3b4SvwuQ&s"}
                                                alt="@shadcn"
                                            />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className=''>
                                            <div className='flex gap-2 space-y-2'>
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage
                                                        src={user?.profile?.profilePhoto
                                                            ? `${user.profile.profilePhoto}`
                                                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc-mqLayESeL4RE5ayMWt_nFEC3v3b4SvwuQ&s"}
                                                        alt="@shadcn"
                                                    />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer mt-2'>
                                                            <User2 />
                                                            <Link to={"/profile"}><Button variant="link">View Profile</Button></Link>
                                                        </div>
                                                    )
                                                }
                                                <div className='flex w-fit items-center gap-2 cursor-pointer mt-2'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar