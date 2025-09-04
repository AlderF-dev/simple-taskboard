import { Card, Placeholder } from "rsuite";

const TaskPlaceholder = () => {
  return (
    <Card>
      <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
        <Placeholder.Paragraph rows={1} active style={{ width: "40%" }} />
      </Card.Header>
      <Card.Body>
        <Placeholder.Paragraph active rows={2} />
      </Card.Body>
      <Card.Footer>
        <Placeholder.Paragraph active rows={1} style={{ width: "25%" }} />
      </Card.Footer>
    </Card>
  );
};

export default TaskPlaceholder;
