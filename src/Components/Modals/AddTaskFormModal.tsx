import { Button, Modal, Form, Input } from "rsuite";
import { useTaskContext } from "../../contexts/TaskContext";
import { useDispatchToast } from "../../Hooks/useDispatchToast";
import React from "react";
import TagPicker from "../Inputs/TagPicker";

function AddTaskFormModal({ open, handleClose }) {
  const { handleAddTask } = useTaskContext();
  const dispatchToast = useDispatchToast();

  const handleSubmit = (newTask) => {
    try {
      // Add task to context
      handleAddTask(newTask);

      // Fire Toast
      dispatchToast("success", "Successfully created task");

      // Close Modal
      handleClose();
    } catch {
      // Fire Toast
      dispatchToast("error", "Something went wrong! Try again!");
    }
  };

  const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
  ));
  const tagPicker = React.forwardRef((props, ref) => (
    <TagPicker
      creatable
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
            <Form.ControlLabel>Name</Form.ControlLabel>
            <Form.Control name="name" required />
            <Form.HelpText>Name is required</Form.HelpText>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control name="description" rows={5} accepter={Textarea} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Tags</Form.ControlLabel>
            <Form.Control name="tags" accepter={tagPicker} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button type="submit" appearance="primary">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddTaskFormModal;
