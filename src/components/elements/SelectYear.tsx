/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import es_text from "../../text/es.json";
import { useState } from "react";

interface SelectYearData {
  years: string[];
}

const SelectYear: React.FC<SelectYearData> = ({ years }) => {

    const [yearSelected, setyearSelected] = useState("");

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setyearSelected(event.target.value);
      };

  return (
    <div>
      <form className="mx-auto max-w-sm">
        <label
          htmlFor="countries"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {es_text.SelectYear}
        </label>
        <select
          id="countries"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={handleOptionChange}
          defaultValue={22}
        >
          <option>{es_text.SelectYearPlaceholder}</option>
          {years.map((year, index) => (
            <option key={index} value={year} >
              {"20"+year}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default SelectYear;
