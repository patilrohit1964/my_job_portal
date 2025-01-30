import React from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="text-center px-4 md:px-0">
            <div className="flex flex-col gap-5 my-10">
                {/* Badge */}
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm md:text-base">
                    No.1 Job Hunt Website
                </span>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Search, Apply & <br />
                    Get Your <span className="text-[#6438c2]">Dream Job</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto culpa rerum provident.
                    Doloribus nemo, ex laborum.
                </p>

                {/* Search Bar */}
                <div className="flex w-full md:w-[40%] shadow-lg border border-gray-200 px-3 py-2 rounded-full items-center gap-4 mx-auto">
                    <input
                        type="text"
                        placeholder="Find your dream job"
                        className="outline-none border-none w-full bg-transparent text-sm md:text-base px-2"
                    />
                    <Button className="rounded-r-full bg-[#6838c2]">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
