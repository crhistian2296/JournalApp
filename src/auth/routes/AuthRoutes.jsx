import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/LoginScreen';
import Register from '../pages/Register';
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />}></Route>
      <Route path='register' element={<Register />}></Route>
      <Route path='*' element={<Navigate to='login' />}></Route>
    </Routes>
  );
};

export default AuthRoutes;
