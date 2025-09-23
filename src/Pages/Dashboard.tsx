import { useEffect, useState } from "react";
import { Container, Button, Text, Loader } from "rsuite";
import AddTaskFormModal from "../Components/Modals/AddTaskFormModal";
import { useTaskContext } from "../contexts/TaskContext";
import TaskColumn from "../Components/TaskColumn/TaskColumn";
import SearchInput from "../Components/Inputs/SearchInput";
import TagPicker from "../Components/Inputs/TagPicker";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetTask } from "../Hooks/Tasks/useGetTask";

const Dashboard = () => {
  const { tasks } = useTaskContext();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const { data, isPending } = useGetTask();
  const queryClient = useQueryClient();

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
        <Button
          style={{
            width: "max-content",
            marginTop: 12,
            marginBottom: 12,
            alignSelf: "end",
          }}
          appearance="primary"
          onClick={() => queryClient.refetchQueries({ queryKey: ["tasks"] })}
        >
          Add Task
        </Button>

        <SearchInput setSearch={(e) => setSearchQuery(e)} />

        <Container style={{ marginBottom: 16 }}>
          <Text>Filters</Text>
          <TagPicker onSelect={(e) => setFilters(e)} />
        </Container>

        {isPending ? (
          <Loader size="lg" style={{ margin: "auto" }} />
        ) : (
          <>
            {data ? (
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
                  tasks={data.data}
                  searchQuery={searchQuery}
                  filters={filters}
                />
                <TaskColumn
                  type="completed"
                  tasks={data.data}
                  searchQuery={searchQuery}
                  filters={filters}
                />
              </Container>
            ) : (
              <Text style={{ margin: "auto" }}>No Data</Text>
            )}
          </>
        )}
      </Container>

      {/** Modals / Drawers */}
      <AddTaskFormModal open={open} handleClose={() => setOpen(false)} />
    </Container>
  );
};

export default Dashboard;
