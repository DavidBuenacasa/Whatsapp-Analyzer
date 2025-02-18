/* eslint-disable @typescript-eslint/no-unused-vars */
import es_text from "../../text/es.json";
import { useState } from "react";

interface SelectYearData {
  years: string[];
  onYearChange: (year: string) => void;
}

const SelectYear = ({ years, onYearChange }: SelectYearData) => {
  const [yearSelected, setYearSelected] = useState(years[0]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;
    setYearSelected(selectedYear);
    onYearChange(selectedYear);
  };

  return (
    <div>
      <form className="mx-auto max-w-sm">
        <label
          htmlFor="years"
          className="mb-2 block text-xl font-medium text-gray-900 dark:text-white"
        >
          {es_text.SelectYear}
        </label>
        <select
          id="years"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={handleOptionChange}
          value={yearSelected}
        >
          <option value="0">{es_text.totalSelect}</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {"20" + year}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default SelectYear;
