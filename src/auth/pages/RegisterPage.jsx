import { Link as RouterLink } from 'react-router-dom';

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';


const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'], //value es el valor del campo de texto enviado en el formulario
  password: [ (value) => value.length >= 6, 'El password debe de tener mas de 6 caracteres'],//primer argumento es la funcion para evaluar el error del value
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio']//segundo argumento es el mensaje en caso de que sea false el primer argumento
};


export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state=> state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );
  

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid 
   } = useForm( formData, formValidations );

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    dispatch(startCreatingUserWithEmailPassword( formState ));
  }

  return (
        
        <AuthLayout title='Crear cuenta'>
                   
          <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2 }} > {/* xs pantallas pequeñas (tipo moviles) y md  md={ 6 } pantallas medianas */ }
                <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder="Tu nombre" 
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted}//doble negacion convierte el null a un valor booleano
                helperText={ displayNameValid }
                />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }} > {/* xs pantallas pequeñas (tipo moviles) y md  md={ 6 } pantallas medianas */ }
                <TextField 
                label="correo" 
                type="email" 
                placeholder="correo@gmail.com" 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
                />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2 }} >
                <TextField 
                label="contraseña" 
                type="password" 
                placeholder="contraseña" 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
                />
              </Grid>

              <Grid 
                item 
                xs={ 12 } 
                display={ !!errorMessage ? '' : 'none' }
                >
                  <Alert severity='error'>{errorMessage}</Alert>
                </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={ 12 } >
                  <Button 
                    type='submit'
                    variant='contained' 
                    fullWidth 
                    disabled={ isCheckingAuthentication }
                    >
                    Crear cuenta
                  </Button>

                </Grid>
              </Grid>

              <Grid container direction="row" justifyContent="end">
                <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                <Link component={ RouterLink } color="inherit" to="/auth/login">
                  Ingresar
                 </Link>
              
               
               </Grid>

            </Grid>


          </form>

        </AuthLayout>

          
          
  )
}
