import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const JournalRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<HomePage />}></Route>
      <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
  );
};

export default JournalRoutes;
