import {
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useState,
} from "react";
import es_text from "../../text/es.json";

// Definimos los métodos que queremos exponer
export interface RadioButtonComponentHandle {
  getOptionSelected: () => string;
  checkRadioButtonSelected: () => boolean;
}

const RadioButtonComponent = forwardRef<RadioButtonComponentHandle>(
  (_, ref) => {
    const [radioOption, setSelectedOption] = useState(" ");

    // Función para manejar el cambio de selección
    const handleOptionChange = (event: {
      target: { value: SetStateAction<string> };
    }) => {
      setSelectedOption(event.target.value);
    };

    // Método para obtener la opción seleccionada
    const getOptionSelected = () => {
      return radioOption;
    };

    // Método para comprobar que existe una opcion seleccionada
    const checkRadioButtonSelected = () => {
      let error = false;

      if (radioOption == " ") {
        error = true;
      }
      return error;
    };

    // Exponemos los métodos utilizando useImperativeHandle
    useImperativeHandle(ref, () => ({
      getOptionSelected,
      checkRadioButtonSelected,
    }));

    return (
      <div>
        <h3 className="mb-5 text-xl font-medium text-gray-900 dark:text-white">
          {es_text["radioButton-device"]}
        </h3>
        <ul className="grid w-full items-center justify-center gap-6 md:grid-cols-2">
          <li className="device-div">
            <input
              type="radio"
              id="hosting-small"
              name="device"
              value="iphone"
              className="peer hidden"
              checked={radioOption === "iphone"}
              onChange={handleOptionChange}
              required
            />
            <label
              htmlFor="hosting-small"
              className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:border-blue-600 dark:peer-checked:text-blue-500"
            >
              <div className=" flex items-center gap-3">
                <svg
                  className="size-[36px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="w-full text-lg font-semibold">Iphone</div>
              </div>
            </label>
          </li>
          <li className="device-div">
            <input
              type="radio"
              id="hosting-big"
              name="device"
              value="android"
              checked={radioOption === "android"}
              onChange={handleOptionChange}
              className="device-div peer hidden"
            />
            <label
              htmlFor="hosting-big"
              className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:border-blue-600 dark:peer-checked:text-blue-500"
            >
              <div className="flex items-center gap-3 ">
                <svg
                  className="size-[36px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 15h12M6 6h12m-6 12h.01M7 21h10a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1Z"
                  />
                </svg>
                <div className="w-full text-lg font-semibold">Android</div>
              </div>
            </label>
          </li>
        </ul>
      </div>
    );
  },
);

export default RadioButtonComponent;
