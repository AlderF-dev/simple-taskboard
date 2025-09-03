import { Container, Divider, VStack, Heading } from "rsuite";

const TaskColumn = ({ title, children }) => {
  return (
    <Container style={{ width: "50%" }}>
      <Heading>{title}</Heading>
      <Divider />
      <VStack>{children}</VStack>
    </Container>
  );
};

export default TaskColumn;
