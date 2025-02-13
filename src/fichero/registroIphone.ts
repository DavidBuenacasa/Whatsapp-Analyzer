import { FechaHora } from "./types";


class RegistroIphone {


  linea:string="";
  constructor(linea:string) {
    this.linea=linea;
  }

  getPersona() {
    const splitLinea = this.linea.split(" ")[2];

    const persona = splitLinea.slice(0, -1);

    return persona;
  }

  getMensaje() {
    const splitLinea = this.linea.split(":")[3];

    const mensaje = splitLinea.trimStart();

    return mensaje;
  }

  getFechaHora() {
    const regex = /\[(\d{1,2}\/\d{1,2}\/\d{2,4}), (\d{1,2}:\d{2}:\d{2})\]/;
    const coincidencia = this.linea.match(regex);
    const fechaHora: FechaHora = { fecha: "", hora: "" };
    if (coincidencia) {
      fechaHora.fecha=coincidencia[1];
      fechaHora.hora=coincidencia[2];
    }
    return fechaHora;
  }
}

export default RegistroIphone;