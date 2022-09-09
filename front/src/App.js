import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrientedSignUpPage from './pages/OrientedSignUpPage';
import Button from './components/Button';
import HeaderPublic from './components/HeaderPublic';
import HeaderAdmin from './components/HeaderAdmin';
import OrientedList from './components/OrientedList';
import Oriented from './components/Oriented';
import  Footer from './components/Footer'
import Error from './pages/Error';
import Proposal from './components/Proposal'
import ProposalBox from './components/ProposalBox';
import Events from './pages/Events';


function App() {
  return (
    <Routes>
      <Route path='/' element={<p>Welcome</p>} />
      <Route path='/login' element={<LoginPage />} />

      <Route path='/inicio' element={<HomePage />} />
      <Route path='/inicio/mi-perfil' element={<p>Mi perfil</p>} />

      <Route path='/orientados' element={<p>Orientados</p>} />
      <Route path='/orientados/alta-orientado' element={<OrientedSignUpPage />} />
      <Route path='/orientados/:id' element={<p>Orientado</p>} />
      <Route path='/orientados/:id/asignar-orientador' element={<p>Asignar Orientador</p>} />

      <Route path='/eventos' element={<Events/>} />
      <Route path='/eventos/crear-evento' element={<p>Crear Evento</p>} />

      <Route path={'/*'} element={<div>Not Found</div>} />

      {/*  Las Rutas de abajo son sólo temporales por si necesitan ir viendo lo que crean */}
      <Route path={'/button'} element={<Button />} />
      <Route path={'/header-public'} element={<HeaderPublic />} />
      <Route path={'/header-admin'} element={<HeaderAdmin />} />
      <Route path={'/oriented-list'} element={<OrientedList />} />
      <Route path={'/oriented'} element={<Oriented />} />
      <Route path={'/footer'} element={<Footer />} />
      <Route path={'/404'} element={<Error />} />
      <Route path={'/pr'} element={<Proposal />} />
      <Route path={'/prb'} element={<ProposalBox />} />
    </Routes>
  );
}

export default App;
