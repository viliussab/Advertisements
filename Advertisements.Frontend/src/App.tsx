import PagesProvider from './providers/PagesProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import MuiThemeProvider from './providers/MuiThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setDefaultOptions } from 'date-fns';
import lt from 'date-fns/locale/lt/index';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart as ChartJs,
} from 'chart.js';
import AuthenticationProvider from './providers/AuthenticationProvider';

function App() {
  const queryClient = new QueryClient();
  setDefaultOptions({
    weekStartsOn: 1,
    locale: lt,
  });

  ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider>
        <AuthenticationProvider>
          <ToastContainer />
          <PagesProvider />
        </AuthenticationProvider>
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
