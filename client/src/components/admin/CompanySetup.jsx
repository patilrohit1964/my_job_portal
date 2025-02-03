import { COMPANY_API_END_POINT } from '@/utils/constants'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import { motion } from "framer-motion"
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import useGetCompanyById from '@/hooks/useGetCompanyById'
const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  })
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  useGetCompanyById(id);
  const { singleCompany } = useSelector(state => state?.company)
  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.logo || "",
    })
  }, [singleCompany])
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setInput({ ...input, [e?.target?.name]: e?.target?.value });
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e?.target?.files?.[0] });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input?.file) {
      formData.append('file', input.file);
    }
    try {
      setLoading(true);
      const { data } = await axios.put(`${COMPANY_API_END_POINT}/update-company/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (data?.success) {
        setLoading(false);
        toast.success(data?.message || "Company updated successfully");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='max-w-xl mx-auto my-10 px-4 sm:px-6'
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className='flex flex-col sm:flex-row items-center gap-5 p-4 sm:p-8'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
          </motion.button>
          <h1 className='font-bold text-xl text-center sm:text-left'>Company Setup</h1>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          onSubmit={submitHandler}
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {["name", "description", "website", "location"].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Label>Company {field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  type="text"
                  name={field}
                  value={input[field]}
                  onChange={changeHandler}
                  className="focus:border-blue-400 transition-all duration-300"
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Label>Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="focus:border-blue-400 transition-all duration-300"
              />
            </motion.div>
            {/* <div>
              {input.file ? (
                <img src={URL.createObjectURL(input.file)} alt="Company Logo" className="w-32 h-32 object-cover rounded-md" />
              ) : (
                singleCompany?.logo && <img src={singleCompany.logo} alt="Company Logo" className="w-32 h-32 object-cover rounded-md" />
              )}
            </div> */}

          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button type="submit" className="w-full mt-8">
              {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : "Update Company"}
            </Button>
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default CompanySetup