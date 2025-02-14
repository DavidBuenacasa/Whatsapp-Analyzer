/* eslint-disable @typescript-eslint/no-unused-vars */

import RegistroIphone from "./registroIphone";
import { Año, FechaHora, Persona, MensajesType, mesesMap } from "./types";

class Stats {
  private fichero: File | null;
  private dispositivo: string;
  private stats: Persona[];
  private ficheroLeido;

  constructor(fichero: File | null, dispositivo: string) {
    this.fichero = fichero;
    this.dispositivo = dispositivo;
    this.stats = [];
    this.ficheroLeido=false;
  }

   async analizar() {
    //Se lee el fichero
    await this.leerFichero();
  }

  private leerFichero(): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.ficheroLeido = true;
        resolve();
      }

      reader.onload = (e) => {
        let text = e.target?.result as string;

        // Se eliminan caracteres no deseados como caracteres invisibles
        text = this.eliminarCaracteresNoDeseados(text);

        // Se separa el texto en líneas
        const lines = text
          .split(/\r?\n/)
          .map((linea) => linea.replace(/\r/g, ""));

        let errors = "";

        if (this.dispositivo == "iphone") {
          lines.forEach((line) => {
            try {
              const registroIphone = new RegistroIphone(line);
              const personaRegistro = registroIphone.getPersona();
              const mensajeRegistro = registroIphone.getMensaje();
              const fechaHoraRegistro = registroIphone.getFechaHora();

              const añadirPersona = this.stats.some(
                (persona) => persona.nombre === personaRegistro,
              );

              if (!añadirPersona) {
                this.añadirPersona(personaRegistro);
              }

              this.clasificarMensaje(
                personaRegistro,
                fechaHoraRegistro,
                mensajeRegistro,
              );
            } catch (err) {
              errors += line + "\n";
            }
          });
        } else {
          lines.forEach((line) => {
            // Lógica para Android aquí...
          });
        }
      };

      reader.onerror = (e) => {
        reject(e);
      };

      if (this.fichero) {
        reader.readAsText(this.fichero, "utf-8");
      } else {
        console.error('No se ha definido ningún archivo para leer.');
        reject(new Error('No se ha definido ningún archivo para leer.'));
      }
    });
  }
  //Se eliminan caracteres no Deseados como caracteres invisibles
  private eliminarCaracteresNoDeseados(texto: string): string {
    return texto.replace(/[\r\u200E]/g, "");
  }

  //Se añade una persona al Array de Stats
  private añadirPersona(personaNombre: string) {
    //Se crea un objeto persona con su nombre
    const personaObjeto: Persona = {
      nombre: personaNombre,
      mensajes: [] as Año[],
    };
    //Se añade al array
    this.stats.push(personaObjeto);
  }

  //Se clasifica el mensaje por tiempo y tipo de mensaje
  private clasificarMensaje(
    persona: string,
    fechaHora: FechaHora,
    mensajeRegistro: string,
  ) {
    //Separamos las variables que nos interesan de fechaHora
    const mesAux = fechaHora.fecha.split("/")[1];

    const añoRegistro = fechaHora.fecha.split("/")[2];
    const mesRegistro = this.numeroAMes(Number(mesAux));
    const diaRegistro = fechaHora.fecha.split("/")[0];

    let mesData: MensajesType = this.crearMensajesType();

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

    //Recuperamos el array del año de esa persona
    const dataAño = this.recuperarAño(persona, añoRegistro);
    if (dataAño) {
      mesData = dataAño[mesRegistro as keyof Año] as MensajesType;
    }

    //Normalizamos el mensaje para evitar espacios en blanco o mayusculas no deseadas
    const mensajeNormalizado = mensajeRegistro.trim().toLowerCase().valueOf();

    //Se identifica el tipo de mensaje y se suma 1 al array
    switch (mensajeNormalizado) {
      case "sticker omitido":
        mesData.stickers += 1;
        break;
      case "audio omitido":
        mesData.mensajesAudio += 1;
        break;
      case "Video omitido":
        mesData.videos += 1;
        break;
      case "imagen omitida":
        mesData.fotos += 1;
        break;
      case "gif omitido":
        mesData.gifs += 1;
        break;
      default:
        mesData.mensajesTexto += 1;
        break;
    }
  }

  //Crea una instancia de MensajeType en blanco
  private crearMensajesType = (): MensajesType => ({
    mensajesTexto: 0,
    mensajesAudio: 0,
    fotos: 0,
    videos: 0,
    stickers: 0,
    gifs: 0,
    multimediaOmitido: 0,
  });

  //Crea un objeto Año con los meses y dentro de ellos la estructura de MensajeType
  private añadirMeses(persona: string, año: string) {
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

  //Recupera el array de una persona
  private recuperarDataPersona(persona: string) {
    const data = this.stats.find(
      (personaData) => personaData.nombre == persona,
    );
    return data;
  }

  //Recupera el array año de una persona
  private recuperarAño(persona: string, año: string) {
    const dataPersona = this.recuperarDataPersona(persona);

    const dataAño = dataPersona?.mensajes.find((añoData) => añoData.año == año);

    return dataAño;
  }

  //Devuelve el nombre de un mes a partir de su numero de mes
  private numeroAMes(numero: number): string | undefined {
    return mesesMap[numero];
  }

  public obtenerData() {

    return JSON.stringify(this.stats);
  }
}

export default Stats;
