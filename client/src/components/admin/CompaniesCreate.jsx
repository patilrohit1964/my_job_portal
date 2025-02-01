import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const CompaniesCreate = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <h1 className='font-bold text-2xl'>Your Company Name</h1>
                <p className='text-gray-500'>What would you like to give your company name? you can change this later</p>
                <Label>Company Name</Label>
                <Input type="text" className="my-2" placeholder="Job Hunt, hp etc" />
                <div className='flex items-center gap-2 my-18'>
                    <Button varient="outline">Cancel</Button>
                    <Button>Continue</Button>

                </div>

            </div>
        </div>
    )
}

export default CompaniesCreate