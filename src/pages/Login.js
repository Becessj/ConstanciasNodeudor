import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';
import Swal from "sweetalert2";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://munisantiago.gob.pe/" target="_blank">
        Consulta Notaria - Municipalidad Distrital de Santiago
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const navigate = useNavigate();
  if (!null) {

  }
  const baseUrl = "http://192.168.1.5:5000/api/usuarios";
  const baseUrl2 = "http://192.168.1.5:5000/api/contribuyentes";
  const cookies = new Cookies();
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });

  }
  const forgetpassword = () => {
    Swal.fire(
      'POR FAVOR',
      'Comunicate con el administrador del sistema',
      'warning'
    );
  }
  const iniciarSesion = async () => {
    const firstPromise = await axios.get(baseUrl + `/${form.username}/${form.password}`);
    const secondPromise = await axios.get(baseUrl2 + `/${form.username}/${form.password}`);

    Promise.all([firstPromise, secondPromise])
    await axios.get(baseUrl + `/${form.username}/${form.password}`)

      //await axios.get(baseUrl2+`/${form.username}/${form.password}`)
      .then(response => {
        return response.data;
      }).then(response => {
        if (response.length > 0) {
          var respuesta = response[0];
          cookies.set('USUARIO', respuesta.USUARIO, { path: '/' });
          cookies.set('NOMBRE', respuesta.NOMBRE, { path: '/' });
          cookies.set('id', response[0].USUARIO, { path: '/' });
          Swal.fire(
            'Bienvenido!',
            respuesta.NOMBRE,
            'success'
          );
          console.log("entro")
          /*  setUser(respuesta.USUARIO)
            console.log(user) */
          navigate("/dashboard")
        } else {
          Swal.fire(
            'Ups!',
            'El usuario o la contraseña no son correctos',
            'error'
          ).then(response => {

            window.location.href = '';
          });
        }
      })
      .catch(error => {
        Swal.fire(
          'Ups!',
          'Debes ingresar usuario y contraseña',
          'error'
        );

      })
  }

  useEffect(() => {
    if (cookies.get('id')) {
      navigate("/dashboard")
    }
  }, []);
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className="containerPrincipal">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            CONSULTA CONSTANCIA
          </Typography>
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="username"
            label="USUARIO"
            name="username"
            autoComplete="username"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="CONTRASEÑA"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            onKeyPress={(ev) => {

              if (ev.key === 'Enter') {
                // Do code here
                iniciarSesion();
                ev.preventDefault();
              }
            }}
          />
          {/*  <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuerdame"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => iniciarSesion()}

          >
            Ingresar
          </Button>
          <br></br>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => forgetpassword()}>
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid>
          <Box mt={8}>
            <Copyright />
          </Box>

        </div>
      </div>

    </Container>
  );
}

export default Login;