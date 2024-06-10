import {
  logoutFirebase,
  registerUserWithEmailPassword,
  signInUserWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase/provider';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
  return async dispatch => {
    dispatch(checkingCredentials());
    console.debug('Checking credentials');
  };
};

export const startGoogleSignIn = token => {
  return async dispatch => {
    dispatch(checkingCredentials());
    console.debug('Checking Google sign in');

    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result));
    return dispatch(login(result));
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async dispatch => {
    dispatch(checkingCredentials());
    console.debug('Checking with email and password');

    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });
    if (!result?.ok) return dispatch(logout(result));
    return dispatch(login(result));
  };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async dispatch => {
    dispatch(checkingCredentials());
    console.debug({ email, password });

    const result = await signInUserWithEmailAndPassword({ email, password });

    if (!result?.ok) return dispatch(logout(result));
    return dispatch(login(result));
  };
};

export const startLogOut = () => {
  return async dispatch => {
    try {
      await logoutFirebase();
      dispatch(clearNotesLogout());
      dispatch(logout());
    } catch (error) {
      console.debug(error);
    }
  };
};
