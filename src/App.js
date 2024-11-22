import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Battle from './Pages/Battle';
import Ranking from './Pages/Ranking';
import DrawerAppBar from './components/AppBar';
import Pokedex from './Pages/Pokedex';
import Footer from './components/Footer';
import PokemonContextProvider from './contexts/PokemonContextProvider';
import { Box } from '@mui/material';


function App() {

  return (
    <BrowserRouter>
      <DrawerAppBar />
      <Box display="flex" flexDirection="column" height="100vh">
      <PokemonContextProvider>
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/Battle" element={<Battle />} />
          <Route path="/Ranking" element={<Ranking />} />
        </Routes>
      </PokemonContextProvider>
      <Footer />
      </Box>
      
    </BrowserRouter>
  );
}

export default App;
