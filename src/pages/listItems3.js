import { React, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from 'universal-cookie';
import Swal from "sweetalert2";
import { Report } from '@material-ui/icons';

import buscar from './Cuenta.js';
import axios from 'axios';

const baseUrl = "http://10.0.0.215:5000/api/personas";
const UrlNotarias = "http://10.0.0.215:5000/api/notarias";
const UrlAuditorias = "http://10.0.0.215:5000/api/auditorias";


const cookies = new Cookies();
export const MainListItems = (props) => {
    const cookies = new Cookies();
    const [user1, setUser1] = useState(cookies.get('NOMBRE'));
    const [dni1, setDni1] = useState(cookies.get('CLAVE'));

    const [data, setData] = useState([]);
    var user = '';

    const [form, setForm] = useState({
        dni: dni1,//dni inicializada con el coockie guardado
        nombre: user1,//nombre inicializada con el coockie guardado
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(name);

    }
    const audit = (persona, carpeta, generador) => {
        axios.post(UrlAuditorias, {
            CONTRIBUYENTE: persona,
            PREDIO: carpeta,
            GENERADOR: generador,
            USUARIO: cookies.get('id')
        }
        )
    }

    const cerrarSesion = () => {
        console.log(cookies.get('id'));
        console.log(props)
        cookies.remove('id', { path: '/' });
        navigate("/login3")
        Swal.fire(
            'SESIÓN CERRADA',
            '',
            'error'
        );
    }
    const navigate = useNavigate();
    // const f2 = buscar(form.nombre, form.contribuyente)
    {/* const h2 = buscar(form.nombre, form.contribuyente) */ }

    {/* onChange={(e) => buscar(form.nombre, form.contribuyente)} */ }
    return (
        <div>
            <ListItem button onClick={() => { navigate("/dashboard3") }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Panel inicio" />
            </ListItem>

            <ListItem button onClick={() => { navigate("/consulta2") }}>

                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Consulta" />
            </ListItem>

            <ListItem button onClick={() => { navigate("/reportes2") }}>
                <ListItemIcon>
                    <Report />
                </ListItemIcon>
                <ListItemText primary="Reportes" />
            </ListItem>

            <ListItem button onClick={() => { navigate("/login3") }}>
                <ListItemIcon>
                    <ExitToAppIcon onClick={() => cerrarSesion()} />
                </ListItemIcon>
                <ListItemText primary="" />
            </ListItem>
        </div>
    );


}

export const secondaryListItems = (
    <><ListSubheader component="div" inset>
        Saved reports
    </ListSubheader><ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton><ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton><ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton></>
);


