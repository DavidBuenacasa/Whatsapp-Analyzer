
import { Table } from "flowbite-react";
import es_text from "../../text/es.json";
import { Meses } from "../../fichero/types";

interface TableComponentData {
  data: Meses;
}




const TableComponent: React.FC<TableComponentData> = ({ data}) => (
  <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head className="table-header-group">
        {Object.values(es_text.tabla.columnas).map((columna) => (
            <Table.HeadCell key={columna} className="table-cell whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {columna}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">

        {Object.values(es_text.tabla.filas).map((fila, index) => (
          
          <Table.Row key={index} className="table-row bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="table-cell whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {fila}
            </Table.Cell>

            <Table.Cell className="table-cell text-center">{JSON.stringify(data[fila.toLocaleLowerCase() as keyof Meses].mensajesTexto)}</Table.Cell>
            <Table.Cell className="table-cell text-center">{JSON.stringify(data[fila.toLocaleLowerCase() as keyof Meses].fotos)}</Table.Cell>
            <Table.Cell className="table-cell text-center">{JSON.stringify(data[fila.toLocaleLowerCase() as keyof Meses].videos)}</Table.Cell>
            <Table.Cell className="table-cell text-center">{JSON.stringify(data[fila.toLocaleLowerCase() as keyof Meses].mensajesAudio)}</Table.Cell>
            <Table.Cell className="table-cell text-center">{JSON.stringify(data[fila.toLocaleLowerCase() as keyof Meses].stickers)}</Table.Cell>
            <Table.Cell className="table-cell text-center">{JSON.stringify(data[fila.toLocaleLowerCase() as keyof Meses].gifs)}</Table.Cell>
            <Table.Cell className="table-cell text-center">{JSON.stringify(data[fila.toLocaleLowerCase() as keyof Meses].multimediaOmitido)}</Table.Cell>
            {/* Añade celdas adicionales aquí si es necesario para otras columnas */}
          </Table.Row>
          
        ))}

        </Table.Body>
      </Table>
    </div>
);

export default TableComponent;