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
    </Routes>
  );
}

export default App;
