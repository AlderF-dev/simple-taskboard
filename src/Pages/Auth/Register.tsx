import React, { useState } from "react";
import {
  Container,
  Button,
  Text,
  Loader,
  Form,
  Card,
  Heading,
  Schema,
} from "rsuite";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const { StringType } = Schema.Types;

const passwordInput = React.forwardRef((props, ref) => (
  <PasswordInput required {...props} ref={ref} />
));

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const model = Schema.Model({
    name: StringType().isRequired("Name is required"),
    email: StringType()
      .isEmail("Please enter a valid email")
      .isRequired("Email is required"),
    password: StringType()
      .minLength(6, "Password must be at least 6 characters")
      .isRequired("Password is required"),
    password_confirmation: StringType()
      .addRule((value, data) => {
        if (value !== data.password) {
          return false;
        }
        return true;
      }, "Passwords do not match")
      .isRequired("Please confirm your password"),
  });

  const handleSubmit = (credentials) => {
    if (credentials.password !== credentials.password_confirmation) return;

    register(
      credentials.name,
      credentials.email,
      credentials.password,
      credentials.password_confirmation
    );
  };

  return (
    <Container style={{ height: "100%", marginTop: "5rem" }}>
      <Card width={335} shaded style={{ margin: "auto" }}>
        <Card.Header>
          <Heading level={4}>Register</Heading>
        </Card.Header>
        <Form
          fluid
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          onSubmit={handleSubmit}
        >
          <Card.Body>
            <Form.Group>
              <Form.ControlLabel>Name</Form.ControlLabel>
              <Form.Control name="name" required />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" required />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control name="password" required accepter={passwordInput} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Confirm Password</Form.ControlLabel>
              <Form.Control
                name="password_confirmation"
                required
                accepter={passwordInput}
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer
            style={{ justifyContent: "center", flexDirection: "column" }}
          >
            <Button appearance="primary" type="submit" loading={loading}>
              Register
            </Button>
            <Button onClick={() => navigate("/login")} disabled={loading}>
              Login
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
