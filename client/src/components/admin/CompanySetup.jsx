import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  })

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
    formData.append('logo', input.file);
   
  }
  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <form action="" onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Button variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
          </div>
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
          <Button type="submit" className="w-full mt-8">Update</Button>
        </form>
      </div>
    </div>
  )
}

export default CompanySetup