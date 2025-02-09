import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
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
            "IT",
            "Finance",
            "Healthcare",
            "Education",
            "Retail",
            "Government",
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
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();
    const changeHandler = () => {
        setSelectedValue(e.target.value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])
    return (
        <div className='w-full bg-white p-6 rounded-md shadow-lg'>
            <h1 className='font-bold text-xl text-gray-800 mb-4'>Filter Jobs</h1>
            <hr className='mb-4' />
            <RadioGroup onValueChange={changeHandler} value={selectedValue}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h2 className='font-semibold text-lg text-gray-700 mb-3'>{data.filterType}</h2>
                            {
                                data.array.map((item, idx) => {
                                    const radioId = `r-${index}-${idx}`
                                    return (
                                        <div key={index} className='flex items-center space-x-3 my-2'>
                                            <RadioGroupItem value={item} id={radioId} className="transition duration-200 ease-in-out transform hover:scale-105 hover:text-blue-500"></RadioGroupItem>
                                            <Label className='text-gray-700' htmlFor={radioId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div >
    )
}

export default FilterCard
