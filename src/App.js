import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ConfigureDetails from './pages/ConfigureDetails';
import ConfigureCarousels from './pages/ConfigureCarousels';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/configure-details">Configure Details</Link>
          <Link to="/configure-carousels">Configure Carousels</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h1>Just the home page! hello!</h1>
            </div>
          } />
          <Route path="/configure-details" element={<ConfigureDetails />} />
          <Route path="/configure-carousels" element={<ConfigureCarousels />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;