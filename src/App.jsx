// css
import "./App.css";
import "rsuite/dist/rsuite.min.css";

// Imports
import * as React from "react";
import { TaskProvider } from "./contexts/TaskContext";
import {
  Container,
  Header,
  Content,
  Navbar,
  Nav,
  CustomProvider,
  IconButton,
  SelectPicker,
  Button,
} from "rsuite";
import NiceModal from "@ebay/nice-modal-react";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./Pages/Auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LogoutButton from "./Components/Auth/LogoutButton";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import RedirectRoot from "./Components/Auth/RedirectRoot";

function App() {
  const [theme, setTheme] = React.useState("light");

  // Create a client
  const queryClient = new QueryClient();

  return (
    <CustomProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TaskProvider>
            <NiceModal.Provider>
              <Container style={{ background: "#f9f9f9" }}>
                <Header>
                  <Navbar appearance="inverse">
                    <Navbar.Brand>Task Board</Navbar.Brand>
                    <Nav pullRight style={{ display: "flex", gap: 12 }}>
                      <SelectPicker
                        id="theme-picker"
                        searchable={false}
                        cleanable={false}
                        value={theme}
                        onSelect={(e) => setTheme(e)}
                        data={[
                          { label: "Light Mode", value: "light" },
                          { label: "Dark", value: "dark" },
                          { label: "High Contrast", value: "high-contrast" },
                        ]}
                      />
                      <LogoutButton />
                    </Nav>
                  </Navbar>
                </Header>

                {/** Routes */}
                <Content style={{ paddingBottom: 12 }}>
                  <Routes>
                    <Route path="/" element={<RedirectRoot />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/register" element={<Register />} /> */}

                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </Content>
              </Container>
            </NiceModal.Provider>
          </TaskProvider>

          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </CustomProvider>
  );
}

export default App;
