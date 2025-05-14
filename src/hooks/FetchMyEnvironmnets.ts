import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function FetchMyEnvironments() {
  const [error, setError] = useState("");
  const [environmentsList, setEnvironmentsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllEnvironments = async (userId: string) => {
    setError("");
    setEnvironmentsList([]);
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}/users/${userId}/environments`
      );
      console.log(response); //TODO remove
      setEnvironmentsList(response.data.environments);
    } catch (err: any) {
      setError(err.response?.data?.error || "an error occured");
    } finally {
      setLoading(false);
    }
  };
  return { error, environmentsList, loading, fetchAllEnvironments };
}
