import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Navbar from "../../components/Navbar/Navbar";
import { Paper, Box, Typography, Toolbar, MenuItem, Select, Divider } from "@mui/material";

function ListTarefas() {
    const [tarefas, setTarefas] = useState([]);

    const fetchTarefas = async () => {
        try {
            const response = await fetch("http://localhost:5000/tarefas");
            const data = await response.json();
            setTarefas(data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    // const deleteTarefa = async (id) => {
    //     await fetch(`http://localhost:5000/deleteTarefa/${id}`, { method: "DELETE" });
    //     setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== id));
    // };

    const updateTarefaStatus = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:5000/updateTarefa/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                setTarefas((prevTarefas) =>
                    prevTarefas.map((tarefa) =>
                        tarefa.id === id ? { ...tarefa, status } : tarefa
                    )
                );
            } else {
                console.error("Erro ao atualizar status da tarefa");
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const tarefaId = result.draggableId;
            const newStatus = destination.droppableId;
            updateTarefaStatus(tarefaId, newStatus);
        }
    };

    useEffect(() => {
        fetchTarefas();
    }, []);

    const columns = {
        "A fazer": tarefas.filter((tarefa) => tarefa.status === "A fazer"),
        Pendente: tarefas.filter((tarefa) => tarefa.status === "Pendente"),
        Feitas: tarefas.filter((tarefa) => tarefa.status === "Feitas"),
    };

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Intl.DateTimeFormat("pt-BR", options).format(new Date(dateString));
    };

    return (
        <>
            <Navbar />
            <Toolbar />
            <Box sx={{
                padding: "24px",
                display: "flex",
                gap: "24px",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: "#f0f0f5",
                minHeight: "100vh",
            }}>
                <DragDropContext onDragEnd={handleDragEnd}>
                    {Object.keys(columns).map((column) => (
                        <Droppable key={column} droppableId={column}>
                            {(provided) => (
                                <Paper
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{
                                        width: "400px",
                                        minHeight: "600px",
                                        padding: "16px",
                                        borderRadius: "12px",
                                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                        backgroundColor: "#ffffff",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{ marginBottom: "10px", fontWeight: "bold", paddingBottom: "8px", textAlign: "center" }}
                                    >
                                        {column}
                                    </Typography>
                                    <Divider sx={{ marginBottom: "20px" }}/>
                                    {columns[column].map((tarefa, index) => (
                                        <Draggable
                                            key={tarefa.id}
                                            draggableId={String(tarefa.id)}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    sx={{
                                                        padding: "16px",
                                                        marginBottom: "12px",
                                                        borderRadius: "8px",
                                                        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                                                        backgroundColor: "#f5f5f5",
                                                    }}
                                                >
                                                    <Typography variant="body1">
                                                        Tarefa N° {tarefa.id}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Usuário: {tarefa.nome_usuario}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Setor: {tarefa.setor}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        Descrição: {tarefa.descricao}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: "gray",
                                                            display: "block",
                                                            marginTop: "7px",
                                                            fontSize: "14px"
                                                        }}
                                                    >
                                                        Criada em: {formatDate(tarefa.data)}
                                                    </Typography>
                                                    <Select
                                                        value={tarefa.status}
                                                        onChange={(e) =>
                                                            updateTarefaStatus(tarefa.id, e.target.value)
                                                        }
                                                        fullWidth
                                                        size="small"
                                                        sx={{ marginTop: "8px" }}
                                                    >
                                                        <MenuItem value="A fazer">A fazer</MenuItem>
                                                        <MenuItem value="Pendente">Pendente</MenuItem>
                                                        <MenuItem value="Feitas">Feitas</MenuItem>
                                                    </Select>
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Paper>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </Box>
        </>
    );
}

export default ListTarefas;
