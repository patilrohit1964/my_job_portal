import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Navbar from "../shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { motion } from "framer-motion";

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 px-4">
                <div className="flex flex-wrap items-center justify-between gap-4 my-5">
                    <Input
                        className="w-full sm:w-auto"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button onClick={() => navigate("/admin/companies/create")}>
                            New Company
                        </Button>
                    </motion.div>
                </div>
                <CompaniesTable />
            </div>
        </motion.div>
    );
};

export default Companies;
