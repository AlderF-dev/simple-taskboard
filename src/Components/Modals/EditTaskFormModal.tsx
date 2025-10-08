import { Button, Modal, Form, Input } from "rsuite";
import { useTaskContext } from "../../contexts/TaskContext";
import { useDispatchToast } from "../../Hooks/useDispatchToast";
import React, { useEffect } from "react";
import TagPicker from "../Inputs/TagPicker";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useUpdateTask } from "../../Hooks/Tasks/useUpdateTask";

const Textarea = React.memo(
  React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />)
);
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

const EditTaskFormModal = NiceModal.create(({ data }: { data: TaskData }) => {
  const modal = useModal();
  const [formValue, setFormValue] = React.useState(data);
  const updateTask = useUpdateTask();

  const handleSubmit = (newData) => {
    updateTask.mutate({ id: data.id, task: newData });
    modal.hide();
  };

  return (
    <Modal
      open={modal.visible}
      onClose={modal.hide}
      onExited={modal.remove}
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}
        formValue={formValue}
        onChange={(value) => setFormValue((prev) => ({ ...prev, ...value }))}
      >
        <Modal.Body>
          <Form.Group>
            <Form.ControlLabel>Title</Form.ControlLabel>
            <Form.Control name="title" required />
            <Form.HelpText>Name is required</Form.HelpText>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control name="description" accepter={Textarea} rows={5} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Tags</Form.ControlLabel>
            <Form.Control name="tags" accepter={tagPicker} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <Button onClick={modal.hide}>Cancel</Button>
          <Button type="submit" appearance="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
});

export default EditTaskFormModal;
