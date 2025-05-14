import { use, useState } from "react";
import axios from "axios";

export function useChangePassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const changePassword = async (username: string, oldPassword: string, newPassword: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.post("http://localhost:8000/auth/change-password", {
                username,
                old_password: oldPassword,
                new_password: newPassword,
            });
            setSuccess(response.data?.message || "Password changed successfully");
        } catch (err: any) {
            setError(
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Failed to change password"
            );
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading, error, success };
}