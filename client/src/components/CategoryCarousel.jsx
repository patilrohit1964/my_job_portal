import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button';

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
    return (
        <div>
            <Carousel classname="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {categories.map((el, index) => (
                        <CarouselItem key={index} classname="md:basis-1/2 lg:basis-1/3">
                            <Button classname="rounded-full" variant="outline">{el}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default CategoryCarousel