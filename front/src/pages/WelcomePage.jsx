import React from "react";
import Footer from "../components/Footer";
import Header from "../components/HeaderPublic";

function Welcome() {
  return (
    <div>
      <Header/>
      <div>
        <h1>Misión</h1>
        <h3>Viví tu experiencia V_Camp.</h3>
        
      </div>
      {/* aca iria lo de la propuesta */}
      <div>
        <h3>Viví tu transformación personal.</h3>
        <h3>Viví tu experiencia V_Camp.</h3>
      </div>
      <Footer/>
    </div>
  )
}

export default Welcome;