import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { useState } from "react";
import TaskColumn from "./TaskColumn";
import TaskColumnItem from "./TaskColumnItem";
import { useUpdateTask } from "../../Hooks/Tasks/useUpdateTask";

interface TaskBoardProps {
  data: Array<TaskData>;
  searchQuery: string;
  filters: Array<string>;
}

const TaskBoard = ({ data, searchQuery, filters }: TaskBoardProps) => {
  const { mutate, isPending } = useUpdateTask();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const isCompleted = over.id.toString().includes("completed");

    const taskID = active.id.toString().split(":")[1];

    if (active.id !== over.id) {
      mutate({ id: taskID, task: { completed: isCompleted } });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div
        style={{ display: "flex", gap: "1rem", opacity: isPending ? 0.5 : 1 }}
      >
        <TaskColumn
          type="pending"
          tasks={data}
          searchQuery={searchQuery}
          filters={filters}
        />
        <TaskColumn
          type="completed"
          tasks={data}
          searchQuery={searchQuery}
          filters={filters}
        />
      </div>
    </DndContext>
  );
};

export default TaskBoard;
