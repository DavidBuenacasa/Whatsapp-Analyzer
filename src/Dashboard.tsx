/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from "react-router-dom";
import RechartsBarChart from "./components/charts/BarChartComponentByYear";
import BuscadorDatos from "./components/charts/buscadorDatos";
import SelectYear from "./components/elements/SelectYear";
import "./styles/dashboard.css";
import { useState } from "react";
import PieChartComponent from "./components/charts/PieChartComponent";
import TableComponent from "./components/charts/TableComponent";
import HeaderNavComponent from "./components/elements/headerNav";
import SelectPersona from "./components/elements/SelectPersona";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const data = location.state;
  const jsonObject = JSON.parse(data);

  const buscadorDatos = new BuscadorDatos();

  const yearList = buscadorDatos.añosList(jsonObject);
  const personasList = buscadorDatos.personasList(jsonObject);

  const [selectedYearBarchart, setSelectedYearBarChart] = useState(yearList[0]);
  const [selectedYearPieChart, setSelectedYearPieChart] = useState(yearList[0]); // Estado del año seleccionado
  const [selectedYearTable, setSelectedYearTable] = useState(yearList[0]); // Estado del año seleccionado
  const [selectedPersonaTable, setSelectedPersonaTable] = useState(
    personasList[0],
  ); // Estado del año seleccionado

  const handleYearChangeBarchart = (year: string) => {
    setSelectedYearBarChart(year);
  };

  const handleYearPieChart = (year: string) => {
    setSelectedYearPieChart(year);
  };

  const handleYearTable = (year: string) => {
    setSelectedYearTable(year);
  };
  const handlePersonaTable = (persona: string) => {
    setSelectedPersonaTable(persona);
  };

  return (
    <div className=" dark:bg-gray-800">
      <HeaderNavComponent></HeaderNavComponent>
      {/* Graficos*/}
      <main id="cuerpoGraficos ">
        {/* Graficos de todos los años*/}
        <div className="row1">
          <div className="grafico chart1">
            <h4 className="text-xl font-bold dark:text-white">Mensajes Por años</h4>
            <RechartsBarChart
              data={buscadorDatos.barChartByYear(jsonObject)}
            ></RechartsBarChart>
          </div>

          {/* Graficos de todos los meses de un año*/}
          <div className="grafico">
            <SelectYear
              years={yearList}
              onYearChange={handleYearChangeBarchart}
            ></SelectYear>
            <RechartsBarChart
              data={buscadorDatos.barChartByMonth(
                jsonObject,
                selectedYearBarchart,
              )}
            ></RechartsBarChart>
          </div>
        </div>

        <div className="grafico">
          <SelectYear
            years={yearList}
            onYearChange={handleYearPieChart}
          ></SelectYear>
          <div className="pieChart">
            <PieChartComponent
              tittle={personasList[0]}
              data={buscadorDatos.pieChartByYear(
                jsonObject,
                selectedYearPieChart,
                personasList[0],
              )}
            ></PieChartComponent>
            <PieChartComponent
              tittle={personasList[1]}
              data={buscadorDatos.pieChartByYear(
                jsonObject,
                selectedYearPieChart,
                personasList[1],
              )}
            ></PieChartComponent>
          </div>
        </div>
        <div className="grafico">
          <div className="selectTable">
            <SelectYear
              years={yearList}
              onYearChange={handleYearTable}
            ></SelectYear>
            <SelectPersona
              personas={personasList}
              onPersonaChange={handlePersonaTable}
            ></SelectPersona>
          </div>
          <div className="grafico tableComponent">
            <TableComponent
              data={buscadorDatos.tableChart(
                jsonObject,
                selectedYearTable,
                selectedPersonaTable,
              )}
            ></TableComponent>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
