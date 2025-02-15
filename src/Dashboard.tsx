/* eslint-disable @typescript-eslint/no-unused-vars */
import { DarkThemeToggle } from "flowbite-react";
import { useLocation } from "react-router-dom";
import ButtonHome from "./components/elements/buttonHome";
import RechartsBarChart from "./components/charts/BarChartComponentByYear";
import BuscadorDatos from "./components/charts/buscadorDatos";
import SelectYear from "./components/elements/SelectYear";
import "./styles/dashboard.css";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const data = location.state;

  const jsonObject = JSON.parse(data);

  const buscadorDatos = new BuscadorDatos();

  return (
    <div className=" dark:bg-gray-800">
      {/* Header superior con Toogle para el tema oscuro*/}
      <header>
        <ButtonHome></ButtonHome>
        <DarkThemeToggle />
      </header>
      <main id="cuerpoGraficos">
        <div className="grafico">
          <RechartsBarChart
            data={buscadorDatos.barChartByYear(jsonObject)}
          ></RechartsBarChart>
        </div>

        <div className="grafico">
          <SelectYear years={buscadorDatos.añosList(jsonObject)}></SelectYear>
          <RechartsBarChart
            data={buscadorDatos.barChartByYear(jsonObject)}
          ></RechartsBarChart>
        </div>
        <div className="grafico">
          <SelectYear years={buscadorDatos.añosList(jsonObject)}></SelectYear>
          <RechartsBarChart
            data={buscadorDatos.barChartByYear(jsonObject)}
          ></RechartsBarChart>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
