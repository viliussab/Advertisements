import PagesProvider from './providers/PagesProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import MuiThemeProvider from './providers/MuiThemeProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider>
        <PagesProvider />
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
