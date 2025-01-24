import React from 'react'

const HeroSection = () => {
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No.1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6438c2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto culpa rerum provident. Doloribus nemo, ex laborum</p>
                <div>
                    <input type="text" placeholder='find you dream job' />
                </div>
            </div>
        </div>
    )
}

export default HeroSection