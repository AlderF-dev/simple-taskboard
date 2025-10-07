import { Container, Divider, VStack, Heading } from "rsuite";
import TaskColumnItem from "./TaskColumnItem";
import EmptyState from "./EmptyState";

const TaskColumn = ({
  type = "pending",
  tasks,
  searchQuery,
  filters,
}: {
  type: TaskStatus;
  tasks: Array<TaskData>;
  searchQuery: string;
  filters: Array<string>;
}) => {
  const matchingData = () => {
    return tasks.filter((task) => {
      const matchesCompleted =
        type === "completed" ? task.completed : !task.completed;

      // const matchesSearch = task.name
      //   .toLowerCase()
      //   .includes(searchQuery.toLowerCase());

      // const matchesTags =
      //   !filters.length ||
      //   (task?.tags && [task.tags].flat().some((tag) => filters.includes(tag)));

      return matchesCompleted;
    });
  };

  return (
    <Container style={{ width: "50%" }}>
      <Heading>{type === "pending" ? "Pending" : "Completed"}</Heading>
      <Divider />
      <VStack>
        {matchingData().length > 0 ? (
          <>
            {matchingData().map((task) => (
              <TaskColumnItem key={task.id} data={task} />
            ))}
          </>
        ) : (
          <EmptyState />
        )}
      </VStack>
    </Container>
  );
};

export default TaskColumn;
