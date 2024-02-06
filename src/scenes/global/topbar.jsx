import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const Topbar = ({ onLogout }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const location = useLocation(); // React Router's location

  // Define a function to determine the selected status based on the current path
  const isSelected = (path) => {
    return location.pathname === path;
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{
        // Add your custom styles here
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <IconButton>
          <HomeOutlinedIcon />
        </IconButton>
      </Link>
      <Link to="/settings" style={{ textDecoration: "none", color: "inherit" }}>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
      </Link>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
      <IconButton>
        <NotificationsOutlinedIcon />
      </IconButton>
      <IconButton onClick={onLogout}>
        <PersonOutlinedIcon />
      </IconButton>
      
    </Box>
  );
};

export default Topbar;
