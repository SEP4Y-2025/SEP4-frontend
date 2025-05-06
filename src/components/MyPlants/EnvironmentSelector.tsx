import React from "react";

interface Environment {
  name: string;
  windowState: "open" | "closed";
  airHumidity: number;
  temperature: number;
}

interface EnvironmentSelectorProps {
  environments: Environment[];
  selectedEnvironmentName: string;
  onSelect: (environmentName: string) => void;
}

const EnvironmentSelector: React.FC<EnvironmentSelectorProps> = ({
  environments,
  selectedEnvironmentName,
  onSelect,
}) => {
  return (
    <div className="environment-selector">
      <label htmlFor="environment-select">Select Environment:</label>
      <select
        id="environment-select"
        value={selectedEnvironmentName}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Choose Environment --</option>
        {environments.map((env) => (
          <option key={env.name} value={env.name}>
            {env.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EnvironmentSelector;
