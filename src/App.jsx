// css
import "./App.css";
import "rsuite/dist/rsuite.min.css";

// Imports
import * as React from "react";
import ReactDOM from "react-dom";
import { TaskProvider } from "./contexts/TaskContext";
import Dashboard from "./Pages/Dashboard";
import {
  Container,
  Header,
  Content,
  Navbar,
  Nav,
  CustomProvider,
} from "rsuite";

function App() {
  return (
    <CustomProvider>
      <TaskProvider>
        <Container>
          <Header>
            <Navbar appearance="inverse">
              <Navbar.Brand>Task Board</Navbar.Brand>
              <Nav pullRight>
                <Nav.Item>Settings</Nav.Item>
              </Nav>
            </Navbar>
          </Header>
          <Content>
            <Dashboard />
          </Content>
        </Container>
      </TaskProvider>
    </CustomProvider>
  );
}

export default App;
