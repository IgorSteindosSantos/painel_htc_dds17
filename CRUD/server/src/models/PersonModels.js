import conexao from "../../conexao.js";

export const getPerson = async (req, res) =>{
    try {
        const [rows] = await conexao.query("SELECT * FROM person");
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pessoa", error})
    }
}

export const postPerson = async (req, res) => {
    const {name, surname, age } = req.body;
    try {
        const [result] = await conexao.query(
            "INSERT INTO person (name, surname, age) VALUES (?,?,?)",
            [name, surname, age]
        );
        res.status(201).json({ id: result.insertId, name, surname, age });
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar pessoa", error });
    }
}

export const deltePerson = async (req, res) => {
    const {id} = req.params;
    try {
        await conexao.query("DELETE FROM person WHERE id = ?", [id]);
        res.status(200).json({ message: "Pessoa excluída com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir pessoa", error });
    }
}

export const putPerson = async (req, res) => {
    const {id} = req.params;
    const {name, surname, age} = req.body;
    try {
        await conexao.query(
            "UPDATE person SET name = ?, surname = ?, age = ? WHERE id = ?",
            [name, surname, age, id]
        );
        res.status(200).json({ message: "Pessoa atualizada com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar pessoa", error });
    }
}