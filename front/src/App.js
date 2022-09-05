import './App.css';
import Button from './components/Button';

function App() {
  function alert(){
    alert("click en boton")
  }
  return (
    <div>
      <Button type="button" nombre="boton" handleFunction={alert}/>
    </div>
  );
}

export default App;
