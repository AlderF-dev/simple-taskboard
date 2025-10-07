type TaskData = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  completed: boolean;
  tags: Array<Tag>;
};

type Tag = {
  id: string;
  label: string;
};

type TaskStatus = "pending" | "completed";
