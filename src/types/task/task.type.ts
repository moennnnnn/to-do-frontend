export type TaskStatus = "IN_PROGRESS" | "COMPLETED";

export type TaskType = {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: string;
  dueTime: string;
  createdAt: string;
  completedAt?: string | null;
};

export type TaskStoreType = {
  tasks: TaskType[];

  loading: boolean;
  getLoading: boolean;
  initialLoading: boolean;
  loadMoreLoading: boolean;
  actionLoading: boolean;
  error: string | null;

  getTasks: () => Promise<void>;
  loadMoreTasks: () => Promise<boolean>;
  resetPagination: () => void;

  addTask: (data: {
    title: string;
    description?: string;
    dueDate: string;
    dueTime: string;
  }) => Promise<boolean>;

  updateTask: (
    _id: string,
    data: {
      title?: string;
      description?: string;
      dueDate?: string;
      dueTime?: string;
    },
  ) => Promise<boolean>;

  markTaskCompleted: (id: string) => Promise<boolean>;
  deleteTask: (id: string) => Promise<boolean>;
};
