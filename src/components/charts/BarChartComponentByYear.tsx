import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DataStructureByYear } from "../../fichero/types";



interface BarChartComponentByYear {
  data: DataStructureByYear;
}

const BarChartComponentByYear: React.FC<BarChartComponentByYear> = ({ data }) => (
  <BarChart data={data.data} width={500} height={300}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name"/>
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="persona1" fill="#8884d8" name={data.dataKeys.persona1}/>
  <Bar dataKey="persona2" fill="#82ca9d" name={data.dataKeys.persona2}/>
</BarChart>
  
);

export default BarChartComponentByYear;

