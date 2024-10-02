import { useState } from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';

function CadastrosAulas() {
  const [dataAula, setDataAula] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaFinal, setHoraFinal] = useState('');
  const [turma, setTurma] = useState('');
  const [instrutor, setInstrutor] = useState('');
  const [unidadeCurricular, setUnidadeCurricular] = useState('');
  const [ambiente, setAmbiente] = useState('');
  const [infoAulas, setInfoAulas] = useState({});

  async function cadastrarAula(event) {
    event.preventDefault();
    console.log(dataAula);
  }

  return (
    <>
      <div>
        <Navbar />
        <div className="container justify-content-center col-sm-12 col-md-6 col-lg-3">
          <h1 className="text-center">Adicionar Aula</h1>
          <form onSubmit={cadastrarAula}>
            <label className="form-label" htmlFor="">
              Data:
            </label>
            <input
              className="form-control"
              type="date"
              name=""
              id=""
              value={dataAula}
              onChange={(event) => setDataAula(event.target.value)}
            />
            <label className="form-label" htmlFor="">
              Hora Inicio:
            </label>
            <input
              className="form-control"
              type="time"
              name=""
              id=""
              value={horaInicial}
              onChange={(event) => setHoraInicial(event.target.value)}
            />
            <label className="form-label" htmlFor="">
              Hora Fim:
            </label>
            <input
              className="form-control"
              type="time"
              name=""
              id=""
              value={horaFinal}
              onChange={(event) => setHoraFinal(event.target.value)}
            />
            <label className="form-label" htmlFor="">
              Turma:
            </label>
            <input
              className="form-control"
              type="text"
              name=""
              id=""
              value={turma}
              onChange={(event) => setTurma(event.target.value)}
            />
            <label className="form-label" htmlFor="">
              Instrutor:
            </label>
            <input
              className="form-control"
              type="text"
              name=""
              id=""
              value={instrutor}
              onChange={(event) => setInstrutor(event.target.value)}
            />
            <label className="form-label" htmlFor="">
              Unidade Curricular:
            </label>
            <input
              className="form-control"
              type="text"
              name=""
              id=""
              value={unidadeCurricular}
              onChange={(event) => setUnidadeCurricular(event.target.value)}
            />
            <label className="form-label" htmlFor="">
              Ambiente:
            </label>
            <input
              className="form-control"
              type="text"
              name=""
              id=""
              value={ambiente}
              onChange={(event) => setAmbiente(event.target.value)}
            />
            <Link className="btn btn-danger mt-3" to="/login">
              Cancelar
            </Link>
            <button
              className="btn btn-success mt-3 float-end abs"
              type="submit"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CadastrosAulas;
