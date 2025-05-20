import { useEffect, useState } from "react";
import { useGetPotById } from "../pots/useGetPotById";
import { useGetTypesByEnvironment } from "../pots/useGetTypesByEnvironment";
import { Pot, PlantType } from "../../types";

interface UsePotWithTypeResult {
    pot: Pot | null;
    type: PlantType | null;
    loading: boolean;
    errorMessage: string | null;
}

export function usePotWithType(
    potId: string | undefined,
    environmentID: string | undefined,
    user?: { user_id: string }
): UsePotWithTypeResult {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (potId && environmentID && user?.user_id) {
            setReady(true);
        } else {
            setReady(false);
        }
    }, [potId, environmentID, user]);

    const { pot, loading, error } = useGetPotById(
        ready ? potId! : "",
        ready ? environmentID! : ""
    );
    const { types } = useGetTypesByEnvironment(environmentID || "");

    const type = pot ? types.find((t) => t._id === pot.plant_type_id) || null : null;

    const errorMessage = error ? error.message : ""

    return { pot: pot || null, type, loading, errorMessage: errorMessage };
}
export default usePotWithType;