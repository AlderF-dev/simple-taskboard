import { Card, Text } from "rsuite";

const EmptyState = () => {
  return (
    <Card>
      <Card.Body>
        <Text as="h6" align="center">
          No Tasks found
        </Text>
      </Card.Body>
    </Card>
  );
};

export default EmptyState;
