import conexao from "../../conexao.js";

export async function getTarefas(req, res) {
  try {
    const [rows] = await conexao.query(`SELECT 
    tarefas.id, 
    tarefas.descricao, 
    tarefas.status, 
    tarefas.setor, 
    tarefas.data,
    user.name AS nome_usuario
FROM 
    tarefas
JOIN 
    user
ON 
    tarefas.id_user = user.id;
`);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas", error });
  }
}

export async function postTarefas(req, res) {
  const { descricao, data, setor, prioridade, id_user, status } = req.body;
  try {
    const [result] = await conexao.query(
      "INSERT INTO tarefas (descricao, data, setor, prioridade, id_user, status) VALUES (?, ?, ?, ?, ?, ?)",
      [descricao, data, setor, prioridade, id_user, status]
    );
    res.status(201).json({ message: "Tarefa cadastrada com sucesso" });
    return [201, "Tarefa cadastrada"];
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao cadastrar tarefa" });
  }
}

export const putTarefas = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await conexao.query(
      "UPDATE tarefas SET status = ? WHERE id = ?",
      [ status, id ]
    );
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};