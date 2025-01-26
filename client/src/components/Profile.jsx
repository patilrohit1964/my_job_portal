import { Contact, Mail, Pen } from 'lucide-react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import { useState } from 'react'
import UpdateProfileDialog from './UpdateProfileDialog'

const Skills = ["node", "javascript", "reactjs", "react-dom"]
const Profile = () => {
    const isResume = true
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNp0Nv1kGgeyKZCHKvg8V7Q9_3RwZUkxz8bw&s" alt="profile" />
                        </Avatar>
                        <div>
                            <h1>Full Name</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quo accusamus quae ipsa laboriosam ipsum.</p>
                        </div>
                    </div>
                    <Button className="text-right" variant="outline" onClick={() => setOpen(true)}>
                        <Pen />
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-3'>
                        <Mail />
                        <span>patil@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-3 my-3'>
                        <Contact />
                        <span>3232323223</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            Skills.length === 0 ? <span>N/A</span> : Skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a href='https://yt.com' target='_blank' className='text-blue-500 w-full hover:underline'>Patil rp</a> : <span>N/A</span>
                    }
                </div>
                <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg my-3'>Applied Jobs</h1>
                    {/* Application Table */}
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile


