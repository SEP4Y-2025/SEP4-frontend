import React from "react";
import { LogEntry } from "../types/logTypes";
import SensorDisplay from "./SensorDisplay";
import { Flex } from "../Styles/Flex";

interface LogTableProps {
  logs: String[];
}

const LogTable: React.FC<LogTableProps> = ({ logs }) => {
  return (
    <Flex $dir="column">
      <h2 className="text-2xl font-semibold mb-4">📜 Plant Logs</h2>

      {logs.length === 0 ? (
        <p className="text-gray-500">No logs available.</p>
      ) : (
        <Flex $dir="column">
          <ul className="list-group">
            {logs.map((log, index) => (
              <li key={index} className="list-group-item">
                {log}
              </li>
            ))}
          </ul>
        </Flex>
      )}
    </Flex>
  );
};

export default LogTable;
