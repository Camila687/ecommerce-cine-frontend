import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dulceria from './pages/Dulceria';
import Pago from './pages/Pago';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dulceria" element={<Dulceria />} />
          <Route path="/pago" element={<Pago />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
