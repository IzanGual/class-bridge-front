import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navigator from './components/Navigator/Navigator';
import Router from './components/Router';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navigator/>
          <Router />
      </BrowserRouter>

    </div>
  );
}

export default App;
