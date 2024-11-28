import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate(); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/users", {
        method: "GET",
      });
      const users = await response.json();

      const user = users.find(
        (u: { email: string; password: string }) =>
          u.email === username && u.password === password
      );

      if (user) {
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        alert("User registered successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.detail || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        margin: "auto",
        marginTop: 5,
      }}
    >
      <Typography variant="h5" align="center">
        Login
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
       <Button
        onClick={handleRegister}
        variant="outlined"
        color="secondary"
        sx={{ mt: 1 }}
      >
        Register
      </Button>
    </Box>
  );
}

export default Login;
