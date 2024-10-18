import express from 'express';

import { cadastroAula } from './controllers/AulaController.js';

//Intanciando objeto express
const app = express();
const port = 5000;

//Configurando comunicação em JSON
app.use(express.json());

//Rota de teste api
app.get('/', (req, res) => {
  res.send('API funcionando');
});

//rotas de CRUD de aulas
app.post('/aulas', cadastroAula);

app.get('/aulas', (req, res) => {
  res.status(200).json([
    {
        "id": "1300",
        "data": "2024-08-29T03:00:00.000Z",
        "data_hora_inicio": "2024-08-29T21:00:00.000Z",
        "data_hora_fim": "2024-08-30T01:00:00.000Z",
        "turma": "EMP-NBM-03",
        "instrutor": "JOEL HERBERT BARBOSA SILVA",
        "unidade_curricular": "NOÇÕES BÁSICAS PARA MAQUINISTAS (CH: 219.0000)",
        "ambiente": "VTRIA-3-SALA-3004",
        "chave": null
      },
  ]);
});

app.listen(port, () => {
  console.log(`API funcionando na porta ${port}`);
});
