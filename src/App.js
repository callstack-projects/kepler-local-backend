import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ConfigureDetails from './pages/ConfigureDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/configure-details">Configure Details</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h1>Just the home page! hello!</h1>
            </div>
          } />
          <Route path="/configure-details" element={<ConfigureDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;