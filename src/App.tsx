
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import { AppRoutes } from './router';

function App() {
  const { theme } = useAuthStore();

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <BrowserRouter >
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
