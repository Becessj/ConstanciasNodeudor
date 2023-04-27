/* import { makeStyles } from '@material-ui/core/styles'; */
import clsx from 'clsx';
import React, { useState, useEffect  } from 'react';
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import '../css/Menu.css';
import MaterialTable from 'material-table';
import { Button } from "@material-ui/core";
import { tableIcons } from "./IconProvider";
import { LocalPrintshop, RemoveRedEye } from '@material-ui/icons';
import { MTableToolbar } from 'material-table'
import "bootstrap/dist/css/bootstrap.min.css";
import { Print } from '@material-ui/icons'
import { jsPDF } from "jspdf";
import { logo } from './images';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import Grid from "@material-ui/core/Grid";
//import Chip from "@material-ui/core/Chip";

import 'jspdf-autotable';


const baseUrl = "http://localhost:5000/api/personas";
const UrlNotarias = "http://localhost:5000/api/notarias";
const UrlAuditorias = "http://localhost:5000/api/auditorias";
const UrlRecibos = "http://localhost:5000/api/recibo";

/* function preventDefault(event) {
  event.preventDefault();
} */
const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
export default function Consulta(props) {

  var [obsrec, setobsrec] = useState("");
  const columns = [
    { title: 'PERSONA', field: 'PERSONA' },
    { title: 'NOMBRE COMPLETO', field: 'NOMBRE_COMPLETO', },
    { title: 'DIRECCION FISCAL', field: 'DIRECCION_FISCAL' },
    { title: 'TIPO DOCUMENTO', field: 'TIPO_DOC', export: false },
    { title: 'NRO DOCUMENTO', field: 'NRO_DOC' },
    { title: 'TIPO', field: 'TIPO', export: false },
    { title: 'PREDIAL', field: 'PREDIAL', hidden: "true" },
    { title: 'ALCABALA', field: 'ALCABALA', hidden: "true" },
    { title: 'VEHICULAR', field: 'VEHICULAR', hidden: "true" },
    { title: 'LIMPIEZA', field: 'LIMPIEZA', hidden: "true" }
  ];
  //const [contri, setContri] = useState("");
  const [generador, setgenerador] = useState("PREDIA");
  //const [texto, settexto] = useState("");
  //const [startId, setStartId] = useState(100000);
  // const [endId, setEndId] = useState(100015);
  //const [value, setValue] = useState('');
  /*  const handleSelect = (e) => {
     console.log(e);
     setValue(e)
     setgenerador(e)
     console.log(generador)
   } */
  const SIZE = "300x300";
  const baseURL = "FIRMADO-POR";
  const doc = new jsPDF('p', 'pt', 'a4', true, {
    encryption: {
      userPassword: "user",
      ownerPassword: "owner",
      userPermissions: ["print", "modify", "copy", "annot-forms"]
      // try changing the user permissions granted
    }
  });



  const [data, setData] = useState([]);
  var user = '';
  //const [personas, setPersonas] = useState([]);
  //const [nombrecompleto, setnombrecompleto] = useState("");
  //const [dni, setDni] = useState('');
  //const [generador, setGenerador] = useState('');
  //const [user, setUser] = useState("");
  //const classes = useStyles();
  const [prediou1, setPrediou1] = useState('');
  const [persona1, setPersona1] = useState('');
  const [Carpetapredial1, setCarpetapredial1] = useState('');
  const [Nombrecompleto1, setNombrecompleto1] = useState('');
  const [Obs1, setObs1] = useState('');
  const [hasta11, sethasta1] = useState('');
  const [Recibo11, setRecibo1] = useState('');
  const [Pago1, setPago1] = useState('');
  const [Obsubicacion1, setObsubicacion1] = useState('');
  const [Texto1, setTexto1] = useState('');
  const [form, setForm] = useState({
    dni: '%',
    nombre: '%',
    contribuyente: '%'
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    console.log(name);

  }
  /*  const handleSelect = (e) => {
     console.log(e);
   } */
  const cookies = new Cookies();

  const audit = (persona, carpeta, generador) => {
    axios.post(UrlAuditorias, {
      CONTRIBUYENTE: persona,
      PREDIO: carpeta,
      GENERADOR: generador,
      USUARIO: cookies.get('id')
    }
    )
  }
  const buscar = async (dni, nombre, contribuyente) => {
    if (dni === '%' && nombre === '%' && contribuyente === '%') {
      Swal.fire(
        'CAMPOS INCOMPLETOS',
        'Porfavor, completa algún campo',
        'warning'
      )
    }
    else {
      await axios.get(baseUrl + `/${form.dni}/${form.nombre}/${form.contribuyente}`)
        /*await axios.get(baseUrl)*/
        .then(response => {
          let timerInterval
          Swal.fire({
            title: 'Buscando...!',
            html: 'Esto tomará unos <b></b> milisegundos.',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {

            }
          })
          if (response.data.length > 0) {
            setData(response.data);
            console.log(response.data);
          }
          else {
            console.log(response.data);
            Swal.fire(
              'Error!',
              'Este contribuyente no tiene cuentas generadas',
              'error'
            ).then((result) => {
              window.location.reload(true);
            });;
          }
        }).catch(error => {
          //console.log(error);
          Swal.fire(
            'ERROR!',
            'Debes digitar por lo menos un campo',
            'error'
          );

        })
    }
  }

  const PanelTable = ({ listapersonas }) => {
    //console.log(generador);
    //buscarNotarias(persona.persona, nrodoc.nrodoc, generador,"%")
    //console.log(buscarNotarias(persona.persona, nrodoc.nrodoc, generador,"%"))
    const panelColumns = [
      { title: "PERSONA", field: "PERSONA" },
      { title: "CARPETA PREDIAL", field: "CARPETAPREDIAL" },
      { title: "NOMBRE COMPLETO", field: "NOMBRE_COMPLETO" },
      { title: "NRO DOC", field: "NRO_DOC" },
      { title: "PREDIO U", field: "PREDIO_U" },
      { title: "OBS", field: "OBS" },
      { title: "AREA T.", field: "AREA_TERRENO" },
      { title: "HASTA", field: "HASTA" },
      { title: "RECIBO", field: "RECIBO" },
      { title: "F_PAGO", field: "F_PAGO" },
      { title: "GENERADOR", field: "GENERADOR" },
      { title: "OBS_UBICACION", field: "OBS_UBICACION" },
      { title: "TEXTO", field: "TEXTO", hidden: "true" }];
    console.log(listapersonas)
    return (
      <MaterialTable
        localization={{
          body: {
            emptyDataSourceMessage: "No hay datos para mostrar"
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
        icons={tableIcons}
        columns={panelColumns}
        data={listapersonas}
        options={{
          exportButton: {
            csv: true,
            pdf: false,
          },
          sorting: true,
          showTitle: false,
          draggable: false,
          headerStyle: { backgroundColor: "#ffefde" },
          bodyStyle: {
            overflowX: "scroll"
          },
          maxBodyHeight: "30vh",
          pageSizeOptions: [5],
          tableLayout: "auto"
        }}
        actions={[
          {
            icon: () => <LocalPrintshop />,
            tooltip: 'Imprimir',
            onClick: (event, rowData) =>
              Swal.fire({
                title: '¿Estás seguro?',
                text: "Las impresiones son contabilizadas en la base de datos principal",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, imprimir'
              }).then((result) => {
                if (result.isConfirmed) {
                  verificarDeuda(rowData.PERSONA, rowData.CARPETAPREDIAL, rowData.NOMBRE_COMPLETO, rowData.PREDIO_U, rowData.OBS, rowData.HASTA, rowData.RECIBO, rowData.F_PAGO, generador, rowData.OBS_UBICACION, rowData.TEXTO)

                }
              })
          }
        ]}
        localization2={{
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
      />
    );
  };
  /* 
    const changeGenerator = (generator) => {
      var generador;
      switch (generator) {
        case "PREDIA":
          generador = 'IMPUESTO PREDIAL';
          break;
        case "ALCABA":
          generador = 'IMPUESTO DE ALCABALA';
          break;
        case "IMPVEH":
          generador = 'IMPUESTO VEHICULAR';
          break;
        case "LIMPPU":
          generador = 'IMPUESTO DE LIMPIEZA PÚBLICA';
          break;
        default:
          break;
      }
      return generador;
    } */

  const changeSN = (value) => {
    var valor;
    switch (value) {
      case "S":
        valor = 'SI TIENE';
        break;
      case "N":
        valor = 'NO TIENE';
        break;
      default:
        /* code */
        break;
    }
    return valor;
  }
  const timeToday = () => {
    var today = new Date();
    var hora = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return hora;
  }
  const dateToday = () => {
    /* var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today; */
    // Creamos array con los meses del año
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    // Creamos array con los días de la semana
    //const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    // Creamos el objeto fecha instanciándolo con la clase Date
    const fecha = new Date();
    return ' ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' del ' + fecha.getUTCFullYear();
  }
  const verificarDeuda = (persona, carpeta, nombrecompleto, predioU, obs, hasta, recibo, f_pago, generador, obs_ub, texto) => {

    if (obs === "EL CONTRIBUYENTE NO ADEUDA") {
      let timerInterval
      Swal.fire({
        title: 'Estamos generando la impresión',
        html: 'Esto tomará unos <b></b> milisegundos.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (generador === 'PREDIA' || generador === 'ALCABA') {
          imprimirPredialAlcaba(persona, nombrecompleto, predioU, obs, texto)
          audit(persona, predioU, generador, user)
        }
        else if (generador === 'IMPVEH') {
          imprimirVehicular(persona, carpeta, nombrecompleto, predioU, obs, hasta, recibo, f_pago, obs_ub, texto)
          audit(persona, predioU, generador, user)
        }
        else {
          imprimirLimpieza(persona, carpeta, nombrecompleto, predioU, obs, hasta, recibo, f_pago, obs_ub, texto)
          audit(persona, predioU, generador, user)
        }
      })
    }
    else {
      Swal.fire({
        title: "<b>NO PUEDES IMPRIMIR</b>",
        html: `<b>OBSERVACION: </b>` + obs + ` hasta el año ` + hasta,
        confirmButtonText: "Cancelar",
        icon: "error"
      })


    }

  }
  const getImageSrc = (persona, nombrecompleto, predioU, obs) => {
    const content = baseURL + "LA MUNICIPALIDAD DISTRITAL DE SANTIAGO" + "-" + persona + "-" + nombrecompleto + "-" + predioU + "-" + generador + "-" + obs;
    const URL = `https://chart.googleapis.com/chart?chs=${SIZE}&cht=qr&chl=${content}&choe=UTF-8`;
    return URL;
  };
  const changeRecibo = (rec) => {
    var rec2;
    switch (rec) {
      case "C":
        rec2 = 'CANCELADO';
        break;
      case "P":
        rec2 = 'PENDIENTE';
        break;
      default:
        break;
    }
    return rec2;
  }

  
  const imprimirPredialAlcabaTodos = (tt) => {
    buscarNotarias(persona1, '%', generador, 'T');
    const qrSize = 110;
    let imageData = new Image(300, 300);
    imageData.src = getImageSrc(form.contribuyente, persona1, prediou1, Obs1);
    doc.addImage(imageData, "PNG", 100, 410, qrSize, qrSize);
    doc.setFontSize(16);
    doc.addImage(logo, 'JPEG', 20, 5);
    doc.setFontSize(8);
    doc.setDrawColor(0, 0, 0);
    doc.text(100, 30, 'MUNICIPALIDAD DISTRITAL DE SANTIAGO')
    doc.text(100, 45, 'Dirección: AV. RUIZ NRO. S/N')
    doc.text(100, 60, 'RUC: 20154432516')
    //doc.setFont('courier');
    doc.setFontSize(18);
    doc.setFont("Arial", "bold");
    doc.text(180, 170, 'CONSTANCIA DE NO DEUDOR', { maxWidth: 1024, align: "justify" })
    //doc.text("This is example paragraph   1", 11,13,).setFontSize(8).setFont(undefined, 'bold');
    doc.setFont("Arial", "normal");
    //doc.text("This is example paragraph      2", 11,13,).setFontSize(8).setFont(undefined, 'normal');
    doc.setFontSize(12);
    //doc.internal.write(0, "Tw") // <- add this
    /* doc.text('Que, la administrada ' + nombrecompleto +texto+ obs_ub+', se encuentra inscrita como ' +
       'contribuyente en el registro predial que maneja la Administración Tributaria de la MUNICIPALIDAD DISTRITAL DE SANTIAGO con Carpeta N°' +
       carpeta + ' por el código del predio: ' + predioU + ' ubicado en el distrito de SANTIAGO, Provincia y Departamento del Cusco,' +
       ' habiendo cancelado el ' + changeGenerator(generador) + ' del Ejercicio Gravable ' + hasta +
       ' con recibo de pago N° ' + recibo + ' en fecha ' + changeDateTime(f_pago) + ' y haciendo constar que: NO ADEUDA el ' +
       changeGenerator(generador) + ' desde la fecha que es contribuyente hasta la actualidad.', 100, 250, { maxWidth: 400, align: 'justify' });
     //doc.text('Fecha:' + dateToday() + ' y Hora: ' + timeToday(), 325, 465, { maxWidth: 2300, align: 'justify' })*/
    doc.text(tt, 100, 250, { maxWidth: 400, align: 'justify' });
    //doc.text('Fecha:' + dateToday() + ' y Hora: ' + timeToday(), 325, 465, { maxWidth: 2300, align: 'justify' })
    doc.text('Cusco,' + dateToday(), 335, 465, { maxWidth: 2300, align: 'justify' })

    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    //line()
    doc.setFontSize(8);
    doc.text(142, 520, timeToday())
    doc.setFontSize(6);
    doc.line(28, 800, 570, 800);
    // Optional - set properties on the document
    doc.setProperties({
      title: 'CONSTANCIA DE NO DEUDOR',
      subject: 'Esta es una copia legitima del documento extraido del sistema',
      author: 'Municipalidad Distrital de Santiago',
      keywords: 'constancia no deudor, constancia, santiago',
      creator: 'MDS2023'
    });

    doc.setFont("Arial", "bold");
    doc.text(150, 810, 'MUNICIPALIDAD DISTRITAL DE SANTIAGO ')
    doc.setFont("Arial", "normal");
    doc.text(150, 818, 'Dirección: AV. RUIZ NRO. S/N - SANTIAGO / CUSCO')
    doc.text(150, 826, 'Teléfono: S/N')
    //var date = new Date();
    //var filename = "MPU-" + predioU + ".pdf";
    //doc.save(filename);
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
    window.location.reload(true);
  }
  const imprimirPredialAlcaba = (persona, nombrecompleto, predioU, obs, texto) => {

    const qrSize = 110;
    let imageData = new Image(300, 300);
    imageData.src = getImageSrc(persona, nombrecompleto, predioU, obs);
    doc.addImage(imageData, "PNG", 100, 410, qrSize, qrSize);
    doc.setFontSize(16);
    doc.addImage(logo, 'JPEG', 20, 5);
    doc.setFontSize(8);
    doc.setDrawColor(0, 0, 0);
    doc.text(100, 30, 'MUNICIPALIDAD DISTRITAL DE SANTIAGO')
    doc.text(100, 45, 'Dirección: AV. RUIZ NRO. S/N')
    doc.text(100, 60, 'RUC: 20154432516')
    //doc.setFont('courier');
    doc.setFontSize(18);
    doc.setFont("Arial", "bold");
    doc.text(180, 170, 'CONSTANCIA DE NO DEUDOR', { maxWidth: 1024, align: "justify" })
    //doc.text("This is example paragraph   1", 11,13,).setFontSize(8).setFont(undefined, 'bold');
    doc.setFont("Arial", "normal");
    //doc.text("This is example paragraph      2", 11,13,).setFontSize(8).setFont(undefined, 'normal');
    doc.setFontSize(12);
    //doc.internal.write(0, "Tw") // <- add this
    /* doc.text('Que, la administrada ' + nombrecompleto +texto+ obs_ub+', se encuentra inscrita como ' +
       'contribuyente en el registro predial que maneja la Administración Tributaria de la MUNICIPALIDAD DISTRITAL DE SANTIAGO con Carpeta N°' +
       carpeta + ' por el código del predio: ' + predioU + ' ubicado en el distrito de SANTIAGO, Provincia y Departamento del Cusco,' +
       ' habiendo cancelado el ' + changeGenerator(generador) + ' del Ejercicio Gravable ' + hasta +
       ' con recibo de pago N° ' + recibo + ' en fecha ' + changeDateTime(f_pago) + ' y haciendo constar que: NO ADEUDA el ' +
       changeGenerator(generador) + ' desde la fecha que es contribuyente hasta la actualidad.', 100, 250, { maxWidth: 400, align: 'justify' });
     //doc.text('Fecha:' + dateToday() + ' y Hora: ' + timeToday(), 325, 465, { maxWidth: 2300, align: 'justify' })*/
    doc.text(texto, 100, 250, { maxWidth: 400, align: 'justify' });
    //doc.text('Fecha:' + dateToday() + ' y Hora: ' + timeToday(), 325, 465, { maxWidth: 2300, align: 'justify' })
    doc.text('Cusco,' + dateToday(), 335, 465, { maxWidth: 2300, align: 'justify' })

    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    //line()
    doc.setFontSize(8);
    doc.text(142, 520, timeToday())
    doc.setFontSize(6);
    doc.line(28, 800, 570, 800);
    // Optional - set properties on the document
    doc.setProperties({
      title: 'CONSTANCIA DE NO DEUDOR',
      subject: 'Esta es una copia legitima del documento extraido del sistema',
      author: 'Municipalidad Distrital de santiago',
      keywords: 'constancia no deudor, constancia, santiago',
      creator: 'MDS2023'
    });

    doc.setFont("Arial", "bold");
    doc.text(150, 810, 'MUNICIPALIDAD DISTRITAL DE SANTIAGO ')
    doc.setFont("Arial", "normal");
    doc.text(150, 818, 'Dirección: AV. RUIZ CARO NRO. S/N - SANTIAGO / CUSCO')
    doc.text(150, 826, 'Teléfono: S/N')
    //var date = new Date();
    //var filename = "MPU-" + predioU + ".pdf";
    //doc.save(filename);
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
    window.location.reload(true);
  }
  const imprimirVehicular = (persona, nombrecompleto, predioU, obs, texto) => {

    const qrSize = 110;
    let imageData = new Image(300, 300);
    imageData.src = getImageSrc(persona, nombrecompleto, predioU, obs);
    doc.addImage(imageData, "PNG", 100, 410, qrSize, qrSize);
    doc.setFontSize(16);
    doc.addImage(logo, 'JPEG', 20, 5);
    doc.setFontSize(8);
    doc.setDrawColor(0, 0, 0);
    doc.text(100, 30, 'MUNICIPALIDAD DISTRITAL DE SANTIAGO')
    doc.text(100, 45, 'Dirección: AV. RUIZ CARO NRO. S/N')
    doc.text(100, 60, 'RUC: 20154432516')
    //doc.setFont('courier');
    doc.setFontSize(18);
    doc.setFont("Arial", "bold");
    doc.text(180, 170, 'CONSTANCIA DE NO DEUDOR', { maxWidth: 1024, align: "justify" })
    //doc.text("This is example paragraph   1", 11,13,).setFontSize(8).setFont(undefined, 'bold');
    doc.setFont("Arial", "normal");
    //doc.text("This is example paragraph      2", 11,13,).setFontSize(8).setFont(undefined, 'normal');
    doc.setFontSize(12);
    //doc.internal.write(0, "Tw") // <- add this
    /* doc.text('Que, la administrada ' + nombrecompleto +texto+ obs_ub+', se encuentra inscrita como ' +
       'contribuyente en el registro predial que maneja la Administración Tributaria de la MUNICIPALIDAD DISTRITAL DE SANTIAGO con Carpeta N°' +
       carpeta + ' por el código del predio: ' + predioU + ' ubicado en el distrito de SANTIAGO, Provincia y Departamento del Cusco,' +
       ' habiendo cancelado el ' + changeGenerator(generador) + ' del Ejercicio Gravable ' + hasta +
       ' con recibo de pago N° ' + recibo + ' en fecha ' + changeDateTime(f_pago) + ' y haciendo constar que: NO ADEUDA el ' +
       changeGenerator(generador) + ' desde la fecha que es contribuyente hasta la actualidad.', 100, 250, { maxWidth: 400, align: 'justify' });
     //doc.text('Fecha:' + dateToday() + ' y Hora: ' + timeToday(), 325, 465, { maxWidth: 2300, align: 'justify' })*/
    doc.text(texto, 100, 250, { maxWidth: 400, align: 'justify' });
    //doc.text('Fecha:' + dateToday() + ' y Hora: ' + timeToday(), 325, 465, { maxWidth: 2300, align: 'justify' })
    doc.text('Cusco,' + dateToday(), 335, 465, { maxWidth: 2300, align: 'justify' })

    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    //line()
    doc.setFontSize(8);
    doc.text(142, 520, timeToday())
    doc.setFontSize(6);
    doc.line(28, 800, 570, 800);
    // Optional - set properties on the document
    doc.setProperties({
      title: 'CONSTANCIA DE NO DEUDOR',
      subject: 'Esta es una copia legitima del documento extraido del sistema',
      author: 'Municipalidad Distrital de Santiago',
      keywords: 'constancia no deudor, constancia, santiago',
      creator: 'MDS2023'
    });

    doc.setFont("Arial", "bold");
    doc.text(150, 810, 'MUNICIPALIDAD DISTRITAL DE SANTIAGO ')
    doc.setFont("Arial", "normal");
    doc.text(150, 818, 'Dirección: AV. RUIZ CARO NRO. S/N - SANTIAGO / CUSCO')
    doc.text(150, 826, 'Teléfono: S/N')
    //var date = new Date();
    //var filename = "MPU-" + predioU + ".pdf";
    //doc.save(filename);
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
    window.location.reload(true);
  }
  const imprimirLimpieza = (persona, carpeta, nombrecompleto, predioU, obs, hasta, recibo, f_pago, obs_ub, texto) => {

    const qrSize = 110;
    let imageData = new Image(300, 300);
    imageData.src = getImageSrc(persona, nombrecompleto, predioU, obs);
    doc.addImage(imageData, "PNG", 100, 410, qrSize, qrSize);
    doc.setFontSize(16);
    doc.addImage(logo, 'JPEG', 20, 5);
    doc.setFontSize(8);
    doc.setDrawColor(0, 0, 0);
    doc.text(100, 30, 'MUNICIPALIDAD DISTRITAL DE SANTIAGO')
    doc.text(100, 45, 'Dirección: AV. RUIZ CARO NRO. S/N')
    doc.text(100, 60, 'RUC: 20154432516')
    //doc.setFont('courier');
    doc.setFontSize(18);
    doc.setFont("Arial", "bold");
    doc.text(180, 170, 'CONSTANCIA DE NO DEUDOR', { maxWidth: 1024, align: "justify" })
    //doc.text("This is example paragraph   1", 11,13,).setFontSize(8).setFont(undefined, 'bold');
    doc.setFont("Arial", "normal");
    //doc.text("This is example paragraph      2", 11,13,).setFontSize(8).setFont(undefined, 'normal');
    doc.setFontSize(12);
    //doc.internal.write(0, "Tw") // <- add this
    /* doc.text('Que, la administrada ' + nombrecompleto +texto+ obs_ub+', se encuentra inscrita como ' +
       'contribuyente en el registro predial que maneja la Administración Tributaria de la MUNICIPALIDAD DISTRITAL DE SANTIAGO con Carpeta N°' +
       carpeta + ' por el código del predio: ' + predioU + ' ubicado en el distrito de SANTIAGO, Provincia y Departamento del Cusco,' +
       ' habiendo cancelado el ' + changeGenerator(generador) + ' del Ejercicio Gravable ' + hasta +
       ' con recibo de pago N° ' + recibo + ' en fecha ' + changeDateTime(f_pago) + ' y haciendo constar que: NO ADEUDA el ' +
       changeGenerator(generador) + ' desde la fecha que es contribuyente hasta la actualidad.', 100, 250, { maxWidth: 400, align: 'justify' });
     //doc.text('Fecha:' + dateToday() + ' y Hora: ' + timeToday(), 325, 465, { maxWidth: 2300, align: 'justify' })*/
    doc.text(texto, 100, 250, { maxWidth: 400, align: 'justify' });
    //doc.text('Fecha:' + dateToday() + ' y Hora: ' + timeToday(), 325, 465, { maxWidth: 2300, align: 'justify' })
    doc.text('Cusco,' + dateToday(), 335, 465, { maxWidth: 2300, align: 'justify' })

    doc.setLineWidth(1);
    doc.setDrawColor(255, 0, 0);
    //line()
    doc.setFontSize(8);
    doc.text(142, 520, timeToday())
    doc.setFontSize(6);
    doc.line(28, 800, 570, 800);
    // Optional - set properties on the document
    doc.setProperties({
      title: 'CONSTANCIA DE NO DEUDOR',
      subject: 'Esta es una copia legitima del documento extraido del sistema',
      author: 'Municipalidad Distrital de Santiago',
      keywords: 'constancia no deudor, constancia, santiago',
      creator: 'MDS2023'
    });

    doc.setFont("Arial", "bold");
    doc.text(150, 810, 'MUNICIPALIDAD DISTRITAL DE SANTIAGO ')
    doc.setFont("Arial", "normal");
    doc.text(150, 818, 'Dirección: RUIZ CARO NRO. S/N - SANTIAGO / CUSCO')
    doc.text(150, 826, 'Teléfono: S/N')
    //var date = new Date();
    //var filename = "MPU-" + predioU + ".pdf";
    //doc.save(filename);
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
    window.location.reload(true);
  }
  const buscarNotarias = async (persona, nrodoc, generador, clave) => {
    const result = await axios.get(UrlNotarias + `/${persona}/${'%'}/${generador}/${clave}`)
    /* console.log(result)
    console.log(generador) */
    var y = new Date().getFullYear();

    const newdata = data.map((item) => {
      if (item.NRO_DOC === nrodoc) {
        return { ...item, notarias: result.data }
      }

      return item
    })
    if (result.data <= 0) {
      Swal.fire(
        'ESPERA',
        'El contribuyente no tiene deuda generada, ni pagos realizados en el año ' + y,
        'error'
      ).then((result) => {
        window.location.reload(true);
      });
    }
    setData(newdata)
    console.log(result.data)
  }
  function recibos(contribuyente, generador, dato) {
    console.log(contribuyente + '  ' + generador + '  ' + dato)
    axios.get(UrlRecibos + '/' + contribuyente + '/' + generador + '/' + dato)
      .then(response => {
        //this.response = response.data
        console.log("estado = "+response.data[0]['ESTADO'])
        obsrec= response.data[0]['ESTADO'];
        setobsrec(obsrec)
   
        //setobsrec(obsrec);
        //obsrecibo = response.data[0].ESTADO
      })
     




  }
  const buscarNotariasforPrint = async () => {
    const resulta = await axios.get(UrlNotarias + `/${form.contribuyente}/${form.dni}/${generador}/${'T'}`)
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Las impresiones son contabilizadas en la base de datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, imprimir'
    }).then((result) => {
      if (result.isConfirmed) {
        audit(form.contribuyente, '%', generador, user)
        imprimirPredialAlcabaTodos(resulta.data[0]['TEXTO'])
      }
    })
    
    // audit(cont1, '%', generador, user)
    //       imprimirPredialAlcabaTodos(result.data[0]['TEXTO'])
    //       console.log(Texto1)
    //Swal.fire("no puedes xd")




  }
/*   useEffect(() => {
    recibos(form.contribuyente, generador, '%')

  }, []); */

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (


    <>
      <Paper className={fixedHeightPaper}>
        <Grid container justify="center">
          <div class="container-fluid">
            <h5><b>Selecciona el generador : </b>
              <select
                //style={{width: '300px'}}
                id="fruits"
                onChange={(e) => setgenerador(e.target.value)}
                aria-label="Default select example"
                class="form-control form-control-sm">

                <option value="PREDIA" selected>PREDIAL</option>
                <option value="ALCABA">ALCABALA</option>
                <option value="LIMPPU">LIMPIEZA</option>
                <option value="IMPVEH">VEHICULAR</option>

              </select> </h5>

          </div>
          <br></br> <br></br> <br></br>
          <div className="container-fluid cew-9">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3">
                <label><b>DNI/RUC</b></label>
                <input
                  type="number"
                  required
                  className="form-control"
                  maxLength="11"
                  name="dni"
                  placeholder="Digita el DNI"
                  onChange={handleChange}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      // Do code here
                      buscar(form.dni, form.nombre, form.contribuyente);
                      ev.preventDefault();
                    }
                  }}
                  autoFocus />
                <br />
              </div>
              <div className="col-12 col-sm-6 col-md-6">

                <label><b>APELLIDOS Y NOMBRES</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Digita los apellidos"
                  onChange={handleChange}
                  onKeyPress={(ev) => {

                    if (ev.key === 'Enter') {
                      // Do code here
                      buscar(form.dni, form.nombre, form.contribuyente);
                      ev.preventDefault();
                    }
                  }} />
                <br />
              </div>
              <div className="col-12 col-sm-12 col-md-3">

                <label><b>CODIGO PRED.</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="contribuyente"
                  placeholder="Digita el código predial"
                  onChange={handleChange}
                  onKeyPress={(ev) => {

                    if (ev.key === 'Enter') {
                      // Do code here
                      buscar(form.dni, form.nombre, form.contribuyente);
                      ev.preventDefault();
                    }
                  }} />
                <br />
              </div>
            </div>
          </div>
          <Button color="primary" size="large" type="submit" variant="contained" onClick={() => buscar(form.dni, form.nombre, form.contribuyente)}
          >
            Consultar &nbsp; <FaSearch />
          </Button>

        </Grid>
      </Paper>





      <div class="container-fluid">
        <br></br>
        <MaterialTable

          components={{

            Toolbar: props => (
              <div style={{ backgroundColor: '' }}>
                <MTableToolbar {...props} />
                <Button color="primary" size="large" type="submit" variant="contained" onClick={() => buscarNotariasforPrint()}>
                  Imprimir constancia con todos los items &nbsp; <Print />
                </Button>
                {/* <div style={{padding: '0px 10px'}}>
              <Chip label="PREDIA" color="secondary" style={{marginRight: 5}}/>
              <Chip label="ALCABA" color="secondary" style={{marginRight: 5}}/>
              <Chip label="LIMPPU" color="secondary" style={{marginRight: 5}}/>
              <Chip label="IMPVEH" color="secondary" style={{marginRight: 5}}/>
    
            </div> */}
              </div>

            )
          }}

          icons={tableIcons}
          columns={columns}
          data={data}
          title={'Selecciona la persona'}

          actions={[

            {
              icon: () => <RemoveRedEye />,
              tooltip: 'Ver detalles',
              onClick: (event, rowData) => Swal.fire({
                title: "<i>Información de la Persona</i>",
                html: `<table id="table" border=1>
                                                 
                                                  <tbody>
                                                 
                                                      <tr>
                                                          
                                                          <td><b>CÓD. PERSONA </b></td>
                                                          <td>` + rowData.PERSONA + `</td>
                                                      </tr>
                                                      <tr>
                                                          <td><b>NRO DOCUMENTO</b></td>
                                                          <td>` + rowData.NRO_DOC + `</td>
                                                      </tr>
                                                      <tr>
                                                          
                                                          <td><b>NOMBRE COMPLETO</b></td>
                                                          <td>` + rowData.NOMBRE_COMPLETO + `</td>
                                                      </tr>
                                                      <tr>
                                                         
                                                          <td><b>DIRECCIÓN FISCAL</b></td>
                                                          <td>` + rowData.DIRECCION_FISCAL + `</td>
                                                      </tr>
                                                     
                                                      <tr>
                                                          <td><b>REGISTRO PREDIAL</b></td>
                                                          <td>` + changeSN(rowData.PREDIAL) + `</td>
                                                      </tr>
                                                      <tr>
                                                          <td><b>REGISTRO ALCABALA</b></td>
                                                          <td>` + changeSN(rowData.ALCABALA) + `</td>
                                                      </tr>
                                                      <tr>
                                                          <td><b>REGISTRO VEHICULAR</b></td>
                                                          <td>` + changeSN(rowData.VEHICULAR) + `</td>
                                                      </tr>
                                                      <tr>
                                                          <td><b>REGISTRO LIMPIEZA PÚBLICA</b></td>
                                                          <td>` + changeSN(rowData.LIMPIEZA) + `</td>
                                                      </tr>
                                          </tbody>
                                          </table>`,
                confirmButtonText: "Cancelar",
              })
            },

          ]}
          options={{
            exportButton: {
              csv: true,
              pdf: false,
            },
            sorting: true,
            exportButton: true,
            //searchAutoFocus: true,
            //minBodyHeight: "85vh",
            // maxBodyHeight: "85vh",
            //selection: true,
            //Quitar si no se requiere hacer el filtro por columna
            //filtering: true,
            draggable: false,
            headerStyle: { backgroundColor: "#ffefde" },
            bodyStyle: {
              overflowX: "scroll"
            },


            tableLayout: "auto"
          }}

          detailPanel={[
            {

              tooltip: "Ver Detalles",
              render: (rowData) => {
                // buscarNotarias(rowData.PERSONA, rowData.NRO_DOC, generador, '%');
                return <PanelTable listapersonas={rowData.notarias} />;
              }
            }
          ]}
          onRowClick={(event, rowData, togglePanel) => {
            //console.log("LOGING -------------> ROWDATA", rowData);
            //setDni(rowData.NRO_DOC)
            //console.log(dni)
            //setPersona(rowData.PERSONA)
            //console.log(persona)
            //setGenerador(generador)
            recibos(form.contribuyente, generador, '%')
            buscarNotarias(rowData.PERSONA, rowData.NRO_DOC, generador, '%');
            togglePanel();
          }}

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
          }} /></div></>



  );
}