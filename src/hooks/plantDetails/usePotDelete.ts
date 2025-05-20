import { useState, useCallback } from "react";
import { useDeletePot } from "../pots/useDeletePot";
import { useNavigate } from "react-router-dom";

export function usePotDelete(pot: any, potId: string | undefined, environmentID: string | undefined) {
    const { deletePot } = useDeletePot();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = useCallback(async () => {
        if (!pot) return;

        if (
            window.confirm(
                `Are you sure you want to delete ${pot.label}? This action cannot be undone.`
            )
        ) {
            setIsDeleting(true);

            try {
                const success = await deletePot(potId!, environmentID!);

                if (success) {
                    alert(`${pot.label} has been successfully deleted.`);
                    navigate("/plants");
                } else {
                    alert("Failed to delete the plant. Please try again.");
                }
            } catch (error) {
                console.error("Delete error:", error);
                alert("Failed to delete the plant. Please try again.");
            } finally {
                setIsDeleting(false);
            }
        }
    }, [pot, potId, environmentID, deletePot, navigate]);

    return { handleDelete, isDeleting };
}