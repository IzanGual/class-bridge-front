import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigator from './components/Navigator/Navigator';
import Router from './components/Router';
import Footer from './components/Footer/Footer';
import { AlertProvider } from './utils/AlertProvider';
import { ConfirmProvider } from './utils/ConfirmProvider';
import { useLocation } from 'react-router-dom';

function App() {
  return (
    <ConfirmProvider>
      <AlertProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AlertProvider>
    </ConfirmProvider>
  );
}

function Layout() {
  const location = useLocation(); // Ahora useLocation está dentro del contexto del BrowserRouter
  const isBridgeToRoute = location.pathname.startsWith('/bridgeto/');

  return (
    <>
      {!isBridgeToRoute && <Navigator />}
      <Router />
      {!isBridgeToRoute && <Footer />}
    </>
  );
}

export default App;