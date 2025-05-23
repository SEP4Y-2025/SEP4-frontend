import React, { useEffect, useState } from "react";
import { fetchLogs } from "../services/api";
import LogTable from "../components/LogTable";
import { LogEntry } from "../types/logTypes";
import { Flex } from "../Styles/common/Flex";

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<String[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogs(data);
      } catch (err) {
        setError("Failed to fetch logs.");
      } finally {
        setLoading(false);
      }
    };
    loadLogs();
  }, []);

  return (
    <Flex $dir="column" $justifyC="center">
      <h1 className="text-3xl font-bold mb-4">📡 MQTT Logs</h1>

      {loading ? (
        <p>Loading logs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <LogTable logs={logs} />
      )}
    </Flex>
  );
};

export default LogsPage;
