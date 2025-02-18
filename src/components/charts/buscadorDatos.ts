/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  DataPieChart,
  DataStructureByYear,
  MensajesType,
  Meses,
  mesesMap,
  Registro,
} from "../../fichero/types";

class BuscadorDatos {
  private sumarMensajesDeMeses(mesesArray: Meses[]): number {
    return mesesArray.reduce((total, meses) => {
      return (
        total +
        Object.values(meses).reduce((mesTotal, mes) => {
          return (
            mesTotal +
            Object.values(mes).reduce(
              (tipoTotal: number, numMensajes) =>
                tipoTotal + (numMensajes as number),
              0,
            )
          );
        }, 0)
      );
    }, 0);
  }

  sumarMensajesType(mensajes: MensajesType) {
    let sumatorio = 0;

    sumatorio += mensajes.mensajesTexto;
    sumatorio += mensajes.mensajesAudio;
    sumatorio += mensajes.fotos;
    sumatorio += mensajes.videos;
    sumatorio += mensajes.stickers;
    sumatorio += mensajes.gifs;
    sumatorio += mensajes.multimediaOmitido;
    return sumatorio;
  }

  sumarMensajesPorTipo = (data: Meses): DataPieChart[] => {
    const sumatorio: MensajesType = {
      mensajesTexto: 0,
      mensajesAudio: 0,
      fotos: 0,
      videos: 0,
      stickers: 0,
      gifs: 0,
      multimediaOmitido: 0,
    };

    Object.values(data).forEach((mensajes) => {
      sumatorio.mensajesTexto += mensajes.mensajesTexto;
      sumatorio.mensajesAudio += mensajes.mensajesAudio;
      sumatorio.fotos += mensajes.fotos;
      sumatorio.videos += mensajes.videos;
      sumatorio.stickers += mensajes.stickers;
      sumatorio.gifs += mensajes.gifs;
      sumatorio.multimediaOmitido += mensajes.multimediaOmitido;
    });

    const resultado: { name: string; value: number }[] = [
      { name: "mensajesTexto", value: sumatorio.mensajesTexto },
      { name: "mensajesAudio", value: sumatorio.mensajesAudio },
      { name: "fotos", value: sumatorio.fotos },
      { name: "videos", value: sumatorio.videos },
      { name: "stickers", value: sumatorio.stickers },
      { name: "gifs", value: sumatorio.gifs },
      { name: "multimediaOmitido", value: sumatorio.multimediaOmitido },
    ];

    return resultado;
  };
  public añosList(jsonObject: Registro[]) {
    const years = Array.from(
      new Set(jsonObject.map((registro) => registro.año)),
    );
    return years;
  }

  //Busca los datos para el grafico de barras de mensajes por años
  public barChartByYear(jsonObject: Registro[]) {
    const dataByYear: DataStructureByYear = {
      dataKeys: { key: "", persona1: "", persona2: "" },
      data: [],
    };

    //Obtenemos la lista de años distintos
    const years = this.añosList(jsonObject);

    //Por cada año calculamos el numero total de mensajes
    years.forEach((año) => {
      const aux = jsonObject.filter((registro) => registro.año === año);

      aux.sort((a, b) => a.nombre.localeCompare(b.nombre));

      //Creamos la estructura de datos y la añadimos al array
      const dataChart = {
        keyData: año,
        name: año,
        persona1: this.sumarMensajesDeMeses(aux[0].mensajes),
        persona2: this.sumarMensajesDeMeses(aux[1].mensajes),
      };
      
      dataByYear.data.push(dataChart);

      //Obtenemos los nombres de las personas
      dataByYear.dataKeys = {
        key: "year",
        persona1: aux[0].nombre,
        persona2: aux[1].nombre,
      };
    });

    return dataByYear;
  }

  //Busca los datos para el grafico de barras de mensajes por meses
  public barChartByMonth(jsonObject: Registro[], año: string) {
    const dataByYear: DataStructureByYear = {
      dataKeys: { key: "", persona1: "", persona2: "" },
      data: [],
    };

    //Si no hay opcion seleccionada año sera igual a 0
    if (año != "0") {
      const aux = jsonObject.filter((registro) => registro.año === año);
      aux.sort((a, b) => a.nombre.localeCompare(b.nombre));

      //Por cada mes
      for (let mes = 1; mes <= 12; mes++) {
        const mesKey = mesesMap[mes as keyof typeof mesesMap];
        const mensajetypeByMes0 = aux[0].mensajes[0][mesKey] || "";
        const mensajetypeByMes1 = aux[1].mensajes[0][mesKey] || "";

        //Creamos la estructura de datos y la añadimos al array
        const dataChart = {
          keyData: "mes",
          name: mesesMap[mes],
          persona1: this.sumarMensajesType(mensajetypeByMes0),
          persona2: this.sumarMensajesType(mensajetypeByMes1),
        };
        dataByYear.data.push(dataChart);
      }

      //Obtenemos los nombres de las personas
      dataByYear.dataKeys = {
        key: "mes",
        persona1: aux[0].nombre,
        persona2: aux[1].nombre,
      };
    }

    return dataByYear;
  }

  public pieChartByYear(jsonObject: Registro[], año: string, persona: string) {

    let aux: Registro[];
    let sumatorio:DataPieChart[]=[];

    //Si no hay opcion seleccionada año sera igual a 0
    if(año!="0"){
      aux = jsonObject.filter(
        (registro) => registro.año === año && registro.nombre === persona,
      );
  
       sumatorio = this.sumarMensajesPorTipo(aux[0].mensajes[0]);
    }
    
    return sumatorio;
  }


  public tableChart(jsonObject:Registro[],año:string,persona:string){

    const aux = jsonObject.filter((registro) => registro.año === año && registro.nombre===persona);


    return aux[0].mensajes[0];
  }



  public personasList(jsonObject: Registro[]) {
    const personas = Array.from(
      new Set(jsonObject.map((registro) => registro.nombre)),
    );
    personas.sort();
    return personas;
  }
}
export default BuscadorDatos;
