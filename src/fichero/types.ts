export interface Persona {
    nombre: string;
    mensajes: Año[];
}

export interface Año{
  año:string,
  enero:MensajesType,
  febrero:MensajesType,
  marzo:MensajesType,
  abril:MensajesType,
  mayo:MensajesType,
  junio:MensajesType,
  julio:MensajesType,
  agosto:MensajesType,
  septiembre:MensajesType,
  octubre:MensajesType,
  noviembre:MensajesType,
  diciembre:MensajesType
}

export const mesesMap: { [key: number]: string } = {
  1: "enero",
  2: "febrero",
  3: "marzo",
  4: "abril",
  5: "mayo",
  6: "junio",
  7: "julio",
  8: "agosto",
  9: "septiembre",
  10: "octubre",
  11: "noviembre",
  12: "diciembre"
};

export interface MensajesType{
  mensajesTexto:0,
  mensajesAudio:0,
  fotos:0,
  videos:0,
  stickers:0,
  gifs:0,
  multimediaOmitido:0
}
  
export interface FechaHora {
    fecha: string;
    hora: string;
  }

