import mysql from 'mysql2/promise';
import db from '../conexao.js';

export async function createAula(aula) {
  console.log('AulaModel: Create')
  const conexao = mysql.createPool(db);
  const sql = `INSERT INTO aulas 
    (data,data_hora_inicio,data_hora_fim,turma,instrutor,unidade_curricular,ambiente)
    VALUES (?,?,?,?,?,?,?)`;
  const params = [
    aula.data,
    aula.data_hora_inicio,
    aula.data_hora_fim,
    aula.turma,
    aula.instrutor,
    aula.unidade_curricular,
    aula.ambiente,
  ];

  try {
    const [retorno] = await conexao.query(sql, params);
    console.log('Aula cadastrada');
    return [201, 'Aula Cadastrada']
  } catch (error) {
    const msg = await error.json();
    console.log(msg);
    return [500, msg]
  }
}
