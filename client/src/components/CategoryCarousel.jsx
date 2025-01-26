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
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {categories.map((el, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Button className="rounded-full" variant="outline">{el}</Button>
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