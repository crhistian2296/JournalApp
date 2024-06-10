import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouteLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth/thunks';
import AuthLayout from '../layout/AuthLayout';

const formData = {
  displayName: 'crhistian',
  email: 'user@gmail.com',
  password: '123456',
};

const formValidations = {
  email: [value => value?.includes('@'), 'The email must have @'],
  password: [
    value => value?.length >= 6,
    'The password must have more than 6 charactes',
  ],
  displayName: [value => value?.length >= 1, 'The name is needed'],
};

const Register = () => {
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage = null } = useSelector(state => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = e => {
    e.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;
    console.debug(formState);
    dispatch(startCreatingUserWithEmailAndPassword(formState));
  };

  return (
    <AuthLayout title='Register'>
      <form
        onSubmit={e => onSubmit(e)}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>
          <Grid item xs={12} mt={2}>
            <TextField
              label='displayName'
              type='displayName'
              name='displayName'
              fullWidth
              autoComplete='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              label='email'
              type='email'
              name='email'
              fullWidth
              autoComplete='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              label='password'
              type='password'
              name='password'
              fullWidth
              autoComplete='current-password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid
            item
            xs={12}
            sm={12}
            display={errorMessage !== null ? '' : 'none'}
          >
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant='contained'
              fullWidth
              type='submit'
              disabled={isAuthenticating}
            >
              Create account
            </Button>
          </Grid>
          <Grid container direction='row' justifyContent='end' pt={4}>
            <Typography mr={1}>Already have an account?</Typography>
            <Link component={RouteLink} color='inherit' to='/auth/login'>
              Log in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default Register;
