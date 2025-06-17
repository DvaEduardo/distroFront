import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "../css/login.css";

const Login: React.FC = () => {
  const images = [
    "https://eurocdn.azureedge.net/bucket/BackOffice/a/a/distro.png",
  ];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //states
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordValid = password.trim();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = () => {
    const isEmailValid = email.trim() && /\S+@\S+\.\S+/.test(email);
    if (!isEmailValid && !isPasswordValid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ingresa un correo electrónico válido y una contraseña valida",
      });
      setEmailError(true);
      setPasswordError(true);
      return;
    } else if (!isEmailValid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ingresa un correo electrónico válido",
      });
      setEmailError(true);
      return;
    } else if (!isPasswordValid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No ingresaste contraseña valida",
      });
      setPasswordError(true);
      return;
    }
  };

  return (
    <>
      <Box className="row">
        <Box className="containerRight col-12 col-sm-12 col-md-3 col-lg-3">
          <Box className="row login-container">
            <center>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#48160d',
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                Bienvenido
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'medium',
                  color: '#781912',
                  mb: 3,
                  textAlign: 'center'
                }}
              >
                Plataforma de carga de archivos
              </Typography>
            </center>
            <Box className="input-field col-12 col-sm-12 col-md-12 col-lg-12">
              <TextField
                className="input-field"
                label="Correo electrónico"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                }}
                margin="normal"
                error={emailError} // Cambia el borde del TextField si hay un error
                helperText={
                  emailError ? "No ingresaste correo electrónico valido" : ""
                }
              />
            </Box>
            <Box className="col-12 col-sm-12 col-md-12 col-lg-12">
              <TextField
                className="input-field"
                label="Contraseña"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                margin="normal"
                error={passwordError}
                helperText={passwordError ? "No ingresaste contraseña" : ""}
                InputProps={{
                  // Utiliza íconos para mostrar y ocultar la contraseña
                  endAdornment: (
                    <Button onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <Visibility sx={{ color: "red" }} />
                      ) : (
                        <VisibilityOff sx={{ color: "black" }} />
                      )}
                    </Button>
                  ),
                }}
              />
            </Box>
            <Box className="col-12 col-sm-12 col-md-12 col-lg-12">
              <center style={{ marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="btn btn-lg"
                  style={{
                    backgroundColor: '#48160d',
                    color: 'white',
                    border: 'none',
                    '&:hover': {
                      backgroundColor: '#781912'
                    }
                  }}
                >
                  Iniciar sesión
                </button>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    color: '#781912',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#48160d'
                    }
                  }}
                >
                  Olvide mi contraseña
                </Typography>
              </center>
            </Box>
          </Box>
        </Box>
        <Box className="containerleft col-12 col-sm-12 col-md-9 col-lg-9">
          <Box
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <Box className="carousel-inner">
              {images.map((image, index) => (
                <Box
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`Slide ${index}`}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
