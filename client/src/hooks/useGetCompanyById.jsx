import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            const fetchSingleJobs = async () => {
                const { data } = await axios.get(`${COMPANY_API_END_POINT}/get-company/${companyId}`, {
                    withCredentials: true
                });
                if (data.status) {
                    dispatch(setSingleCompany(data.company));
                }
            }
            fetchSingleJobs();
        } catch (error) {
            console.log(error?.message);
        }
    }, [companyId, dispatch])
}

export default useGetCompanyById