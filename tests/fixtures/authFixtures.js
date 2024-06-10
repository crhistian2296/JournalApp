export const initialState = {
  status: 'checking', //  checking, not-authenticated, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null,
};
export const authenticatedState = {
  status: 'authenticated', //  checking, not-authenticated, authenticated
  uid: '123AASDF',
  email: 'demo@gmail.com',
  displayName: 'Demo user',
  photoUrl: 'https://demo.jpg',
  errorMessage: null,
};
export const notAuthenticatedState = {
  status: 'not-authenticated', //  checking, not-authenticated, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null,
};

export const demoUser = {
  uid: '123AASDF',
  email: 'demo@gmail.com',
  displayName: 'Demo user',
  photoUrl: 'https://demo.jpg',
};
