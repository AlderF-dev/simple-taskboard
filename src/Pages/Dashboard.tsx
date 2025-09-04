import { useState } from "react";
import { Container, Button, Text } from "rsuite";
import AddTaskFormModal from "../Components/Modals/AddTaskFormModal";
import { useTaskContext } from "../contexts/TaskContext";
import TaskColumn from "../Components/TaskColumn/TaskColumn";
import SearchInput from "../Components/Inputs/SearchInput";
import TagPicker from "../Components/Inputs/TagPicker";

const Dashboard = () => {
  const { tasks } = useTaskContext();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState([]);

  // const { filtered, setSearchQuery, setFilters } = useTaskFilter(tasks);

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

        <SearchInput setSearch={(e) => setSearchQuery(e)} />

        <Container style={{ marginBottom: 16 }}>
          <Text>Filters</Text>
          <TagPicker onSelect={(e) => setFilters(e)} />
        </Container>

        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            ".rs-container": { width: "50%" },
          }}
        >
          <TaskColumn
            type="pending"
            tasks={tasks}
            searchQuery={searchQuery}
            filters={filters}
          />
          <TaskColumn
            type="completed"
            tasks={tasks}
            searchQuery={searchQuery}
            filters={filters}
          />
        </Container>
      </Container>

      {/** Modals / Drawers */}
      <AddTaskFormModal open={open} handleClose={() => setOpen(false)} />
    </Container>
  );
};

export default Dashboard;
