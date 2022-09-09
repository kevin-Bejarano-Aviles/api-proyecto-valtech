import './App.css';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrientedSignUpPage from './pages/OrientedSignUpPage';
import Events from './pages/Events';
import WelcomePage from './pages/WelcomePage';
import Error from './pages/Error';
import ProfilePage from './pages/ProfilePage';
import OrientedsPage from './pages/OrientedsPage';
import OrientedPage from './pages/OrientedPage';
import AssignCounselorPage from './pages/AssignCounselorPage';
import CreateEventPage from './pages/CreateEventPage';

import Button from './components/Button';
import HeaderPublic from './components/HeaderPublic';
import HeaderAdmin from './components/HeaderAdmin';
import OrientedList from './components/OrientedList';
import Oriented from './components/Oriented';
import  Footer from './components/Footer'
import Proposal from './components/Proposal'
import ProposalBox from './components/ProposalBox';

function App() {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/login' element={<LoginPage />} />

      <Route path='/inicio' element={<HomePage />} />
      <Route path='/inicio/mi-perfil' element={<ProfilePage />} />

      <Route path='/orientados' element={<OrientedsPage />} />
      <Route path='/orientados/alta-orientado' element={<OrientedSignUpPage />} />
      <Route path='/orientados/:id' element={<OrientedPage />} />
      <Route path='/orientados/:id/asignar-orientador' element={<AssignCounselorPage />} />

      <Route path='/eventos' element={<Events/>} />
      <Route path='/eventos/crear-evento' element={<CreateEventPage />} />

      <Route path={'/*'} element={<Error />} />

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
