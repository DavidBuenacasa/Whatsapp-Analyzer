/* eslint-disable @typescript-eslint/no-unused-vars */

import RegistroIphone from "./registroIphone";
import dayjs, { Dayjs } from 'dayjs';
import { FechaHora, Persona } from "./types";



class Stats {
  fichero: File | null;
  dispositivo: string;

  stats: Persona[] = [];

  constructor(fichero: File | null, dispositivo: string) {
    this.fichero = fichero;
    this.dispositivo = dispositivo;

    this.analizar();
  }

  analizar() {
    this.leerFichero();
  }

  leerFichero() {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n");
      let errors = "";
      if (this.dispositivo == "iphone") {
        //Iteraciones sobre el fichero
        lines.forEach((line) => {
          try {
            const registroIphone = new RegistroIphone(line);
            const personaRegistro = registroIphone.getPersona();
            const mensajeRegistro = registroIphone.getMensaje();
            const fechaHoraRegistro = registroIphone.getFechaHora();

            //Si no encuentra a la persona devuelve false
            const añadirPersona = this.stats.some(
              (persona) => persona.nombre === personaRegistro,
            );

            if (!añadirPersona) {
              this.añadirPersona(personaRegistro);
            }

            this.clasificarMensaje(personaRegistro,fechaHoraRegistro);
            


          } catch (err) {
            errors += line + "\n";
          }
        });

        console.log(this.stats);
      } else {
        lines.forEach((line) => {});
      }
    };
    if (this.fichero) {
      reader.readAsText(this.fichero);
    }
  }

  añadirPersona(personaNombre: string) {
    const personaObjeto: Persona = {
      nombre: personaNombre,
      mensajes: [],
    };

    this.stats.push(personaObjeto);
  }

  clasificarMensaje(persona:string,fechaHora:FechaHora){

    const año = fechaHora.fecha.split("/")[2];
    const mes = fechaHora.fecha.split("/")[1];
    const dia = fechaHora.fecha.split("/")[0];

    console.log(año,mes,dia);
    
  }

  añadirMeses(persona:string,año:number){

  }

  añadirTipoMensaje(persona:string,año:number,mes:string){

  }


}

export default Stats;
