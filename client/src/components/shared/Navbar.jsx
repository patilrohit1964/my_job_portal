import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Avatar from 'react-avatar'
import { AvatarImage } from '../ui/avatar'
import { Button } from "../ui/button"
import { LogOutIcon, User2 } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
    const user = false
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 shadow-md'>
                <div>
                    <h1 className='text-2xl font-bold'>Job <span className='text-[#f83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {/* <li><Link to={""}>Home</Link></li>
                        <li><Link to={""}>Jobs</Link></li>
                        <li><Link to={""}>Browser</Link></li> */}
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browser</li>
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
                                    <PopoverTrigger>
                                        <Avatar className="cursor-pointer rounded-full h-14 w-14">
                                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb5o1hIpacdSDsaGBsQjyMNGgH5ZTAuy_94Q&s" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="flex items-center space-y-3">
                                            <Avatar className="cursor-pointer rounded-full h-14 w-14">
                                                <AvatarImage className="w-full h-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb5o1hIpacdSDsaGBsQjyMNGgH5ZTAuy_94Q&s" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>Patil Rohit</h4>
                                                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3 text-gray-600 mt-4">
                                            <div className="flex items-center w-fit">
                                                <User2 />
                                                <Button variant="link">View Profile</Button>
                                            </div>
                                            <div className="w-fit flex items-center">
                                                <LogOutIcon />
                                                <Button variant="link">Logout</Button>
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