import React, { useState } from "react";
import { Container, Button, Text, Loader, Form, Card, Heading } from "rsuite";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const handleSubmit = (credentials) => {
    login(credentials.email, credentials.password);
  };

  const passwordInput = React.forwardRef((props, ref) => (
    <PasswordInput required {...props} ref={ref} />
  ));

  return (
    <Container style={{ height: "100%", marginTop: "5rem" }}>
      <Card width={335} shaded style={{ margin: "auto" }}>
        <Card.Header>
          <Heading level={4}>Login</Heading>
        </Card.Header>
        <Form onSubmit={handleSubmit}>
          <Card.Body>
            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" required />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control name="password" required accepter={passwordInput} />
            </Form.Group>
          </Card.Body>
          <Card.Footer
            style={{ justifyContent: "center", flexDirection: "column" }}
          >
            <Button appearance="primary" type="submit">
              Login
            </Button>
            <Button type="submit">Register</Button>
          </Card.Footer>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
