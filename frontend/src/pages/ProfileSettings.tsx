import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IUser } from "../interfaz/IUser";
import { ChevronRight } from "@mui/icons-material";

const ProfileSetting: React.FC = () => {
  const [userData, setUserData] = useState<IUser[]>(null!);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<IUser>(
          "http://localhost:5238/api/Usuario"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchUserData();
  }, []);

  const handleNavigate = (path: string) => {
    if (userData) {
      navigate(path, { state: { userData } });
    }
  };

  return (
    <Box p={2}>
      <Toolbar>
        <Typography
          style={{ margin: "auto" }}
          variant="h6"
          component="div"
          gutterBottom
        >
          Profile Settings
        </Typography>
      </Toolbar>
      <List>
        <ListItem
          style={{
            border: "1px solid #b4dbff",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          onClick={() => handleNavigate("/name")}
          button
        >
          <ListItemText
            primary="Name"
            secondary={userData?.[0].name == null ? "" : userData?.[0].name}
          />
          <IconButton edge="end" aria-label="edit">
            <ChevronRight />
          </IconButton>
        </ListItem>

        <ListItem
          style={{
            border: "1px solid #b4dbff",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          onClick={() => handleNavigate("/username")}
          button
        >
          <ListItemText
            primary="UserName"
            secondary={
              userData?.[0].userName == null ? "" : userData?.[0].userName
            }
          />
          <IconButton edge="end" aria-label="edit">
            <ChevronRight />
          </IconButton>
        </ListItem>

        <ListItem
          style={{
            border: "1px solid #b4dbff",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <ListItemText
            primary="Email"
            secondary={userData?.[0].email == null ? "" : userData?.[0].email}
          />
          <IconButton edge="end" aria-label="edit"></IconButton>
        </ListItem>

        <ListItem
          style={{
            border: "1px solid #b4dbff",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <ListItemText
            primary="Phone Number"
            secondary={
              userData?.[0].phoneNumber == null ? "" : userData?.[0].phoneNumber
            }
          />
          <IconButton edge="end" aria-label="edit"></IconButton>
        </ListItem>

        <ListItem
          style={{
            border: "1px solid #b4dbff",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          onClick={() => handleNavigate("/password")}
          button
        >
          <ListItemText primary="Change Password" />
          <IconButton edge="end" aria-label="edit">
            <ChevronRight />
          </IconButton>
        </ListItem>
        <br />
        <ListItem
          style={{
            border: "1px solid #b4dbff",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <ListItemText primary="Delete my account and data" />
          <IconButton edge="end" aria-label="edit"></IconButton>
        </ListItem>
        <br />
        <ListItem
          style={{
            border: "1px solid #b4dbff",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <ListItemText
            primary="Notification"
            secondary={userData?.[0].notification ? "Activado" : "Desactivado"}
          />
          <IconButton edge="end" aria-label="edit"></IconButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default ProfileSetting;
