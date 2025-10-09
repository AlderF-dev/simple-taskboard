import { useState } from "react";
import { Container, Button, Text, Loader } from "rsuite";
import AddTaskFormModal from "../Components/Modals/AddTaskFormModal";
import TaskColumn from "../Components/TaskColumn/TaskColumn";
import SearchInput from "../Components/Inputs/SearchInput";
import TagPicker from "../Components/Inputs/TagPicker";
import { useGetTask } from "../Hooks/Tasks/useGetTask";
import TaskBoard from "../Components/TaskColumn/TaskBoard";

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Array<string>>([]);
  const { data, isPending } = useGetTask();

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
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Container style={{ flexGrow: 0 }}>
            <Text style={{ marginBottom: 4 }}>Filters</Text>
            <TagPicker value={filters} onChange={setFilters} />
          </Container>
          <SearchInput setSearch={(e) => setSearchQuery(e)} />
        </Container>

        {isPending ? (
          <Loader size="lg" style={{ margin: "auto" }} />
        ) : (
          <>
            {data ? (
              <TaskBoard
                data={data.data}
                searchQuery={searchQuery}
                filters={filters}
              />
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
