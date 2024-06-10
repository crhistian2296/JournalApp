import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import JournalRouter from './router/JournalRouter';
import { store } from './store';
import { AppTheme } from './theme';

const JournalApp = () => {
  return (
    <Router>
      <Provider store={store}>
        <AppTheme>
          <JournalRouter />
        </AppTheme>
      </Provider>
    </Router>
  );
};

export default JournalApp;
