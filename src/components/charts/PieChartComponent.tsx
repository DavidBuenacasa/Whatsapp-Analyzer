import React from 'react';
import { Tooltip, Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { DataPieChart } from '../../fichero/types';

interface PieChartComponentByYear {
  data: DataPieChart[],
  tittle:string,
}

const PieChartComponent: React.FC<PieChartComponentByYear> = ({data,tittle}) => {
  return (
    <div>
        <h4 className="mb-3 text-center text-xl font-bold dark:text-white">{tittle}</h4>
        <BarChart data={data} width={500} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" name={tittle}/>
      </BarChart>
    </div>
  );
};

export default PieChartComponent;
2