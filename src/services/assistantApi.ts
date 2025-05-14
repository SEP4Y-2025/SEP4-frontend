import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const invitePlantAssistant = async (environmentId: string, userMail: string) => {
    const response = await axios.put(`${BASE_URL}/environments/${environmentId}/assistants`, {
        user_email: userMail,
    })
    return response.data.message;
}