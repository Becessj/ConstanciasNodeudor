import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from 'universal-cookie';
import Swal from "sweetalert2";  
import { Report } from '@material-ui/icons';


const cookies = new Cookies();
export const MainListItems =(props)=>{
  const cerrarSesion=()=>{
    console.log(cookies.get('id'));
    console.log(props)
    cookies.remove('id', {path: '/'});
    navigate("/")
    Swal.fire(
        'SESIÓN CERRADA',
        '',
        'error'
      );
  }
  const navigate=useNavigate();
  return (
    <div>
       <ListItem button onClick={()=>{navigate("/dashboard")}}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Panel Inicio" />
      </ListItem>
      <ListItem button onClick={()=>{navigate("/consultanotario")}}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Consulta" />
      </ListItem>
 
      <ListItem button onClick={()=>{navigate("/")}}>
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