import { JOB_API_END_POINT } from '@/utils/constants';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: '',
        companyId: '',
    });

    const { companies } = useSelector((state) => state.company);
    const navigate = useNavigate();

    // Handles input fields change
    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handles company selection
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company._id === value);
        if (selectedCompany) {
            setInput((prev) => ({ ...prev, companyId: selectedCompany._id }));
        }
    };

    // Validates the form before submitting
    const validateForm = () => {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = input;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            toast.error("Please fill in all fields before submitting!");
            return false;
        }
        return true;
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop if validation fails

        setLoading(true);
        try {
            const { data } = await axios.post(`${JOB_API_END_POINT}/create-job`, input, {
                withCredentials: true,
            });

            if (data?.success) {
                toast.success(data?.message || 'Job Posted Successfully');
                navigate('/admin/jobs');

                // Reset input fields only after a successful submission
                setInput({
                    title: '',
                    description: '',
                    requirements: '',
                    salary: '',
                    location: '',
                    jobType: '',
                    experience: '',
                    position: '',
                    companyId: '',
                });
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5">
                <form onSubmit={handleSubmit} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { label: 'Title', name: 'title', type: 'text' },
                            { label: 'Description', name: 'description', type: 'text' },
                            { label: 'Requirements', name: 'requirements', type: 'text' },
                            { label: 'Salary', name: 'salary', type: 'number' },
                            { label: 'Location', name: 'location', type: 'text' },
                            { label: 'Job Type', name: 'jobType', type: 'text' },
                            { label: 'Experience Level', name: 'experience', type: 'number' },
                            { label: 'No of Position', name: 'position', type: 'number' },
                        ].map((field) => (
                            <div key={field.name}>
                                <Label>{field.label}</Label>
                                <Input
                                    type={field.type}
                                    name={field.name}
                                    value={input[field.name]}
                                    onChange={handleInputChange}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                />
                            </div>
                        ))}

                        {companies.length > 0 && (
                            <div>
                                <Label>Company</Label>
                                <Select onValueChange={selectChangeHandler} value={input.companyId}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company._id}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Post New Job
                        </Button>
                    )}

                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-bold text-center my-3">
                            *Please register a company first before posting a job
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
