/* eslint-disable @typescript-eslint/no-unused-vars */

import RegistroIphone from "./registroIphone";
import {
  FechaHora,
  MensajesType,
  mesesMap,
  Registro,
  Meses,
} from "./types";

class Stats {
  private fichero: File | null;
  private dispositivo: string;
  private stats: Registro[];
  private ficheroLeido;

  constructor(fichero: File | null, dispositivo: string) {
    this.fichero = fichero;
    this.dispositivo = dispositivo;
    this.stats = [];
    this.ficheroLeido = false;
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
      };

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
              const año = fechaHoraRegistro.fecha.split("/")[2];

              const añadirPersona = this.stats.some(
                (persona) =>
                  persona.nombre === personaRegistro && persona.año === año,
              );

              if (!añadirPersona) {
                this.añadirPersona(personaRegistro, año);
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
        console.error("No se ha definido ningún archivo para leer.");
        reject(new Error("No se ha definido ningún archivo para leer."));
      }
    });
  }
  //Se eliminan caracteres no Deseados como caracteres invisibles
  private eliminarCaracteresNoDeseados(texto: string): string {
    return texto.replace(/[\r\u200E]/g, "");
  }

  //Se añade una persona al Array de Stats
  private añadirPersona(personaNombre: string, año: string) {
    //Se crea un objeto persona con su nombre
    const personaObjeto: Registro = {
      nombre: personaNombre,
      año: año,
      mensajes: [this.añadirMeses()],
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

    const aux = this.stats.find(
      (registro) => registro.año === añoRegistro && registro.nombre === persona,
    );

    aux?.mensajes.map((año) => {
      let mensajesData;

      if (mesRegistro) {
        mensajesData = año[mesRegistro as keyof Meses];

        //Normalizamos el mensaje para evitar espacios en blanco o mayusculas no deseadas
        const mensajeNormalizado = mensajeRegistro
          .trim()
          .toLowerCase()
          .valueOf();

        //Se identifica el tipo de mensaje y se suma 1 al array
        switch (mensajeNormalizado) {
          case "sticker omitido":
            mensajesData.stickers += 1;
            break;
          case "audio omitido":
            mensajesData.mensajesAudio += 1;
            break;
          case "Video omitido":
            mensajesData.videos += 1;
            break;
          case "imagen omitida":
            mensajesData.fotos += 1;
            break;
          case "gif omitido":
            mensajesData.gifs += 1;
            break;
          default:
            mensajesData.mensajesTexto += 1;
            break;
        }
      }
    });
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
  private añadirMeses() {
    const añoData: Meses = {
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
    return añoData;
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
