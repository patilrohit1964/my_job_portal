import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  })
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setInput({ ...input, [e?.target?.name]: e?.target?.value });
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e?.target?.files?.[0] });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input?.file) {
      formData.append('file', input.file);
    }
    try {
      setLoading(true);
      const { data } = await axios.put(`${COMPANY_API_END_POINT}/update-company/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (data?.success) {
        setLoading(false);
        toast.success(data?.message || "Company updated successfully");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <div className='flex items-center gap-5 p-8'>
          <Button variant="outline" onClick={() => navigate("/admin/companies")} className="flex items-center gap-2 text-gray-500 font-semibold">
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className='font-bold text-xl'>Company Setup</h1>
        </div>
        <form action="" onSubmit={submitHandler}>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={changeHandler} className="focus:border-blue-400" />
            </div>
            <div>
              <Label>Company Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeHandler} className="focus:border-blue-400" />
            </div>
            <div>
              <Label>Company Website</Label>
              <Input type="text" name="website" value={input.website} onChange={changeHandler} className="focus:border-blue-400" />
            </div>
            <div>
              <Label>Company Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeHandler} className="focus:border-blue-400" />
            </div>
            <div>
              <Label>Company Logo</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} className="focus:border-blue-400" />
            </div>
          </div>
          <Button type="submit" className="w-full mt-8">
            {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : "Update Company"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CompanySetup