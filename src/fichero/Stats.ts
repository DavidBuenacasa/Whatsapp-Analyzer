/* eslint-disable @typescript-eslint/no-unused-vars */

import RegistroIphone from "./registroIphone";
import dayjs, { Dayjs } from "dayjs";
import { Año, FechaHora, Persona, MensajesType, mesesMap } from "./types";

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

   eliminarCaracteresNoDeseados(texto: string): string {
    return texto.replace(/[\r\u200E]/g, '');
  }

  leerFichero() {
    const reader = new FileReader();
    reader.onload = (e) => {
      let text = e.target?.result as string;

      text=this.eliminarCaracteresNoDeseados(text);

      const lines = text.split(/\r?\n/).map(linea => linea.replace(/\r/g, ''));
      
      let errors = "";

      //Si es Iphone se Itera por este lado del bucle creando RegistrosIphone
      if (this.dispositivo == "iphone") {
        //Iteraciones sobre el fichero
        lines.forEach((line) => {
          //Se hace un try catch para evitar errores en mensajes que ocupan mas de una linea en el txt, como mensajes largos o enlaces
          try {
            const registroIphone = new RegistroIphone(line);
            const personaRegistro = registroIphone.getPersona();
            const mensajeRegistro = registroIphone.getMensaje();
            const fechaHoraRegistro = registroIphone.getFechaHora();

            //Si no encuentra a la persona devuelve false
            const añadirPersona = this.stats.some(
              (persona) => persona.nombre === personaRegistro,
            );

            //Si no se ha encontrado a la persona se añade al array
            if (!añadirPersona) {
              this.añadirPersona(personaRegistro);
            }

            //Se procede a clasificar el mensaje
            this.clasificarMensaje(
              personaRegistro,
              fechaHoraRegistro,
              mensajeRegistro,
            );
          } catch (err) {
            //Los errores se almacenan en una variable
            errors += line + "\n";
          }
        });

        console.log(this.stats);
      } else {
        //Si es Android se Itera por este lado del bucle creando RegistrosAndroid

        lines.forEach((line) => {});
      }
    };
    if (this.fichero) {
      reader.readAsText(this.fichero, 'utf-8');
    }
  }

  añadirPersona(personaNombre: string) {
    //Se crea un objeto persona con su nombre
    const personaObjeto: Persona = {
      nombre: personaNombre,
      mensajes: [] as Año[],
    };
    //Se añade al array
    this.stats.push(personaObjeto);
  }

  clasificarMensaje(
    persona: string,
    fechaHora: FechaHora,
    mensajeRegistro: string,
  ) {
    //Separamos las variables que nos interesan de fechaHora
    const mesAux=fechaHora.fecha.split("/")[1];

    const añoRegistro = fechaHora.fecha.split("/")[2];
    const mesRegistro=this.numeroAMes(Number(mesAux))
    const diaRegistro = fechaHora.fecha.split("/")[0];

    let mesData:MensajesType = this.crearMensajesType();

    //Recuperamos el Array de la persona que ha enviado el mensaje
    const dataPersona = this.recuperarDataPersona(persona);

    //Si en ese array se encuentra el año del mensaje devuelve true, si no se encuentra devuelve false
    const añoInicializado = dataPersona?.mensajes.some(
      (año) => año.año == añoRegistro,
    );

    //Si no se encuentra se añade un objeto año a esa persona
    if (!añoInicializado) {
      this.añadirMeses(persona, añoRegistro);
    }

    const dataAño = this.recuperarAño(persona, añoRegistro);
    if (dataAño) {
       mesData = dataAño[mesRegistro as keyof Año] as MensajesType;
    }

    const mensajeNormalizado = mensajeRegistro.trim().toLowerCase().valueOf();

    switch (mensajeNormalizado) {
      case "sticker omitido":
        mesData.stickers+=1;
        break;
      case "audio omitido":
        mesData.mensajesAudio+=1;
        break;
      case "Video omitido":
        mesData.videos+=1;
        break;
      case "imagen omitida":
        mesData.fotos+=1;
        break;
      case "gif omitido":
        mesData.gifs+=1;
        break;
      default:
        mesData.mensajesTexto+=1;
        break;
    }
  }

  crearMensajesType = (): MensajesType => ({
    mensajesTexto: 0,
    mensajesAudio: 0,
    fotos: 0,
    videos: 0,
    stickers: 0,
    gifs: 0,
    multimediaOmitido: 0,
  });

  añadirMeses(persona: string, año: string) {
    const añoData: Año = {
      año: año,
      enero: this.crearMensajesType(),
      febrero: this.crearMensajesType(),
      marzo: this.crearMensajesType(),
      abril: this.crearMensajesType(),
      mayo: this.crearMensajesType(),
      junio: this.crearMensajesType(),
      julio: this.crearMensajesType(),
      agosto: this.crearMensajesType(),
      septiembre: this.crearMensajesType(),
      octubre: this.crearMensajesType(),
      noviembre: this.crearMensajesType(),
      diciembre: this.crearMensajesType(),
    };

    const data = this.recuperarDataPersona(persona);
    data?.mensajes.push(añoData);
  }

  recuperarDataPersona(persona: string) {
    const data = this.stats.find(
      (personaData) => personaData.nombre == persona,
    );
    return data;
  }

  recuperarAño(persona: string, año: string) {
    const dataPersona = this.recuperarDataPersona(persona);

    const dataAño = dataPersona?.mensajes.find((añoData) => añoData.año == año);

    return dataAño;
  }

   numeroAMes(numero: number): string | undefined {
    return mesesMap[numero];}
}

export default Stats;
