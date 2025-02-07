import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicationsTable from './ApplicationsTable'

const Applicants = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applications 6</h1>
                <ApplicationsTable />
            </div>
        </div>
    )
}

export default Applicants