import { Card, Text, Stack, Dropdown, Heading, IconButton } from "rsuite";
import MoreIcon from "@rsuite/icons/More";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import { useTaskContext } from "../../contexts/TaskContext";
import MinusRoundIcon from "@rsuite/icons/MinusRound";
import { useDispatchToast } from "../../Hooks/useDispatchToast";

const TaskColumnItem = ({ data }) => {
  const { handleChangeTask } = useTaskContext();

  const updateTaskCompleted = (state) => {
    handleChangeTask({
      ...data,
      completed: state,
    });
  };

  return (
    <Card style={data.completed && { background: "#e4ffe4" }}>
      <Card.Header
        as="h5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Stack style={{ gap: 8 }}>
          {data.completed && <CheckOutlineIcon color="green" />}
          {data.name}
        </Stack>

        <Stack style={{ gap: 8 }}>
          {data.completed ? (
            <IconButton
              color="red"
              appearance="primary"
              icon={<MinusRoundIcon />}
              size="sm"
              onClick={() => updateTaskCompleted(false)}
            />
          ) : (
            <IconButton
              color="green"
              appearance="primary"
              icon={<CheckRoundIcon />}
              size="sm"
              onClick={() => updateTaskCompleted(true)}
            />
          )}
          <IconButton icon={<MoreIcon />} size="sm" />
        </Stack>
      </Card.Header>
      <Card.Body>
        <Text style={data.completed && { textDecoration: "line-through" }}>
          {data?.description}
        </Text>
      </Card.Body>
      <Card.Footer>
        <Text muted>Created at: {data.created_at}</Text>
      </Card.Footer>
    </Card>
  );
};

export default TaskColumnItem;
