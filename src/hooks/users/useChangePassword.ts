import { use, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function useChangePassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const changePassword = async (email: string, oldPassword: string, newPassword: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.put(`${BASE_URL}/auth/password`, {
                email: email,
                old_password: oldPassword,
                new_password: newPassword,
            });
            console.log(response.data);
            setSuccess(response.data.message || "Password changed successfully");
        } catch (err: any) {
            setError(
                err.message ||
                "Failed to change password"
            );
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading, error, success };
}