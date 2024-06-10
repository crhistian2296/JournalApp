import { Navigate, Route, Routes } from 'react-router-dom';
import AuthRoutes from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hooks';
import JournalRoutes from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/';

const JournalRouter = () => {
  const status = useCheckAuth();

  if (status === 'checking') return <CheckingAuth />;

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <Route path='auth/*' element={<AuthRoutes />} />
      ) : (
        <Route path='*' element={<JournalRoutes />} />
      )}
      <Route path='*' element={<Navigate to='auth/*' />} />
    </Routes>
  );
};

export default JournalRouter;
