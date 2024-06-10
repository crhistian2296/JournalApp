import { describe, expect, test } from 'vitest';
import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authFixtures';

describe('Pruebas en el authSlice', () => {
  test('Debe de retornar el estado inicial del usuario y el reducer debe llamarse "auth"', () => {
    const state = authSlice.reducer(initialState, {});
    expect(authSlice.name).toBe('auth');
    expect(state).toEqual(initialState);
  });

  test('Debe de hacer el login del usuario', () => {
    const state = authSlice.reducer(
      initialState,
      login({ ...demoUser, errorMessage: null })
    );

    expect(state).toEqual(authenticatedState);
  });

  test('Debe de hacer el logout del usuario sin argumento', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test('Debe de hacer el logout del usuario con error como argumento', () => {
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage: 'testeando error' })
    );
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage: 'testeando error',
    });
  });

  test('Debe de pasar a "checking" es status de usuario al emplear la accion "checkingCredentials"', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe('checking');
  });
});
