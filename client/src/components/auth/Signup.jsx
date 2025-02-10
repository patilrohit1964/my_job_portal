import { setLoading, setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup } from '../ui/radio-group';
import { motion } from 'framer-motion';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: ""
    });

    const [focusedInput, setFocusedInput] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(state => state.authSlice);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

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
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
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
                <motion.form
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-full sm:w-3/4 md:w-1/2 border border-gray-200 rounded-md p-6 my-10 shadow-md bg-white'
                    onSubmit={handleSubmit}
                >
                    <h1 className='font-bold text-xl mb-5 text-center'>Sign Up</h1>

                    {["fullname", "phoneNumber", "email", "password"].map((field, index) => (
                        <motion.div
                            key={field}
                            className='mt-3'
                            whileHover={{ scale: 1.02 }}
                        >
                            <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                            <Input
                                type={field === "password" ? "password" : "text"}
                                name={field}
                                placeholder={`Enter your ${field}`}
                                value={input[field]}
                                onChange={changeEventHandler}
                                onFocus={() => setFocusedInput(field)}
                                onBlur={() => setFocusedInput("")}
                                className={`transition-all duration-300 ${focusedInput === field ? "border-blue-500 ring-2 ring-blue-200" : ""
                                    }`}
                            />
                        </motion.div>
                    ))}

                    <div className='flex flex-col sm:flex-row justify-between mt-3'>
                        <RadioGroup className="flex items-center gap-4 my-4">
                            {["student", "recruiter"].map((role) => (
                                <div key={role} className="flex items-center space-x-2">
                                    <Input type="radio" name="role" value={role} id={role} checked={input.role === role} onChange={changeEventHandler} />
                                    <Label htmlFor={role} className="cursor-pointer">{role.charAt(0).toUpperCase() + role.slice(1)}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                className="cursor-pointer transition-all duration-300"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <Button className="w-full my-4 flex items-center justify-center" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                        </Button>
                    ) : (
                        <motion.div whileHover={{ scale: 1.02 }}>
                            <Button type="submit" className="w-full my-4">
                                Signup
                            </Button>
                        </motion.div>
                    )}

                    <div className='text-sm text-center'>
                        Already have an account? <Link to={"/login"} className='text-blue-600'>Login</Link>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default Signup;
