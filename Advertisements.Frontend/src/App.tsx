import PagesProvider from './providers/PagesProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import MuiThemeProvider from './providers/MuiThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setDefaultOptions } from 'date-fns';
import lt from 'date-fns/locale/lt/index';

function App() {
  const queryClient = new QueryClient();
  setDefaultOptions({
    weekStartsOn: 1,
    locale: lt,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider>
        <ToastContainer />
        <PagesProvider />
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
