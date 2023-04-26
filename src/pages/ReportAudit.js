/* import { makeStyles } from '@material-ui/core/styles'; */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Menu.css';
import MaterialTable from 'material-table';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { tableIcons } from "./IconProvider";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default function ReportAudit() {
    const [user, setUser] = useState(cookies.get('id'));
    const [data, setData] = useState([]);


const baseUrl = "http://192.168.1.5:5000/api/reporte";

useEffect(() => {
  reportAudit();
}, []);


const reportAudit = async () => {
    await axios.get(baseUrl+ `/${user}`)
    .then(response => {
      if (response.data.length > 0) {
        setData(response.data);
       // console.log(response.data);
      }
    
    })
  }
  
    return (
      <div class="container-fluid">
      <MaterialTable
        localization={{
            body: {
              emptyDataSourceMessage: 'No hay datos por mostrar',
              addTooltip: 'Añadir',
              deleteTooltip: 'Eliminar',
              editTooltip: 'Editar',
              filterRow: {
                filterTooltip: 'Filtrar',
              },
              editRow: {
                deleteText: '¿Segura(o) que quiere eliminar?',
                cancelTooltip: 'Cancelar',
                saveTooltip: 'Guardar',
              },
            },
            grouping: {
              placeholder: "Arrastre un encabezado aquí para agrupar",
              groupedBy: 'Agrupado por',
            },
            header: {
              actions: 'Acciones',
            },
            pagination: {
              firstAriaLabel: 'Primera página',
              firstTooltip: 'Primera página',
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsPerPage: 'Filas por página:',
              labelRowsSelect: 'filas',
              lastAriaLabel: 'Ultima página',
              lastTooltip: 'Ultima página',
              nextAriaLabel: 'Pagina siguiente',
              nextTooltip: 'Pagina siguiente',
              previousAriaLabel: 'Pagina anterior',
              previousTooltip: 'Pagina anterior',
            },
            toolbar: {
              exportCSVName: "Exportar como CSV",
            exportPDFName: "Exportar como PDF",
              addRemoveColumns: 'Agregar o eliminar columnas',
              exportAriaLabel: 'Exportar',
              exportName: 'Exportar a CSV',
              exportTitle: 'Exportar',
              nRowsSelected: '{0} filas seleccionadas',
              searchPlaceholder: 'Buscar',
              searchTooltip: 'Buscar',
              showColumnsAriaLabel: 'Mostrar columnas',
              showColumnsTitle: 'Mostrar columnas',
            }
          }}
        title="Últimas impresiones"
        columns={[
          { title: 'CONTRIBUYENTE', field: 'CONTRIBUYENTE' },
          { title: 'PREDIO', field: 'PREDIO' },
          { title: 'GENERADOR', field: 'GENERADOR'},
          { title: 'USUARIO', field: 'USUARIO', hidden:'true'},
          { title: 'TIPO', field: 'TIPO'},
          { title: 'F_IMPRESIÓN', field: 'F_INGRESO' },
        ]}
        options={{
            headerStyle: { backgroundColor: "#F7FADF" }
            
            }}
        icons={tableIcons}
        data={data}
      />
      </div>
    )
  }
  