import { setAllCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            const fetchCompanies = async () => {
                const { data } = await axios.get(`${COMPANY_API_END_POINT}/get-company`, {
                    withCredentials: true
                });
                if (data.status) {
                    dispatch(setAllCompanies(data?.company));
                }
            }
            fetchCompanies();
        } catch (error) {
            console.log(error?.message);
        }
    }, [dispatch])
}

export default useGetAllCompanies