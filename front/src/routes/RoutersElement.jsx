import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/PrivatePages/Home/HomePage';
import LoginPage from '../pages/PublicPages/Login/LoginPage';
import OrientedSignUpPage from '../pages/PrivatePages/OrientedSignUp/OrientedSignUpPage';
import EventsPage from '../pages/PrivatePages/Event/EventsPage';
import WelcomePage from '../pages/PublicPages/Welcome/WelcomePage';
import ErrorPage from '../pages/ErrorPage';
import ProfilePage from '../pages/PrivatePages/Profile/ProfilePage';
import OrientedsPage from '../pages/PrivatePages/Orienteds/OrientedsPage';
import OrientedDetail from '../pages/PrivatePages/OrientedDetail/OrientedDetailPage';
import AssignCounselorPage from '../pages/PrivatePages/AssignCounselor/AssignCounselorPage';
// import CreateEventPage from '../pages/PrivatePages/CreateEvent/CreateEventPage';
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
        <Route path='/orientados/:id' element={<PrivateRoutes><OrientedDetail /></PrivateRoutes>} />
        <Route path='/orientados/:id/asignar-orientador' element={<PrivateRoutes><AssignCounselorPage /></PrivateRoutes>} />
  
        <Route path='/eventos' element={<PrivateRoutes><EventsPage/></PrivateRoutes>} />
        {/* <Route path='/eventos/crear-evento' element={<PrivateRoutes><CreateEventPage /></PrivateRoutes>} /> */}


        <Route path='*' element={<ErrorPage />} />

      </Routes>
    );
  }

  export default RoutersElement;