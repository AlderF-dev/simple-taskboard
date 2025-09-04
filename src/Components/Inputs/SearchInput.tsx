import { Button, Form } from "rsuite";

function SearchInput({ setSearch }: { setSearch: (value: string) => void }) {
  const handleSubmit = (value) => {
    setSearch(value.name.toLocaleLowerCase());
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Form.Group>
        <Form.ControlLabel>Name</Form.ControlLabel>
        <Form.Control name="name" />
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
