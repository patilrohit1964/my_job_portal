import { USER_API_END_POINT } from '@/utils/constants';
import { Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authSlice);

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        skills: user?.profile?.skills || [],
        file: user?.profile?.resume || null,
        bio: user?.profile?.bio || '',
    });

    const changeEventHandler = useCallback(
        (e) => {
            const { name, value } = e.target;
            setInput((prev) => ({ ...prev, [name]: value }));
        },
        [setInput]
    );

    const changeFileHandler = useCallback(
        (e) => {
            setInput((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
        },
        [setInput]
    );

    const handleInteractOutside = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(input).forEach(([key, value]) => {
            if (key === 'file' && value) {
                formData.append(key, value);
            } else if (key !== 'file') {
                formData.append(key, value);
            }
        });
        
        try {
            setLoading(true);
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                setOpen(false);
                toast.success('Profile Updated Successfully');
                setInput({
                    fullname: '',
                    email: '',
                    phoneNumber: '',
                    skills: [],
                    file: null,
                    bio: '',
                });
            }
        } catch (error) {
            toast.error('Error updating profile');
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={handleInteractOutside}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {[
                            { id: 'fullname', label: 'Name', type: 'text', value: input.fullname },
                            { id: 'email', label: 'Email', type: 'email', value: input.email },
                            { id: 'phoneNumber', label: 'Phone Number', type: 'tel', value: input.phoneNumber },
                            { id: 'bio', label: 'Bio', type: 'text', value: input.bio },
                            { id: 'skills', label: 'Skills', type: 'text', value: input.skills },
                        ].map((field) => (
                            <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={field.id}>{field.label}</Label>
                                <Input
                                    id={field.id}
                                    name={field.id}
                                    type={field.type}
                                    value={field.value}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        ))}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file">Resume</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={changeFileHandler}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="w-full my-4" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please Wait
                                </>
                            ) : (
                                'Update'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
