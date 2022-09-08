import React from 'react'
import ProposalBox from './ProposalBox'

function Proposal() {
  return (
    <div className='h-[358px] w-[864px]'>
      <div className='bg-green h-[211px] w-[864px] rounded-lg flex flex-col'>
        <h2 className='ml-8 relative top-8 text-2xl font-medium text-white'>¿Cuál es nuestra propuesta?</h2>
        <h3 className='ml-8 mt-10 relative text-lg font-medium text-white'>Programas de desarrollo personal y descubrimiento.</h3>
      </div>
      <div className=' h-[211px] w-[864px] ml-8 z-10 relative bottom-16 flex flex-row'>
           <div className='mr-4'><ProposalBox Title="Orientación vocacional" description="Te entrenamos en la toma de decisión de tu trayecto profesional."/></div>
           <div className='mr-4'><ProposalBox Title="Re-Orientación vocacional" description="Reinvensión personal, laboral y profesional."/></div>
           <div><ProposalBox Title="Espacios de aprendizaje" description="Aprendé a pensar desde otra lógica."/></div>
      </div>
    </div>
  )
}
export default  Proposal
