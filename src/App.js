import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigator from './components/Navigator/Navigator';
import Router from './components/Router';
function App() {
  return (
      <BrowserRouter>
          <Navigator/>
          <Router />
      </BrowserRouter>
  );
}

export default App;
