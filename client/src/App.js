import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login-signup/Login";
import Signup from "./pages/login-signup/Signup";
import { Auth } from "./contexts/Auth";
import React, { useContext, useEffect, useState } from "react";
import { MyProSidebarProvider } from "./components/sidebar/sidebarContext";
import Topbar from "./components/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./pages/Dashbord";

function App() {
  const { user } = useContext(Auth);
  const [theme1, setTheme1] = useState("dark");
  useEffect(() => {
    document.body.className = theme1;
  }, [theme1]);

  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
      <>
        <div style={{ height: "100%", width: "100%" }}>
          {!user && <Navbar theme1={theme1} setTheme1={setTheme1} />}
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route>
                  <Route
                    path="/"
                    element={!user ? <Home /> : <Navigate to="/" />}
                  />{" "}
                  <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/dashboard" />}
                  />
                  <Route
                    path="/signup"
                    element={!user ? <Signup /> : <Navigate to="/dashboard" />}
                  />
                </Route>
                <Route>
                  <Route
                    path="/dashboard"
                    element={user ?
                      <MyProSidebarProvider>
                        <div>
                          <Topbar className="h-100 w-100" />
                          <Dashboard />
                        </div>
                      </MyProSidebarProvider> : <Navigate to="/login"/>
                    }
                  />
                </Route>
              </Routes>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
