import axios from "axios"
import { getToken } from "../utils/cookie";
import { getCurrentCurrency } from "./handle_currency";

const url = process.env.REACT_APP_BACKEND_URL;
const createHeaders = () => {
    const token = getToken();
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
};
export const getHomeData = async () => {
    try {
        const response = await axios.get(`${url}/home`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching home data:", error);
    }

}
export const getAllGames = async (selectedGenreNames, currentPage, minPrice, maxPrice) => {
    try {
        const response = await axios.get(`${url}/products`, {
            params: {
                limit: 24,
                page: 1,
                genres: selectedGenreNames.join(','),
                currentPage: currentPage,
                minPrice: minPrice,
                maxPrice: maxPrice,
                currency: getCurrentCurrency().toUpperCase()



            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching games data:", error);
    }

}
export const getGameById = async (id) => {
    try {
        console.log("getGameById")
        const response = await axios.get(`${url}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching getGameById:", error);
    }

}
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${url}/user/login`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;

    }

}

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${url}/user/forgot-password`, { email });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}

export const verifyOtp = async (otp) => {
    try {
        const response = await axios.post(`${url}/user/verify-otp`, { otp });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}
export const resetPassword = async (email, otp, newPassword) => {
    try {
        const response = await axios.post(`${url}/user/reset-password`, { email, otp, newPassword });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}

export const signup = async (username, lastname, email, password) => {
    try {
        const response = await axios.post(`${url}/user/signup`, { username, lastname, email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}

export const verifyMail = async (token) => {
    try {
        const response = await axios.get(`${url}/user/verify/${token}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }

}
export const myOrders = async () => {
    try {
        const headers = createHeaders();

        const response = await axios.get(`${url}/order`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching myOrders:", error);
    }

}
export const myWishList = async () => {
    try {
        const headers = createHeaders();

        const response = await axios.get(`${url}/wishlist`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching myWishList:", error);
    }

}
export const addWishlist = async (game_id) => {
    try {
        const headers = createHeaders();

        const response = await axios.post(`${url}/wishlist/add`, { game_id }, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching addWishlist:", error);
        throw error; // Re-throwing the error for the caller to handle
    }

}
export const deleteWishList = async (game_id) => {
    try {
        const headers = createHeaders();

        const response = await axios.post(`${url}/wishlist/delete`, { game_id }, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching deleteWishList:", error);
        throw error;
    }

}
export const Payment_checkout = async (body) => {
    try {
        const response = await axios.post(`${url}/products/payment_checkout`, body);
        return response.data;
    } catch (error) {
        console.error("Error fetching games data:", error);

    }
}
export const getAllKinguinGames = async (name, genres, page, minPrice, maxPrice) => {
    try {
        const response = await axios.get(`${url}/products/kinguin/${name}`, {
            params: {
                limit: 16,
                page: page,
                genres: genres.join(','),
                minPrice: minPrice,
                maxPrice: maxPrice,
                currency: getCurrentCurrency().toUpperCase()

            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching games data:", error);
    }

}
export const getKinguinProduct = async (id) => {
    try {
        const response = await axios.get(`${url}/products/kinguinId/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching games data:", error);

    }
}

export const myIpAdress = async () => {
    try {
        const response = await axios.get(`${url}/myip`);
        return response.data;
    } catch (error) {
        console.error("Error fetching games data:", error);
    }

}

export const blockeds = async () => {
    try {
        const response = await axios.get(`${url}/blocker/ips`);
        return response.data;
    } catch (error) {
        console.error("Error fetching games data:", error);
    }

}

export const blockedsCountries = async () => {
    try {
        const response = await axios.get(`${url}/blocker/countries`);
        return response.data;
    } catch (error) {
        console.error("Error fetching games data:", error);
    }

}

export const googleLoginCheck = async (body) => {
    try {
        const response = await axios.post(`${url}/login/sucess`);
        return response.data;
    } catch (error) {
        console.error("Error fetching login:", error);
    }

}

export const myProfile = async () => {
    try {
        const headers = createHeaders();

        const response = await axios.get(`${url}/user/profile`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error fetching myOrders:", error);
        // Re-throwing the error for the caller to handle
    }

}