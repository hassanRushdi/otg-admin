import { useState } from "react";
import { header } from "./notification";
import axios from "axios";

// Validate From Fields
const useFetch = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);

    async function fetchServices() {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/services?per_page=-1`, header);
            setServices(data?.data) 
            
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    }
    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories?per_page=-1`, header);
            setCategories(data?.data)
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    return {
        fetchServices,
        categories,
        fetchCategories,
        services
    }
}

export default useFetch
