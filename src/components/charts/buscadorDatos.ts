/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { data } from "react-router-dom";
import { DataStructureByYear, Meses, Registro } from "../../fichero/types";

class BuscadorDatos {
 sumarMensajesDeMeses(mesesArray: Meses[]): number {
        return mesesArray.reduce((total, meses) => {
          return total + Object.values(meses).reduce((mesTotal, mes) => {
            return mesTotal + Object.values(mes).reduce((tipoTotal: number, numMensajes) => tipoTotal + (numMensajes as number), 0);
          }, 0);
        }, 0);
      }


  public añosList(jsonObject: Registro[]){
    const years = Array.from(new Set(jsonObject.map((registro) => registro.año)),);
    return years;
  }    

  public barChartByYear(jsonObject: Registro[]) {
    const dataByYear: DataStructureByYear = { dataKeys: { key: '',persona1: '', persona2: '' }, data: [] };

    const years = this.añosList(jsonObject);

    years.forEach((año) => {
    const aux = jsonObject.filter(registro => registro.año ===año)

     aux.sort((a,b) => a.nombre.localeCompare(b.nombre));

      const dataChart = {
        year: año,
        persona1: this.sumarMensajesDeMeses(aux[0].mensajes),
        persona2: this.sumarMensajesDeMeses(aux[1].mensajes),
      };
      dataByYear.data.push(dataChart);

      dataByYear.dataKeys={
        key:"year",
        persona1:aux[0].nombre,
        persona2:aux[1].nombre
      }

    });

    console.log(dataByYear);

    return dataByYear;
  }

  public barChartByMonth(año:string){





    

  }







}
export default BuscadorDatos;
