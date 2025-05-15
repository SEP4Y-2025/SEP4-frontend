import { useState } from "react";
import axios from "axios";

export const useAddEnvironments = () => {
    const [errorAdd, setErrorAdd] = useState<string | null>(null);
    const [successAdd, setSuccessAdd] = useState(false);

    const addEnvironment = async (environment_id: string, name: string) => {
        setErrorAdd(null);
        setSuccessAdd(false);
        try {
            await axios.post("/api/environments", { environment_id, name });
            setSuccessAdd(true);
        } catch (error: any) {
            setErrorAdd(error?.response?.data?.message || "Failed to add environment");
        }
    };

    return { addEnvironment, errorAdd, successAdd };
};