import { Google } from '@mui/icons-material';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouteLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import {
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
} from '../../store/auth';
import AuthLayout from '../layout/AuthLayout';

const formData = {
  email: 'user@gmail.com',
  password: '123456',
};

const Login = () => {
  const { email, password, onInputChange } = useForm(formData);

  const { status, errorMessage = null } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = event => {
    event.preventDefault();
    if (!email || !password) return console.warn('Incomplete credentials');

    console.debug('Credentials', { email, password });
    return dispatch(startLoginWithEmailAndPassword({ email, password }));
  };

  const onGoogleSignIn = async () => {
    console.debug('Google sign in');
    return dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title='Login'>
      <form
        aria-label='submit-form'
        onSubmit={onSubmit}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>
          <Grid item xs={12} mt={2}>
            <TextField
              label='mail'
              type='email'
              fullWidth
              autoComplete='email'
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              label='password'
              type='password'
              fullWidth
              autoComplete='current-password'
              name='password'
              inputProps={{ 'data-testid': 'password' }}
              value={password}
              onChange={onInputChange}
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
              type='submit'
              disabled={isAuthenticating}
              variant='contained'
              fullWidth
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={isAuthenticating}
              onClick={onGoogleSignIn}
              aria-label='google-btn'
              variant='contained'
              fullWidth
            >
              <Google />
              <Typography marginLeft={1} variant='body2'>
                Google
              </Typography>
            </Button>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link
              component={RouteLink}
              color='inherit'
              mt={1}
              to='/auth/register'
            >
              Create account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default Login;
