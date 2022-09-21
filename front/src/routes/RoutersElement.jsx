import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import OrientedSignUpPage from '../pages/OrientedSignUpPage';
import EventsPage from '../pages/EventsPage';
import WelcomePage from '../pages/WelcomePage';
import ErrorPage from '../pages/ErrorPage';
import ProfilePage from '../pages/ProfilePage';
import OrientedsPage from '../pages/OrientedsPage';
import OrientedPage from '../pages/OrientedPage';
import AssignCounselorPage from '../pages/AssignCounselorPage';
import CreateEventPage from '../pages/CreateEventPage';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

function RoutersElement() {
    return (
      <Routes>
        

        <Route path='/' element={<PublicRoutes><WelcomePage /></PublicRoutes>}  />
        <Route path='/login' element={<PublicRoutes><LoginPage /></PublicRoutes>} />
        
        <Route path='/inicio' element={<PrivateRoutes><HomePage /></PrivateRoutes>}/>
          <Route path='mi-perfil' element={<PrivateRoutes><ProfilePage/></PrivateRoutes>} />
        
        <Route path='/orientados' element={<PrivateRoutes><OrientedsPage /></PrivateRoutes>} />
        <Route path='/orientados/alta-orientado' element={<PrivateRoutes><OrientedSignUpPage /></PrivateRoutes>} />
        <Route path='/orientados/:id' element={<PrivateRoutes><OrientedPage /></PrivateRoutes>} />
        <Route path='/orientados/:id/asignar-orientador' element={<PrivateRoutes><AssignCounselorPage /></PrivateRoutes>} />
  
        <Route path='/eventos' element={<PrivateRoutes><EventsPage/></PrivateRoutes>} />
        <Route path='/eventos/crear-evento' element={<PrivateRoutes><CreateEventPage /></PrivateRoutes>} />
  
        <Route path='*' element={<ErrorPage />} />

      </Routes>
    );
  }

  export default RoutersElement;