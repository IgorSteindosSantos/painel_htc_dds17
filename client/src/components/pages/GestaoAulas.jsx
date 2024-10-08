import React from 'react';
import TabelaAulas from '../TabelaAulas/TabelaAulas';
import NavBar from '../layout/Navbar';
import { Link } from 'react-router-dom';
function GestaoAulas() {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className='text-center my-3'>Gestão Aulas</h1>
        <div className='text-end'>
          <Link className='btn btn-primary mb-3' to='/cadastro_aula'>Cadastro Aula</Link>
        </div>
        <TabelaAulas tipo="edit" />
      </div>
    </>
  );
}

export default GestaoAulas;
