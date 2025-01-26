import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
const filterData = [
    {
        filterType: "location",
        array: [
            "New York",
            "London",
            "Mumbai",
            "Singapore",
            "Dubai",
            "Tokyo",
            "Sydney",
            "Toronto",
            "Berlin",
            "Paris"
        ]
    },
    {
        filterType: "Industry",
        array: [
            "it",
            "finance",
            "healthcare",
            "education",
            "retail",
            "government",
        ]
    },
    {
        filterType: "Salary",
        array: [
            "25k",
            "35k",
            "45k",
            "55k",
            "265k",
        ]
    },
]

const FilterCard = () => {
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, index) => (
                                    <div key={index} className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item}></RadioGroupItem>
                                        <Label>{item}</Label>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard