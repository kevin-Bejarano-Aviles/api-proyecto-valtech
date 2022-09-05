function Button({type,nombre,handleFunction}) {
  //hice que la funcion no este aun para que no afecte en el renderizado

  return (
    <button type={type} onClick={handleFunction}>{nombre}</button>
  )
}

export default Button;