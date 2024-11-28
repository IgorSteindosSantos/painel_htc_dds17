import conexao from "../../conexao.js";

export async function postUser(req, res) {
  const { name, email } = req.body;
  try {
    const [result] = await conexao.query(
      "INSERT INTO user (name, email) VALUES (?, ?)",
      [name, email]
    );
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    return [201, "Usuário cadastrado"];
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao cadastrar o usuário" });
  }
}

export async function  getUser(req, res) {
  try {
    const [rows] = await conexao.query("SELECT * FROM user");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
}