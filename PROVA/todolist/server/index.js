import cors from "cors";
import express from "express";
import { postUser } from "./src/models/UserModels.js";

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
  

app.post("/registerUser", postUser);


app.listen(port, () => {
    console.log(`API funcionando na porta ${port}`);
});