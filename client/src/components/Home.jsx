import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJob from '@/hooks/useGetAllJob'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    useGetAllJob();
    const { user } = useSelector(state => state.authSlice)
    const navigate = useNavigate()
    useEffect(() => {
        if (user?.role == "recruiter") {
            navigate("/admin/companies");
        }
    }, [])
    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home