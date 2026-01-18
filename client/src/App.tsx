import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { PokemonDetail } from './pages/PokemonDetail';
import { CreatePokemon } from './pages/CreatePokemon';
import { Gamepad2 } from 'lucide-react';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="container header-content">
            <Link to="/" className="logo">
              <Gamepad2 size={32} color="var(--color-primary)" />
              <h1>Pokedex<span style={{ color: 'var(--color-primary)' }}>PRO</span></h1>
            </Link>
            <nav>
              <Link to="/" className="nav-link">Inicio</Link>
              <Link to="/create" className="btn btn-primary">Agregar Pokémon</Link>
            </nav>
          </div>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/create" element={<CreatePokemon />} />
            <Route path="/edit/:id" element={<CreatePokemon />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
