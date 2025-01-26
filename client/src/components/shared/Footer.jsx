import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { Input, Button } from "@/components/ui";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-4 gap-8"
            >
                {/* About Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4">About Us</h2>
                    <p className="text-sm text-gray-400">
                        Explore thousands of job opportunities with our platform. Connecting professionals and recruiters to achieve career goals.
                    </p>
                </div>

                {/* Navigation Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-300">Home</a></li>
                        <li><a href="#" className="hover:text-gray-300">Jobs</a></li>
                        <li><a href="#" className="hover:text-gray-300">Companies</a></li>
                        <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
                            <FaTwitter />
                        </a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
                            <FaLinkedinIn />
                        </a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
                            <FaInstagram />
                        </a>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter to get the latest job updates directly in your inbox.</p>
                    <div className="flex space-x-2">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 text-white">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-gray-800 py-4"
            >
                <p className="text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
                </p>
            </motion.div>
        </footer>
    );
};

export default Footer;
