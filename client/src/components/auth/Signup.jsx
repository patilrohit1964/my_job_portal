import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: ""
    })
    const [focusedInput, setFocusedInput] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.authSlice);
    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("role", input.role);
        formData.append("password", input.password);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success('User registered successfully');
                setInput({ fullname: "", email: "", phoneNumber: "", password: "", role: "student", file: "" });
            }
        } catch (error) {
            console.error(error?.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {

    }, [])


    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-md' onSubmit={handleSubmit}>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            name="fullname"
                            placeholder="enter your fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            onFocus={() => setFocusedInput("fullname")}
                            onBlur={() => setFocusedInput("")}
                            className={focusedInput === "fullname" ? "border-blue-500 ring-2 ring-blue-200" : ""}
                        />
                    </div>
                    <div className='mt-3'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            name="phoneNumber"
                            placeholder="enter your phone number"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            onFocus={() => setFocusedInput("phoneNumber")}
                            onBlur={() => setFocusedInput("")}
                            className={focusedInput === "phoneNumber" ? "border-blue-500 ring-2 ring-blue-200" : ""}
                        />
                    </div>
                    <div className='mt-3'>
                        <Label>Email</Label>
                        <Input
                            type="text"
                            name="email"
                            placeholder="enter your email"
                            value={input.email}
                            onChange={changeEventHandler}
                            onFocus={() => setFocusedInput("email")}
                            onBlur={() => setFocusedInput("")}
                            className={focusedInput === "email" ? "border-blue-500 ring-2 ring-blue-200" : ""}
                        />
                    </div>
                    <div className='mt-3'>
                        <Label>Password</Label>
                        <Input
                            type="text"
                            name="password"
                            placeholder="enter your password"
                            value={input.password}
                            onChange={changeEventHandler}
                            onFocus={() => setFocusedInput("password")}
                            onBlur={() => setFocusedInput("")}
                            className={focusedInput === "password" ? "border-blue-500 ring-2 ring-blue-200" : ""}
                        />
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <RadioGroup className="flex items-center gap-4 my-4">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" id="r1" checked={input.role === "student"} onChange={changeEventHandler} />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" id="r2" checked={input.role === "recruiter"} onChange={changeEventHandler} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                className={`cursor-pointer ${focusedInput === "file" ? "border-blue-500 ring-2 ring-blue-200" : ""}`}
                                onChange={changeFileHandler}
                                onFocus={() => setFocusedInput("file")}
                                onBlur={() => setFocusedInput("")}
                            />
                        </div>
                    </div>
                    {loading ? <Button className="w-full my-4" disabled={loading}><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button> :
                        <Button type="submit" className="w-full my-4">
                            Signup
                        </Button>
                    }
                    <div className='text-sm text-center'>Already have an account? <Link to={"/login"} className='text-blue-600'>Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Signup