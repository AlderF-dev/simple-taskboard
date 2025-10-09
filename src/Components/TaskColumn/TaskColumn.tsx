import { Container, Divider, VStack, Heading } from "rsuite";
import TaskColumnItem from "./TaskColumnItem";
import EmptyState from "./EmptyState";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface TaskColumnProps {
  type: "pending" | "completed";
  tasks: Array<TaskData>;
  searchQuery: string;
  filters: Array<string>;
}

const TaskColumn = ({ type, tasks, searchQuery, filters }: TaskColumnProps) => {
  const matchingData = () => {
    return tasks.filter((task) => {
      const matchesCompleted =
        type === "completed" ? task.completed : !task.completed;

      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesTags =
        !filters.length ||
        (task?.tags && [task.tags].flat().some((tag) => filters.includes(tag)));

      return matchesCompleted && matchesSearch && matchesTags;
    });
  };

  const filteredTasks = matchingData();

  return (
    <Container style={{ width: "50%" }}>
      <Heading>{type === "pending" ? "Pending" : "Completed"}</Heading>
      <Divider />

      <SortableContext
        items={filteredTasks.map((task) => `${type}:${task.id}`)}
        strategy={verticalListSortingStrategy}
      >
        <VStack>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskColumnItem
                key={task.id}
                id={`${type}:${task.id}`}
                data={task}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </VStack>
      </SortableContext>
    </Container>
  );
};

export default TaskColumn;
