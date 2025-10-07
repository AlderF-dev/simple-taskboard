import { Button, Modal, Form, Input } from "rsuite";
import { useTaskContext } from "../../contexts/TaskContext";
import { useDispatchToast } from "../../Hooks/useDispatchToast";
import React, { useEffect } from "react";
import TagPicker from "../Inputs/TagPicker";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useUpdateTask } from "../../Hooks/Tasks/useUpdateTask";

const EditTaskFormModal = NiceModal.create(({ data }: { data: TaskData }) => {
  const modal = useModal();
  const [formValue, setFormValue] = React.useState(data);
  const updateTask = useUpdateTask();

  useEffect(() => {
    const tagArray = formValue.tags.map((item) => {
      return item.label;
    });

    setFormValue({ ...formValue, tags: tagArray });
  }, []);

  const handleSubmit = (newData) => {
    updateTask.mutate({ id: data.id, task: newData });
    modal.hide();
  };

  const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} rows={5} />
  ));

  const tagPicker = React.forwardRef((props, ref) => (
    <TagPicker
      creatable
      required
      value={formValue.tags}
      {...props}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      ref={ref}
    />
  ));

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
        onChange={(formValue) => setFormValue(formValue)}
      >
        <Modal.Body>
          <Form.Group>
            <Form.ControlLabel>Title</Form.ControlLabel>
            <Form.Control name="title" required />
            <Form.HelpText>Name is required</Form.HelpText>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control
              key={"textarea"}
              name="description"
              accepter={Textarea}
            />
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
