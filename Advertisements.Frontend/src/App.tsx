import PagesProvider from './providers/PagesProvider';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PagesProvider />
    </QueryClientProvider>
  )
}

export default App
