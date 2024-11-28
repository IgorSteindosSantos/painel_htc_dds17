import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  Typography,
  Toolbar,
  Box,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";

function User() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const handleClickButton = async () => {
    const response = await fetch("http://localhost:5000/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    if (response.ok) {
      console.log("Usuário cadastrado com sucesso");
      setEmail("");
      setName("");
    } else {
      console.log("Erro ao cadastrar usuário ")
    }
  };
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box
        component="main"
        sx={{
          width: "500px",
          overflow: "hidden",
          padding: "16px",
          justifyContent: "center",
          display: "flex"
        }}
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
            Cadastrar novo usuário
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
                required
                label="Nome"
                variant="outlined"
                size="small"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <div style={{ paddingTop: "16px" }}>
                <TextField
                  required
                  label="E-mail"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
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
  );
}

export default User;
