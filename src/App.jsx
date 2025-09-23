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
} from "rsuite";
import NiceModal from "@ebay/nice-modal-react";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [theme, setTheme] = React.useState("light");

  // Create a client
  const queryClient = new QueryClient();

  return (
    <CustomProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <TaskProvider>
          <NiceModal.Provider>
            <Container>
              <Header>
                <Navbar appearance="inverse">
                  <Navbar.Brand>Task Board</Navbar.Brand>
                  <Nav pullRight>
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
                  </Nav>
                </Navbar>
              </Header>
              <Content>
                <Dashboard />
              </Content>
            </Container>
          </NiceModal.Provider>
        </TaskProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CustomProvider>
  );
}

export default App;
