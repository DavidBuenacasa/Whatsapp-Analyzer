/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DarkThemeToggle } from "flowbite-react";
import es_text from "./text/es.json";
import FileSelectComponent, { FileSelectComponentHandle } from "./components/elements/FileSelectComponent";
import RadioButtonComponent, { RadioButtonComponentHandle } from "./components/elements/RadioButtonComponent";
import Stats from "./fichero/Stats"
import { useRef } from "react";


function App() {

  const radioButtonRef = useRef<RadioButtonComponentHandle>(null);
  const fileSelectRef = useRef<FileSelectComponentHandle>(null);
  
  
  {/*Al hacer click sobre analizar se comprobara que todos los parametros son correctos*/}
  function checkElements(){

    
    let error:boolean=false;
    let messageError:string=""
    let fileSelected: File | null = new File([], "filename");
    let radioOption:string="";


    if(radioButtonRef.current){
      if(radioButtonRef.current.checkRadioButtonSelected()){
        error=true;
        messageError+=es_text.errors["no-radioButton-selected"] + '\n';
      }else{
        radioOption=radioButtonRef.current.getOptionSelected();
      }
    }

    if(fileSelectRef.current){
      if(fileSelectRef.current.checkFile()){
        error=true;
        messageError+=es_text.errors["extension-error"];
      }else{
        fileSelected=fileSelectRef.current.getFileSelected();
      }
    }

    if(error){
      modalError(messageError);
    }else{
      analizar(fileSelected,radioOption)
    }

  }

  function modalError(message:string) {
    alert(message)
  }

  function analizar(file:File | null,radioOption:string){

    const stats = new Stats(file,radioOption);

  }

  return (
    <div className=" dark:bg-gray-800">
      {/* Header superior con Toogle para el tema oscuro*/}
      <header>
        <DarkThemeToggle />
      </header>
      <main className="flex min-h-screen flex-col items-center gap-2">
        {/*Titulo e Imagen principal*/}
        <div className="titulo">
          <img src="/img/whatsapp.svg" id="logo-whatsapp"></img>
          <h1>
            Whatsapp <br />
            <span>Analyzer</span>
          </h1>
        </div>

        <FileSelectComponent ref={fileSelectRef}></FileSelectComponent>

        <RadioButtonComponent ref={radioButtonRef}></RadioButtonComponent>

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
  );
}

export default App;
