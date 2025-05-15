import { use, useState } from "react";
import axios from "axios";

export function useDeleteEnvironment() {
    const [errorDelete, setErrorDelete] = useState<string | null>(null);
    const [successDelete, setSuccessDelete] = useState<string | null>(null);

    const deleteEnvironment = async (environmentId: string) => {
        setErrorDelete(null);
        setSuccessDelete(null);
        try {
            const response = await axios.delete("http://localhost:8000/environments/" + environmentId);
            setSuccessDelete(response.data?.message || "Password changed successfully");
        } catch (err: any) {
            setErrorDelete(
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Failed to delete environment"
            );
        }
    };

    return { deleteEnvironment, errorDelete: errorDelete, successDelete: successDelete };
}