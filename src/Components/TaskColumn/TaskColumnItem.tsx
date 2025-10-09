import { Card, Text, Stack, IconButton, Tag, TagGroup } from "rsuite";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import MinusRoundIcon from "@rsuite/icons/MinusRound";
import EditRoundIcon from "@rsuite/icons/EditRound";
import WarningRoundIcon from "@rsuite/icons/WarningRound";
import CustomTooltip from "../Tooltip";
import DeleteTaskModal from "../Modals/DeleteTaskModal";
import NiceModal from "@ebay/nice-modal-react";
import EditTaskFormModal from "../Modals/EditTaskFormModal";
import { useUpdateTask } from "../../Hooks/Tasks/useUpdateTask";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MenuIcon from "@rsuite/icons/Menu";

const TaskColumnItem = ({ id, data }: { id: string; data: TaskData }) => {
  const { mutate, isPending } = useUpdateTask();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const updateTaskCompleted = (state) => {
    mutate({ id: data.id, task: { completed: state } });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    width: "100%",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card style={data.completed ? { background: "#e4ffe4" } : undefined}>
        <Card.Header
          as="h5"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            {...attributes}
            {...listeners}
            style={{
              cursor: "grab",
              paddingRight: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <MenuIcon />
          </div>

          <Stack style={{ gap: 8 }}>
            {data.completed && <CheckOutlineIcon color="green" />}
            {data.title}
          </Stack>

          <Stack style={{ gap: 8 }}>
            {data.completed ? (
              <CustomTooltip placement="top" message="Mark as uncomplete">
                <IconButton
                  color="red"
                  appearance="primary"
                  icon={<MinusRoundIcon />}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTaskCompleted(false);
                  }}
                  loading={isPending}
                />
              </CustomTooltip>
            ) : (
              <CustomTooltip placement="top" message="Mark as complete">
                <IconButton
                  color="green"
                  appearance="primary"
                  icon={<CheckRoundIcon />}
                  size="sm"
                  loading={isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTaskCompleted(true);
                  }}
                />
              </CustomTooltip>
            )}

            <CustomTooltip placement="top" message="Edit">
              <IconButton
                appearance="primary"
                icon={<EditRoundIcon />}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  NiceModal.show(EditTaskFormModal, { data });
                }}
              />
            </CustomTooltip>

            <CustomTooltip placement="top" message="Delete">
              <IconButton
                appearance="primary"
                color="red"
                icon={<WarningRoundIcon />}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  NiceModal.show(DeleteTaskModal, { taskId: data.id });
                }}
              />
            </CustomTooltip>
          </Stack>
        </Card.Header>

        <Card.Body>
          <Text
            style={data.completed ? { textDecoration: "line-through" } : {}}
          >
            {data?.description}
          </Text>

          {data?.tags && data.tags.length > 0 && (
            <TagGroup style={{ marginTop: 4 }}>
              {Object.entries(data.tags).map(([index, item]) => (
                <Tag
                  key={index}
                  style={{ background: data.completed ? "#CBFFDB" : "" }}
                >
                  {item}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Card.Body>

        <Card.Footer>
          <Text muted>Created at: {data.created_at}</Text>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default TaskColumnItem;
