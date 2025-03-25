import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';

export const getCategoryWiseProducts = async (categoryId) => {
    try {
        const response = await Axios({
            ...SummaryApi.getProductsByCategory, // Ensure API endpoint is correct
            data: { categoryId },
        });

        if (response.data.success) {
            return response.data.data; // Return fetched products
        } else {
            return [];
        }
    } catch (error) {
        AxiosToastError(error);
        return [];
    }
};
