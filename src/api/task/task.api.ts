import axiosInstance from "@/axios/axios-instance";

export const getTasksApi = async (page: number = 0, limit: number = 15) => {
  const response = await axiosInstance.get("/task/all", {
    params: { page, limit },
  });
  return response.data;
};

export const addTaskApi = async (data: {
  title: string;
  description?: string;
  dueDate: string;
  dueTime: string;
}) => {
  const response = await axiosInstance.post("/task/add", data);
  return response.data;
};

export const updateTaskApi = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    dueDate?: string;
    dueTime?: string;
  },
) => {
  const response = await axiosInstance.put(`/task/update/${id}`, data);
  return response.data;
};

export const updateTaskStatusApi = async (
  id: string,
  status: "IN_PROGRESS" | "COMPLETED",
) => {
  const response = await axiosInstance.patch(`/task/status/${id}`, {
    status,
  });
  return response.data;
};

export const deleteTaskApi = async (id: string) => {
  const response = await axiosInstance.delete(`/task/delete/${id}`);
  return response.data;
};
