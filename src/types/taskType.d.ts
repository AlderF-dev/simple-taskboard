type taskData = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  completed: boolean;
  tags: Array<string>;
};

type taskStatus = "pending" | "completed";
