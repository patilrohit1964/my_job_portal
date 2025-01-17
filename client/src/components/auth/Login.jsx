import { Link } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'

const Login = () => {
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-md'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div>
                        <Label>Email</Label>
                        <Input type="text" placeholder="enter your email" />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input type="text" placeholder="enter your password" />
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <RadioGroup className="flex items-center gap-4 my-4">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" className="cursor-pointer" name="role" value="student" id="r1" defaultChecked />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" className="cursor-pointer" name="role" value="recruiter" id="r2" />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button type="submit" className="w-full my-4">Login</Button>
                    <div className='text-sm text-center'>Don't have an account? <Link to={"/signup"} className='text-blue-600'>Signup</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Login