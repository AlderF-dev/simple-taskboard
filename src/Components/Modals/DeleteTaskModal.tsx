import { Button, Modal, Form, Input, Text } from "rsuite";
import { useTaskContext } from "../../contexts/TaskContext";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

const DeleteTaskModal = NiceModal.create(({ taskId }: { taskId: string }) => {
  const modal = useModal();
  const { handleDeleteTask } = useTaskContext();

  const handleDelete = () => {
    handleDeleteTask(taskId);
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
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Text>Are you sure you want to delete?</Text>
      </Modal.Body>
      <Modal.Footer
        style={{ justifyContent: "space-between", display: "flex" }}
      >
        <Button onClick={modal.hide}>Cancel</Button>
        <Button appearance="primary" color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteTaskModal;
