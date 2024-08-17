import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { IUser } from "../interfaz/IUser";

const EditarPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IUser[]>(null!);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorNewPassword, setErrorNewPassword] = useState(false);

  useEffect(() => {
    if (location.state && location.state.userData) {
      const data = location.state.userData;
      setUserData(data);
    }
  }, [location]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    const passwordRegex = /^(?=.*[A-Z]).{8,16}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "La contraseña debe tener entre 8 y 16 caracteres y al menos una letra mayúscula."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setErrorNewPassword(true);
      return;
    }

    if (passwordError) {
      alert(
        "Por favor, corrige los errores en la contraseña antes de continuar."
      );
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5238/api/Usuario/UpdatePassword`,
        {
          userId: userData[0].userId,
          oldPassword,
          newPassword,
        }
      );
      if (response.status === 200) {
        setSuccessMessage(true);
        // setTimeout(() => {
        //   navigate("/");
        // }, 1500);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(false);
  };

  return (
    <Box>
      <AppBar color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/")}
            aria-label="back"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Actualizar Contraseña
          </Typography>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <TextField
          label="Contraseña anterior"
          type="password"
          variant="outlined"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Nueva contraseña"
          type="password"
          variant="outlined"
          fullWidth
          value={newPassword}
          onChange={handlePasswordChange}
          margin="normal"
          error={!!passwordError}
          helperText={passwordError}
        />
        <TextField
          label="Confirma nueva contraseña"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />

        <Button
          style={{
            width: "100%",
            backgroundColor: "#56a051",
            color: "white",
            marginTop: "20px",
            boxShadow: "3px 3px #999",
          }}
          onClick={handleSave}
        >
          Actualizar
        </Button>
      </Box>

      <Snackbar
        open={successMessage}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Contraseña actualizada correctamente
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorMessage}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          La contraseña anterior no es correcta
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorNewPassword}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Las contraseñas no coinciden
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditarPassword;
