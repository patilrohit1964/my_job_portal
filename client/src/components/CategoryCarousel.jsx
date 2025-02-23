import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Software Development",
    "Data Science",
    "Web Development",
    "UI/UX Design",
    "Digital Marketing",
    "Project Management",
    "Cloud Computing",
    "Cybersecurity",
    "Artificial Intelligence",
    "DevOps Engineering",
    "Business Analysis",
    "Quality Assurance"
];

const CategoryCarousel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <section className="w-full max-w-5xl mx-auto my-16 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Explore Categories</h2>

            <Carousel className="w-full overflow-x-hidden">
                <CarouselContent className="flex items-center">
                    {categories.map((el, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
                        >
                            <Button onClick={() => searchJobHandler(el)} className="rounded-full px-6 py-3 text-sm md:text-base" variant="outline">
                                {el}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
};

export default CategoryCarousel;
