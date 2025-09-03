import { useEffect, useState } from "react";
import { Container, FlexboxGrid, Button, Heading } from "rsuite";
import AddTaskFormModal from "../Components/Modals/AddTaskFormModal";
import { useTaskContext } from "../contexts/TaskContext";
import TaskColumn from "../Components/TaskColumn/TaskColumn";
import TaskColumnItem from "../Components/TaskColumn/TaskColumnItem";

const Dashboard = () => {
  const { tasks } = useTaskContext();
  const [open, setOpen] = useState(false);

  return (
    <Container>
      {/** Content */}
      <Container>
        <Button
          style={{
            width: "max-content",
            marginTop: 12,
            marginBottom: 12,
            alignSelf: "end",
          }}
          appearance="primary"
          onClick={() => setOpen(true)}
        >
          Add Task
        </Button>

        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            ".rs-container": { width: "50%" },
          }}
        >
          <TaskColumn title="Pending">
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <TaskColumnItem key={task.id} data={task} />
              ))}
          </TaskColumn>

          <TaskColumn title="Success">
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <TaskColumnItem key={task.id} data={task} />
              ))}
          </TaskColumn>
        </Container>
      </Container>

      {/** Modals / Drawers */}
      <AddTaskFormModal open={open} handleClose={() => setOpen(false)} />
    </Container>
  );
};

export default Dashboard;
