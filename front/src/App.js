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

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/new-oriented'} element={<OrientedSignUpPage />} />

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
