/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import es_text from "./text/es.json";
import FileSelectComponent, {
  FileSelectComponentHandle,
} from "./components/elements/FileSelectComponent";
import RadioButtonComponent, {
  RadioButtonComponentHandle,
} from "./components/elements/RadioButtonComponent";
import "./styles/inicio.css";
import Stats from "./fichero/Stats";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNavComponent from "./components/elements/headerNav";

const Inicio: React.FC = () => {
  const radioButtonRef = useRef<RadioButtonComponentHandle>(null);
  const fileSelectRef = useRef<FileSelectComponentHandle>(null);
  const navigate = useNavigate();

  {
    /*Al hacer click sobre analizar se comprobara que todos los parametros son correctos*/
  }
  function checkElements() {
    let error: boolean = false;
    let messageError: string = "";
    let fileSelected: File | null = new File([], "filename");
    let radioOption: string = "";

    {/*Se comprueba que se ha seleccionado un RadioButton*/}

    if (radioButtonRef.current) {
      if (radioButtonRef.current.checkRadioButtonSelected()) {
        error = true;
        messageError += es_text.errors["no-radioButton-selected"] + "\n";
      } else {
        radioOption = radioButtonRef.current.getOptionSelected();
      }
    }

    {/*Se comprueba que se ha seleccionado un Arhivo valido .txt*/}

    if (fileSelectRef.current) {
      if (fileSelectRef.current.checkFile()) {
        error = true;
        messageError += es_text.errors["extension-error"];
      } else {
        fileSelected = fileSelectRef.current.getFileSelected();
      }
    }

    {/*Si hay un error se procedera a mostrar un alert con el mensaje de error*/}

    if (error) {
      modalError(messageError);
    } else {
      {/*Si todo funciona bien se analizara el archivo*/}
      analizar(fileSelected, radioOption);
    }
  }

  {/*Muestra un Alert con un error*/}
  function modalError(message: string) {
    alert(message);
  }

  {/*Analiza el Archivo y cambia de a la pestaña de Dashboard*/}
  async function analizar(file: File | null, radioOption: string) {

    {/*Crea un objeto Stats que leera el archivo y procesara los datos*/}
    const stats = new Stats(file, radioOption);
    await stats.analizar();

    {/*Recogemos los datos en JSON*/}
    const jsonData =stats.obtenerData();

    {/*Se cambia a la pestaña Dashboard*/}
    navigate("/dashboard", { state: jsonData });
    
  }

  return (
    <div className=" dark:bg-gray-800">
      <HeaderNavComponent></HeaderNavComponent>
    <div  id="inicio">
      <main className="flex flex-col items-center gap-2">
        {/*Titulo e Imagen principal*/}
        <div className="titulo">
          <img src="/img/whatsapp.svg" id="logo-whatsapp"></img>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">{es_text["main-title"]}  <span className="text-blue-600 dark:text-blue-500">{es_text["span-title"]}</span></h1>
        </div>

        <FileSelectComponent ref={fileSelectRef}></FileSelectComponent>

        <RadioButtonComponent ref={radioButtonRef}></RadioButtonComponent>

        {/*Boton Analizar*/}
        <div className="mt-2">
          <button
            type="button"
            onClick={checkElements}
            className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Analizar
          </button>
        </div>
      </main>
    </div>
    </div>
    
  );
};

export default Inicio;
