/* import { makeStyles } from '@material-ui/core/styles'; */
import clsx from 'clsx';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Menu.css';
import MaterialTable from 'material-table';
import { Button } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { tableIcons } from "./IconProvider";
import { LocalPrintshop, RemoveRedEye } from '@material-ui/icons';
import { MTableToolbar } from 'material-table'
import "bootstrap/dist/css/bootstrap.min.css";
import { jsPDF } from "jspdf";
import { logo } from './images';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import Grid from "@material-ui/core/Grid";
import consulta from './Consulta'
//import Chip from "@material-ui/core/Chip";

import 'jspdf-autotable';
import Consulta from './Consulta';


const baseUrl = "http://localhost:5000/api/personas";
const UrlNotarias = "http://localhost:5000/api/notarias";
const UrlAuditorias = "http://localhost:5000/api/auditorias";
const drawerWidth = 5201;
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
export default function ConsultaNotario(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [generador, setgenerador] = useState("PREDIA");
  const [mensaje, setmensaje] = useState("");


  const [data, setData] = useState([]);
  var user = '';
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
      await axios.get(UrlNotarias + `/${form.contribuyente}/${form.dni}/${generador}/${'T'}`)
     // await axios.get(baseUrl + `/${form.dni}/${form.nombre}/${form.contribuyente}`)
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
              if(response.data[0]['OBS']== "EL CONTRIBUYENTE TIENE DEUDA PENDIENTE"){
                Swal.fire({
                  icon: 'error',
                  title: response.data[0]['OBS'],
                  html: '<div class="align-left"><b>PERSONA:</b> '+response.data[0]['PERSONA'] +'<br>'+
                                                '<b>NOMBRES:</b> '+response.data[0]['NOMBRE_COMPLETO'] +'<br>'+
                                                '<b>DNI:</b> '+response.data[0]['NRO_DOC'] +'<br>'+
                                                '<b>UBICACION:</b> '+response.data[0]['OBS_UBICACION'] +'<br>'+'</div>',
                  footer: '<a href="">Municipalidad Distrital de Santiago</a>'
                }).then((result) => {
                  window.location.reload(true);
                });
              }
              else{
                Swal.fire({
                  icon: 'success',
                  title: response.data[0]['OBS'],
                  html: '<div class="align-left"><b>PERSONA:</b> '+response.data[0]['PERSONA'] +'<br>'+
                                                '<b>NOMBRES:</b> '+response.data[0]['NOMBRE_COMPLETO'] +'<br>'+
                                                '<b>DNI:</b> '+response.data[0]['NRO_DOC'] +'<br>'+
                                                '<b>UBICACION:</b> '+response.data[0]['OBS_UBICACION'] +'<br>'+'</div>',
                  footer: '<a href="">Municipalidad Distrital de Santiago</a>'
                }).then((result) => {
                  window.location.reload(true);
                });
              }
             
            }
          })
          if (response.data.length > 0) {
            //setmensaje(response.data[0]['OBS']);
      
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



  const buscarNotarias = async (persona, nrodoc, generador, clave) => {
    const result = await axios.get(UrlNotarias + `/${persona}/${nrodoc}/${generador}/${clave}`)
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
  /*   useEffect(() => {
      if (!cookies.get('id')) {
  
        props.history.push('./');
      }
    }, []); */
  //Renderiza la subtabla de la tabla principal
  /*     useEffect(() => {
        
        buscarNotarias(persona,dni,generador,'%')
        
      }, [persona]) */
  // const classes = useStyles();

  return (


    <>
          <Grid item xs={12} md={4} lg={3}>
   
      <Paper className={fixedHeightPaper}>
          <Grid container justify="center">
            <div className="container-fluid cew-9">
              <div className="row">
                  <div class="container-fluid">
                  <label><b>GENERADOR :</b></label>
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

                        </select>
              

                  </div>

                 
              </div>
            </div>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
          <div className="row">
          <div className="col-4">
              <label><b>CODIGO PERSONA</b></label>
              <input
                type="text"
                className="form-control"
                name="contribuyente"
                placeholder="Digita el código de persona"
                onChange={handleChange}
                onKeyPress={(ev) => {

                  if (ev.key === 'Enter') {
                    // Do code here
                    buscar(form.dni, form.nombre, form.contribuyente);
                    ev.preventDefault();
                  }
                }} autoFocus/>

              </div>
              <div className="col-8 ">
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
                  /* autoFocus */ />

              </div>
        </div>
<br />
              <div className="col-12 col-sm-6 col-md-3">
              <Button color="primary" size="large" type="submit" variant="contained" onClick={() => buscar(form.dni, form.nombre, form.contribuyente)}>
                Consultar &nbsp; <FaSearch />
              </Button>
              </div>
          </Paper>
       </Grid>

    </>



  );
}