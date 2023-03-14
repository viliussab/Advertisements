import PagesProvider from './providers/PagesProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import MuiThemeProvider from './providers/MuiThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient();

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
