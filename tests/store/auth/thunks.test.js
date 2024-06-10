import { beforeEach, describe, expect, test, vitest } from 'vitest';
import {
  logoutFirebase,
  registerUserWithEmailPassword,
  signInUserWithEmailAndPassword,
  signInWithGoogle,
} from '../../../src/firebase/provider';
import {
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  checkingAuthentication,
  startCreatingUserWithEmailAndPassword,
  startGoogleSignIn,
  startLogOut,
  startLoginWithEmailAndPassword,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

vitest.mock('../../../src/firebase/provider.js');

describe('Pruebas en los auth thunks', () => {
  const dispatch = vitest.fn();

  beforeEach(() => vitest.clearAllMocks());
  test('checkingAuthentication debe de llamar a la accion checkingCredentials', async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSignIn debe de llamar a checkingCredentials y login - exito', async () => {
    const loginData = { ok: true, ...demoUser };

    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe de llamar a checkingCredentials y logout - error', async () => {
    const logoutData = { ok: false, errorMesagge: 'Error de google' };

    await signInWithGoogle.mockResolvedValue(logoutData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(logoutData));
  });

  test('startLoginWithEmailAndPassword debe de llamar a checkingCredentials y login - exito', async () => {
    const formData = {
      email: demoUser.email,
      password: '123456',
    };

    const loginData = { ok: true, ...demoUser };

    await signInUserWithEmailAndPassword.mockResolvedValue(loginData);
    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLoginWithEmailAndPassword debe de llamar a checkingCredentials y logout - error', async () => {
    const formData = {
      email: demoUser.email,
      password: '',
    };

    const loginResp = { ok: false, errorMessage: 'fallo test' };

    await signInUserWithEmailAndPassword.mockResolvedValue(loginResp);
    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginResp));
  });

  test('startCreatingUserWithEmailAndPassword debe de llamar a checkingCredentials y login - exito', async () => {
    const formData = {
      email: demoUser.email,
      password: '123456',
      displayName: demoUser.displayName,
    };

    const loginData = {
      ok: true,
      ...demoUser,
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);
    await startCreatingUserWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startCreatingUserWithEmailAndPassword debe de llamar a checkingCredentials y login - error', async () => {
    const formData = {
      email: null,
      password: null,
      displayName: null,
    };

    const registerResp = { ok: false, errorMessage: 'error test' };

    await registerUserWithEmailPassword.mockResolvedValue(registerResp);
    await startCreatingUserWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(registerResp));
  });

  test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {
    await startLogOut()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
