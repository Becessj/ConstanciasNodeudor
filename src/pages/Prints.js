import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { jsPDF } from "jspdf";
import { logo } from './images';


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const dateToday=()=>{
    // Creamos array con los meses del año
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    // Creamos array con los días de la semana
    const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    // Creamos el objeto fecha instanciándolo con la clase Date
    const fecha = new Date();
    return dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' del ' + fecha.getUTCFullYear();
}
const UrlConteos="http://10.0.0.215:5000/api/conteos";

export default function Prints() {
  const doc = new jsPDF('p', 'pt', 'a4', true);
  //const [usuario, setUsuario] = useState('');
  const [impresiones, setImpresiones] = useState(null);
  const [fecha, setFecha] = useState(null);
  // const [conta, setConta] = useState(cookies.get('CONTRIBUYENTE'));
  const classes = useStyles();
  const cookies = new Cookies();
  const conteos=async()=>{
    await axios.get(UrlConteos+`/${cookies.get('id')}`)
    .then(response=>{
      return response.data;
    }).then(response=>{
      var respuesta=response[0];
      setImpresiones(respuesta.TOTAL_IMPRESIONES)
      setFecha(dateToday) 
    })
}
const imprimirReporte = (persona, carpeta, nombrecompleto, predioU, obs, hasta, recibo, f_pago) => {  
  doc.addImage(logo, 'JPEG', 20, 5);
  doc.setFontSize(8);
  doc.setDrawColor(0, 0, 0);
  doc.text(100, 30, 'MUNICIPALIDAD DISTRITAL DE SANTIAGO')
  doc.text(100, 45, 'Dirección: AV. RUIZ NRO. S/N')
  doc.text(100, 60, 'RUC: 20154432516')
  doc.setFontSize(18);
  doc.setFont("Arial", "bold");
  doc.text(180, 230, 'REPORTE DE IMPRESIONES', { maxWidth: 1024, align: "justify" })
  doc.setFont("Arial", "normal");
  doc.setFontSize(12);
  doc.text('El usuario ' + cookies.get('NOMBRE') + ', registró un total de ' +impresiones+
    ' constancias de No Deudor hasta el '+ dateToday()+ ', esta información está siendo monitoreada por la Administración Tributaria de la MUNICIPALIDAD DISTRITAL DE SANTIAGO', 100, 250, { maxWidth: 400, align: 'justify' });
  doc.setLineWidth(1);
  doc.setDrawColor(255, 0, 0);
  //line()
  doc.setFontSize(8);

  doc.setFontSize(6);
  doc.line(28, 800, 570, 800);
  // Optional - set properties on the document
  doc.setProperties({
    title: 'REPORTE DE IMPRESIONES',
    subject: 'Esta es una copia legitima del documento extraido del sistema',
    author: 'Municipalidad Distrital de Santiago',
    keywords: 'reporte de constancia no deudor, constancia, santiago',
    creator: 'MDS2023'
  });

  doc.setFont("Arial", "bold");
  doc.text(150, 810, 'MUNICIPALIDAD DISTRITAL DE SANTIAGO ')
  doc.setFont("Arial", "normal");
  doc.text(150, 818, 'Dirección: AV. RUIZ NRO. S/N - SANTIAGO / CUSCO')
  doc.text(150, 826, 'Teléfono: (S/N')
  //var date = new Date();
  var filename = "REPORTE.pdf";
  doc.save(filename);
  window.open(doc.output('bloburl'), '_blank');
  window.location.reload(true);
}
  useEffect(() => {
    conteos()
  }, )
  return (
    <React.Fragment>
      <Title>Impresiones finalizadas</Title>
      <Typography component="p" variant="h4">
        {impresiones}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        hasta el {fecha}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={() => imprimirReporte()}>
          Ver Reporte
        </Link>
      </div>
    </React.Fragment>
  );
}