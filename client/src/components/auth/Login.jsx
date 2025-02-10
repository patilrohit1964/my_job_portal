import { setLoading, setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(state => state.authSlice);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res?.data?.message || 'User Logged successfully');
                setInput({ email: "", password: "", role: "student" });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error');
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>
                <form onSubmit={handleSubmit} className='md:w-1/2 w-full border border-gray-200 rounded-md p-6 my-10 shadow-md'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div>
                        <Label>Email</Label>
                        <Input type="email" name="email" placeholder="Enter your email" value={input.email} onChange={changeEventHandler} />
                    </div>
                    <div className='mt-3'>
                        <Label>Password</Label>
                        <Input type="password" name="password" placeholder="Enter your password" value={input.password} onChange={changeEventHandler} />
                    </div>
                    <div className='md:flex-row flex-col flex items-center justify-between mt-3 gap-4'>
                        <RadioGroup className="flex md:flex-row flex-col items-start md:items-center gap-4 my-4">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" id="r1" checked={input.role === "student"} onChange={changeEventHandler} />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" id="r2" checked={input.role === "recruiter"} onChange={changeEventHandler} />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Login
                        </Button>
                    )}
                    <div className='text-sm text-center'>Don't have an account? <Link to={"/signup"} className='text-blue-600'>Signup</Link></div>
                </form>
            </div>
        </div>
    );
};

export default Login;
