import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'

const Profile = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <Avatar className="h-24 w-24">
                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNp0Nv1kGgeyKZCHKvg8V7Q9_3RwZUkxz8bw&s" alt="profile" />
                </Avatar>
                <h1>Full Name</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quo accusamus quae ipsa laboriosam ipsum.</p>
            </div>
        </div>
    )
}

export default Profile