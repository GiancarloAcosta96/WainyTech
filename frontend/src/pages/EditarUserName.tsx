import React, { useState, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { IUser } from "../interfaz/IUser";

const EditarUserName: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IUser[]>(null!);
  const [userName, setUserName] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (location.state && location.state.userData) {
      const data = location.state.userData;
      setUserData(data);
      setUserName(data[0].userName);
    }
  }, [location]);

  const handleSave = async () => {
    if (!userData) return;

    try {
      const response = await axios.put(
        "http://localhost:5238/api/Usuario/UpdateUsuario",
        {
          userId: userData[0].userId,
          name: userData[0].name,
          userName,
        }
      );
      if (response.status === 204) {
        setSuccessMessage(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error, inténtalo nuevamente");
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
            Actualizar Username
          </Typography>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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
          UserName actualizado correctamente
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditarUserName;
