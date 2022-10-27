import './App.css';
import RoutersElement from './routes/RoutersElement';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <RoutersElement />
    </Provider>
  );
}

export default App;
