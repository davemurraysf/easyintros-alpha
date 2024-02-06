import React, { useState, useContext } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Popover,
  MenuItem,
  Typography,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Topbar = ({ onLogout }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const location = useLocation(); // React Router's location

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
      <IconButton onClick={handleMenuOpen}>
        <MenuOutlinedIcon />
      </IconButton>
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
      <IconButton >
        <SettingsOutlinedIcon />
      </IconButton>
      <IconButton onClick={onLogout}>
        <PersonOutlinedIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem selected={isSelected("/")}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <HomeOutlinedIcon />
              <span style={{ marginLeft: "8px" }}>Dashboard</span>
            </div>
          </MenuItem>
        </Link>
        <Link to="/settings" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem selected={isSelected("/settings")}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <HelpOutlineOutlinedIcon />
              <span style={{ marginLeft: "8px" }}>Settings</span>
            </div>
          </MenuItem>
        </Link>
      </Popover>
    </Box>
  );
};

export default Topbar;
