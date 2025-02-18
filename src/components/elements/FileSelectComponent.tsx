/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";
import es_text from "../../text/es.json";

// Definimos los métodos que queremos exponer
export interface FileSelectComponentHandle {
  getFileSelected: () => File | null;
  checkFile: () => boolean;
}

const FileSelectComponent = forwardRef<FileSelectComponentHandle>((_, ref) => {
  const [inputFile, setInputFile] = useState<File | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {

    const selectedFile =event.target.files?.[0]

    if(selectedFile){
      setInputFile(selectedFile);
    }
  };

  // Método para obtener la opción seleccionada
  const getFileSelected = () => {
    return inputFile;
  };

  const checkFile = () => {
    let error = false;
    // Comprobar que el archivo no está vacío y que la extensión es correcta
    if (inputFile) {
      const extensionFile = inputFile.name.split(".").pop();
      if (extensionFile !== "txt") {
        error = true;
      }
    } else {
      error = true;
    }
    return error;
  };

  // Exponemos los métodos utilizando useImperativeHandle
  useImperativeHandle(ref, () => ({
    getFileSelected,
    checkFile,
  }));

  return (
    <div className="mb-10">
      <label className="mb-2 block text-xl font-medium text-gray-900 dark:text-white">
        {es_text["input-file-label"]}
      </label>
      <input
        className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
        id="file_input"
        type="file"
        onChange={handleInputChange}
      ></input>
    </div>
  );
});

export default FileSelectComponent;
