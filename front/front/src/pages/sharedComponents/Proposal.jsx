import React from 'react'
import ProposalBox from './ProposalBox'

function Proposal() {
  return (
    <div className='flex justify-center mt-20 mobile:mt-12 mb-96 tablet:mb-28'>
          <div className=' h-[640px] tablet:h-[358px] laptop:w-[864px]'>
      <div className='bg-green h-[211px] w-full laptop:w-[864px] mobile:rounded-lg flex flex-col'>
        <h2 className='ml-8 relative top-8 text-2xl font-medium text-white'>¿Cuál es nuestra propuesta?</h2>
        <h3 className='tablet:mb-0 ml-8 mt-10 relative text-lg font-medium text-white'>Programas de desarrollo personal y descubrimiento.</h3>
      </div>
      <div className='mt-16 mobile:mt-8 tablet:mt-0 h-[211px] z-10 relative bottom-32 tablet:bottom-16 flex items-center flex-col tablet:flex-row laptop:w-[864px] laptop:ml-8 '>
           <div className='mr-4'><ProposalBox Tittle="Orientación vocacional" description="Te entrenamos en la toma de decisión de tu trayecto profesional."/></div>
           <div className='mr-4'><ProposalBox Tittle="Re-Orientación vocacional" description="Reinvensión personal, laboral y profesional."/></div>
           <div className='mr-4'><ProposalBox Tittle="Espacios de aprendizaje" description="Aprendé a pensar desde otra lógica."/></div>
      </div>
    </div>
      </div>
  
  )
}
export default  Proposal
