import cors from "cors";
import express from "express";
import { getUser, postUser } from "./src/models/UserModels.js";
import { getTarefas, postTarefas, putTarefas } from "./src/models/TarefasModels.js";

const app = express();
const port = 5000;

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,POST,PUT,DELETE,PATCH",
      allowedHeaders: "Content-Type,Authorization", 
    })
);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.put("/updateTarefa/:id", putTarefas);
app.get("/tarefas", getTarefas);
app.post("/registerTarefas", postTarefas);
  
app.get("/users", getUser);
app.post("/registerUser", postUser);


app.listen(port, () => {
    console.log(`API funcionando na porta ${port}`);
});