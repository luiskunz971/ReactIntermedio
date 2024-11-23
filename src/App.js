import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Battle from './Pages/Battle';
import Ranking from './Pages/Ranking';
import DrawerAppBar from './components/AppBar';
import Pokedex from './Pages/Pokedex';
import Footer from './components/Footer';
import PokemonContextProvider from './contexts/PokemonContextProvider';
import { Box } from '@mui/material';
import FetchPokemons from './components/FetchPokemons';

function App() {

  return (
    <BrowserRouter>
      <DrawerAppBar />
      <Box display="flex" flexDirection="column" minHeight="89vh">
        <PokemonContextProvider>
          <FetchPokemons>
            <Routes>
              <Route path="/" element={<Pokedex />} />
              <Route path="/Battle" element={<Battle />} />
              <Route path="/Ranking" element={<Ranking />} />
            </Routes>
          </FetchPokemons>
        </PokemonContextProvider>
        <Footer />
      </Box>

    </BrowserRouter>
  );
}

export default App;
