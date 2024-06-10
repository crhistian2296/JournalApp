import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';
import Login from '../../../src/auth/pages/LoginScreen';
import { store } from '../../../src/store';

describe('Pruebas en LoginScreen', () => {
  test('Debe de mostrar correctamente LoginScreen', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('Boton de Google debe de llamar a startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click(googleBtn);

    expect(store.getState().auth.status).toBe('checking');
  });

  test('Submite debe de llamar startLoginWithEmailAndPassword', () => {
    const email = 'user2@gmail.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'mail' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password', { name: 'password' });
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    });

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect(emailField.value).toBe(email);
    expect(passwordField.value).toBe(password);
  });
});
