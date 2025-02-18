"use client";

import { Table } from "flowbite-react";
import es_text from "../../text/es.json";

export function TableComponent() {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
        {Object.values(es_text.tabla.columnas).map((columna) => (
            <Table.HeadCell key={columna} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {columna}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">

        {Object.values(es_text.tabla.filas).map((fila, index) => (
          
          <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {fila}
              
            </Table.Cell>
            {/* Añade celdas adicionales aquí si es necesario para otras columnas */}
          </Table.Row>
          
        ))}

        </Table.Body>
      </Table>
    </div>
  );
}
