import React, { useState, useEffect  } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [age, setAge] = useState();
  const [person, setPerson] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchPerson = async () => {
    const response = await fetch("http://localhost:5000/person");
    const data = await response.json();
    setPerson(data);
  }

  useEffect(() => {
    fetchPerson();
  }, []);

  const handleClickButton = async () => {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        age,
      }),
    });

    if(response.ok){
      console.log(response)
      fetchPerson();
      setName("");
      setSurname("");
      setAge("");
    } else {
      console.log("erro ao cadastrar");
    }

  }

  const handleClickUpdate = async () => {
    const response = await fetch(`http://localhost:5000/update/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        age,
      }),
    });

    if(response.ok){
      console.log(response)
      fetchPerson();
      setName("");
      setSurname("");
      setAge("");
    } else {
      console.log("erro ao atualizar");
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    });
    if(response.ok) {
      fetchPerson();
    }
  };

  // Função para preparar edição
  const handleEdit = (person) => {
    setName(person.name);
    setSurname(person.surname);
    setAge(person.age);
    setEditId(person.id); // Define o ID em edição
  };
 
  return (
    <>
      <div className='app--container'>
        <div className='register--container'>
          <h1 className='register--title'>Cadastrando Pessoa</h1>
          <input
            type="text"
            name='name'
            placeholder='Nome'
            className='register--input'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            name='surname'
            placeholder='Sobre Nome'
            className='register--input'
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
          />
          <input
            type="text"
            name='age'
            placeholder='Idade'
            className='register--input'
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
          <button className='register--button' onClick={() => handleClickButton()}>Registrar</button>
          <button className='register--button' onClick={() => handleClickUpdate()}>Atualizar</button>
        </div>

        <div className="table--container">
        <h2 className="table--title">Lista de Pessoas</h2>
        <table className="records--table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {person.map((person) => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.surname}</td>
                <td>{person.age}</td>
                <td>
                  <button
                    className="edit--button"
                    onClick={() => handleEdit(person)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete--button"
                    onClick={() => handleDelete(person.id)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  )
}

export default App
