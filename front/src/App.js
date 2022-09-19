import './App.css';

import RoutersElement from './routes/RoutersElement';
import Provider from './context/Provider';


function App() {
  return (

    <Provider>
      <RoutersElement/>
    </Provider>

    // <Routes>

    //   <Route path='/' element={<WelcomePage />}  />
    //   <Route path='/login' element={<LoginPage />} />
    //   {/* consultar sobre rutas privadas */}
      
    //   <Route path='/inicio' element={<HomePage />}/>
    //     <Route path='mi-perfil' element={<ProfilePage/>} />
      
    //   <Route path='/orientados' element={<OrientedsPage />} />
    //   <Route path='/orientados/alta-orientado' element={<OrientedSignUpPage />} />
    //   <Route path='/orientados/:id' element={<OrientedPage />} />
    //   <Route path='/orientados/:id/asignar-orientador' element={<AssignCounselorPage />} />

    //   <Route path='/eventos' element={<EventsPage/>} />
    //   <Route path='/eventos/crear-evento' element={<CreateEventPage />} />

      

    //   {/*  Las Rutas de abajo son sólo temporales por si necesitan ir viendo lo que crean */}
    //   <Route path={'/button'} element={<Button />} />
    //   <Route path={'/header-public'} element={<HeaderPublic />} />
    //   <Route path={'/header-admin'} element={<HeaderAdmin />} />
    //   <Route path={'/oriented-list'} element={<OrientedList />} />
    //   <Route path={'/oriented'} element={<Oriented />} />
    //   <Route path={'/footer'} element={<Footer />} />
    //   <Route path='*' element={<ErrorPage />} />
    //   <Route path={'/pr'} element={<Proposal />} />
    //   <Route path={'/prb'} element={<ProposalBox />} />
    //   <Route path={'/menu/*'} element={<Menu/>} >
    //    {/* <Route path='orientados' element={<h1>hola</h1>}></Route> */}

    //   </Route>
    // </Routes>
  );
}

export default App;
