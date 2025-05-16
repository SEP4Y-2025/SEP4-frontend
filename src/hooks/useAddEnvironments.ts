import { useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const useAddEnvironments = () => {
    const [errorAdd, setErrorAdd] = useState<string | null>(null);
    const [successAdd, setSuccessAdd] = useState(false);

    const addEnvironment = async (name: string) => {
        setErrorAdd(null);
        setSuccessAdd(false);
        try {
            await axios.post(`${BASE_URL}/environments`, { name: name });
            setSuccessAdd(true);
        } catch (error: any) {
            console.error("Error adding environment:", error.response?.data.message);
            setErrorAdd(error?.response?.data?.message || "Failed to add environment");
        }
    };

    return { addEnvironment, errorAdd, successAdd };
};