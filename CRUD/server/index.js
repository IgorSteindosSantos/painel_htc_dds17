import cors from "cors";
import express from "express";
import { deltePerson, getPerson, postPerson, putPerson } from "./src/models/PersonModels.js";

const app = express();
const port = 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE", 
    })
);
app.use(express.json());


app.get("/person", getPerson);
app.post("/register", postPerson);
app.delete("/delete/:id", deltePerson);
app.put("/update/:id", putPerson);


app.get("/", (req, res) => {
    res.send("API funcionando");
});
  

app.listen(port, () => {
    console.log(`API funcionando na porta ${port}`);
});