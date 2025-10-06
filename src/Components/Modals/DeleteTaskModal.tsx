import { Button, Modal, Text } from "rsuite";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useDeleteTask } from "../../Hooks/Tasks/useDeleteTask";

const DeleteTaskModal = NiceModal.create(({ taskId }: { taskId: string }) => {
  const { visible, hide, remove } = useModal();
  const { mutate, isPending, isSuccess } = useDeleteTask();

  const handleDelete = () => {
    mutate(taskId);

    hide();
  };

  return (
    <Modal open={visible} onClose={hide} onExited={remove} backdrop="static">
      <Modal.Header>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Text>Are you sure you want to delete?</Text>
      </Modal.Body>
      <Modal.Footer
        style={{ justifyContent: "space-between", display: "flex" }}
      >
        <Button onClick={hide}>Cancel</Button>
        <Button
          appearance="primary"
          color="red"
          onClick={handleDelete}
          loading={isPending}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteTaskModal;
