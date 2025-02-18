/* eslint-disable @typescript-eslint/no-unused-vars */
import es_text from "../../text/es.json";
import { useState } from "react";

interface SelectPersonaData {
  personas: string[];
  onPersonaChange: (persona: string) => void;
}

const SelectPersona = ({ personas, onPersonaChange }: SelectPersonaData) => {
  const [personaSelected, setPersonaSelected] = useState(personas[0]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPersona = event.target.value;
    setPersonaSelected(selectedPersona);
    onPersonaChange(selectedPersona);
  };

  return (
    <div>
      <form className="mx-auto max-w-sm">
        <label
          htmlFor="years"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {es_text.SelectPersona}
        </label>
        <select
          id="years"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={handleOptionChange}
          value={personaSelected}
        >
          {personas.map((persona, index) => (
            <option key={index} value={persona}>
              {persona}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default SelectPersona;
