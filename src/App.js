import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigator from './components/Navigator/Navigator';
import Router from './components/Router';
import Footer from './components/Footer/Footer';
import { AlertProvider } from './utils/AlertProvider';
import { ConfirmProvider } from './utils/ConfirmProvider';

function App() {
  return (
    <ConfirmProvider>
    <AlertProvider>
      <BrowserRouter>
          <Navigator/>
          <Router />
          <Footer/>
      </BrowserRouter>
    </AlertProvider>
    </ConfirmProvider>
  );
}

export default App;
