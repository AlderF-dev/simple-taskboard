import { Button, Modal, Form, Input } from "rsuite";
import React from "react";
import TagPicker from "../Inputs/TagPicker";
import { useCreateTask } from "../../Hooks/Tasks/useCreateTask";

function AddTaskFormModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const { mutate, isPending, isSuccess } = useCreateTask();

  const handleSubmit = (newTask: {
    name: string;
    description: string;
    tags: Array<string>;
  }) => {
    mutate(newTask);

    handleClose();
  };

  const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
  ));

  const tagPicker = React.forwardRef((props, ref) => (
    <TagPicker
      creatable
      required
      {...props}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      ref={ref}
    />
  ));

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.ControlLabel>Title</Form.ControlLabel>
            <Form.Control name="title" required />
            <Form.HelpText>Title is required</Form.HelpText>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control name="description" rows={5} accepter={Textarea} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Tags</Form.ControlLabel>
            <Form.Control name="tags" accepter={tagPicker} />
            <Form.HelpText>Tags are case-sensitive</Form.HelpText>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer
          style={{
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Button onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" appearance="primary" loading={isPending}>
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddTaskFormModal;
