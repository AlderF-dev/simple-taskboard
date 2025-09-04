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

function App() {
  const [theme, setTheme] = React.useState("light");
  return (
    <CustomProvider theme={theme}>
      <TaskProvider>
        <NiceModal.Provider>
          <Container>
            <Header>
              <Navbar appearance="inverse">
                <Navbar.Brand>Task Board</Navbar.Brand>
                <Nav pullRight>
                  <SelectPicker
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
    </CustomProvider>
  );
}

export default App;
