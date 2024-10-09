import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TabelaAulas.module.css';
import AbreviaData from './AbreviaData';
import AbreviaInstrutor from './AbreviaInstrutor';
import AbreviaUC from './AbreviaUC';
import AbreviaAmbiente from './AbreviaAmbiente';
import Loading from '../layout/Loading';

function TabelaAulas({ tipo, onDeleteSuccess }) {
  const [aulas, setAulas] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      carregarAulas();
    }, 300);
  }, []);

  async function carregarAulas() {
    try {
      const resposta = await fetch('http://localhost:5000/aulas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resposta) {
        throw new Error('Erro ao buscar aulas');
      }

      const consulta = await resposta.json();
      setAulas(consulta);
      setRemoveLoading(true);
      // console.log(consulta);
    } catch (error) {
      console.log('Erro ao buscar aulas', error);
    }
  }

  async function deletarAula(id) {
    try {
      const resposta = await fetch(`http://localhost:5000/aulas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!resposta.ok) {
        const error = await resposta.json();
        throw new Error('Erro ao Deleter Usuário', error);
      } else {
        // alert('Aula deletada com sucesso!');
        setAulas(aulas.filter((aula) => aula.id !== id));
        onDeleteSuccess();
      }
    } catch (error) {
      throw new Error('Erro ao Deleter Usuário', error);
    }
  }

  return (
    <div className={`${styles.aulas} ${tipo === 'edit' ? styles.edit : ''}`}>
      <table className={styles.tabelaAulas}>
        <thead>
          <tr>
            <th>Inicio</th>
            <th className={styles.fim}>Fim</th>
            <th>Turma</th>
            <th>Intrutor</th>
            <th>Unidade Curricular</th>
            <th>Ambiente</th>
            {tipo === 'edit' && <td>Ações</td>}
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula) => (
            <tr key={aula.id}>
              <td>{<AbreviaData data={aula.data_hora_inicio} />}</td>
              <td className={styles.fim}>
                {<AbreviaData data={aula.data_hora_fim} />}
              </td>
              <td>{aula.turma}</td>
              <td>{<AbreviaInstrutor nomeCompleto={aula.instrutor} />}</td>
              <td>
                {<AbreviaUC unidade_curricular={aula.unidade_curricular} />}
              </td>
              <td>{<AbreviaAmbiente nomeAmbiente={aula.ambiente} />}</td>
              {tipo === 'edit' && (
                <td className="bg-light">
                  <Link
                    to={`/editar_aula/${aula.id}`}
                    className="btn btn-warning"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deletarAula(aula.id)}
                  >
                    Deletar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!removeLoading && <Loading />}
      {removeLoading && aulas.length === 0 && <h1>Não há aulas disponíveis</h1>}
    </div>
  );
}

export default TabelaAulas;
