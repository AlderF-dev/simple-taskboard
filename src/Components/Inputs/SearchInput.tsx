import { Button, Form } from "rsuite";

function SearchInput({ setSearch }: { setSearch: (value: string) => void }) {
  const handleSubmit = (value) => {
    setSearch(value.title.toLocaleLowerCase());
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "end",
        gap: 12,
      }}
    >
      <Form.Group style={{ marginBottom: 0 }}>
        <Form.ControlLabel>Title</Form.ControlLabel>
        <Form.Control name="title" />
      </Form.Group>
      <Button
        type="submit"
        appearance="primary"
        style={{ height: "max-content" }}
      >
        Search
      </Button>
    </Form>
  );
}

export default SearchInput;
