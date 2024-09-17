import { useEffect, useState } from 'react';
import styles from './TabelaAulas.module.css';
import AbreviaData from './AbreviaData';
import AbreviaInstrutor from './AbreviaInstrutor';
import AbreviarUndCurricular from './AbreviarUndCurricular';
import AbreviaAmbiente from './AbreviaAmbiente';

function TabelaAulas() {
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    carregarAulas();
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
      //console.log(consulta)
    } catch (error) {
      console.log('Erro ao buscar aulas', error);
    }
  }

  return (
    <div className={styles.aulas}>
      <table className={styles.tabelaAulas}>
        <thead>
          <tr>
            <th>Inicio</th>
            <th>Fim</th>
            <th>Turma</th>
            <th>Instrutor</th>
            <th>Unidade Curricular</th>
            <th>Ambiente</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula) => (
            <tr key={aula.id}>
              <td>{<AbreviaData data={aula.data_hora_inicio} />}</td>
              <td>{<AbreviaData data={aula.data_hora_fim} />}</td>
              <td>{aula.turma}</td>
              <td>{<AbreviaInstrutor instrutor={aula.instrutor} />}</td>
              <td>
                {
                  <AbreviarUndCurricular
                    unidadeCurricular={aula.unidade_curricular}
                  />
                }
              </td>
              <td>{<AbreviaAmbiente ambiente={aula.ambiente} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaAulas;
