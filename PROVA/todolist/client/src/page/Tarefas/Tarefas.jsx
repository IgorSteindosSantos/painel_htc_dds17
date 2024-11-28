import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Paper, Box, Typography, Toolbar, TextField, FormControl, FormLabel, MenuItem, Button } from '@mui/material'

function Tarefas() {
    const [descricao, setDescricao] = useState("");
    const [setor, setSetor] = useState("");
    const [data, setData] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [status, setStatus] = useState("A fazer");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    const prioridades = [
        { value: "Baixa", label: "Baixa" },
        { value: "Média", label: "Média" },
        { value: "Alta", label: "Alta" },
    ];

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const handleClickButton = async () => {
        try {
            const response = await fetch("http://localhost:5000/registerTarefas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    descricao,
                    setor,
                    data,
                    prioridade,
                    id_user: selectedUser,
                    status,
                }),
            });

            if (response.ok) {
                console.log("Tarefa cadastrada com sucesso");
                setData("");
                setDescricao("");
                setSetor("");
                setPrioridade("");
                setSelectedUser("");
                setStatus("A fazer");
            } else {
                console.error("Erro ao cadastrar tarefa");
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Navbar />
            <Toolbar />
            <Box
                component="main"
                sx={{ width: "500px", overflow: "hidden", padding: "16px" }}
            >
                <Paper
                    sx={{
                        width: "100%",
                        overflow: "hidden",
                        padding: "15px",
                        boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.50)",
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            paddingLeft: "16px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                        }}
                    >
                        Cadastrar Nova Tarefa
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            padding: "18px",
                            gap: "20px",
                            width: "100%",
                        }}
                    >
                        <div style={{ width: "450px" }}>
                            <TextField
                                id="outlined-multiline-static"
                                required
                                label="Descrição"
                                multiline
                                fullWidth
                                rows={4}
                                onChange={(e) => setDescricao(e.target.value)}
                                value={descricao}
                            />
                            <div style={{ paddingTop: "16px" }}>
                                <TextField
                                    required
                                    label="Setor"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={(e) => setSetor(e.target.value)}
                                    value={setor}
                                />
                            </div>
                            <div style={{ paddingTop: "16px" }}>
                                <FormControl fullWidth variant="outlined" size="small">
                                    <FormLabel style={{ marginBottom: "3px" }}>Data de Abertura</FormLabel>
                                    <TextField
                                        id="data-abertura"
                                        type="date"
                                        required
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={(e) => setData(e.target.value)}
                                        value={data}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </div>

                            <div style={{ paddingTop: "16px" }}>
                                <TextField
                                    required
                                    label="Prioridade"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    select
                                    onChange={(e) => setPrioridade(e.target.value)}
                                    value={prioridade}
                                >
                                    {prioridades.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div style={{ paddingTop: "16px" }}>
                                <TextField
                                    required
                                    label="Usuário"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    select
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                    value={selectedUser}
                                >
                                    {users.map((user) => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {user.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div
                                style={{
                                    paddingTop: "16px",
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleClickButton}
                                    sx={{
                                        backgroundColor: "#1976d2",
                                        "&:hover": {
                                            backgroundColor: "#115293",
                                        },
                                    }}
                                >
                                    Cadastrar
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default Tarefas