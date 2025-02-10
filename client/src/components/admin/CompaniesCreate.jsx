import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import { motion } from "framer-motion";

const CompaniesCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const { data } = await axios.post(
                `${COMPANY_API_END_POINT}/create-company`,
                { companyName },
                { withCredentials: true }
            );
            if (data.success) {
                dispatch(setSingleCompany(data?.company));
                toast.success(data?.message);
                navigate(`/admin/companies/${data?.company?._id}`);
            }
        } catch (error) {
            console.log(error?.message);
            toast.error(error?.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar />
            <div className="max-w-4xl mx-auto px-4">
                <div className="my-10 text-center sm:text-left">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p className="text-gray-500">
                        What would you like to name your company? You can change this later.
                    </p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2 w-full"
                    placeholder="Job Hunt, HP, etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className="flex flex-wrap gap-2 my-6 justify-center sm:justify-start">
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button variant="outline" onClick={() => navigate("/admin/companies")}>
                            Cancel
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button onClick={registerNewCompany}>Continue</Button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default CompaniesCreate;
