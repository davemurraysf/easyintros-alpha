import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/topbar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import SettingsPage from "./scenes/settings";
import { getUserData, clearUserData } from "./data/auth";
import { clearUserInfo } from "./data/userinfo";
import { clearUserTasks } from "./data/userTasks";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux'; // Import Provider
import store from './data/store'; // Import your Redux store

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, colorMode] = useMode();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if the user is already authenticated
      const userData = getUserData();
      if (userData) {
        setIsAuthenticated(true);
        console.log("User Data after login:", userData);
      }
    };

    checkAuthentication();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    clearUserData();
    clearUserInfo();        // Clear user data from Local Storage
    clearUserTasks();
    setIsAuthenticated(false); // Update state to reflect the user is logged out
  };

  if (!isAuthenticated) {
    return (
      <Provider store={store}> {/* Wrap your entire application with Provider */}
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Login onLoginSuccess={handleLoginSuccess} />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Provider>
    );
  }

  return (
    <Provider store={store}> {/* Wrap your entire application with Provider */}
      <DndProvider backend={HTML5Backend}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <main className="content">
                <Topbar onLogout={handleLogout} />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </DndProvider>
    </Provider>
  );
}

export default App;

