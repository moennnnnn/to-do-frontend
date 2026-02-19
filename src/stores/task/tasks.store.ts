import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  getTasksApi,
  addTaskApi,
  updateTaskApi,
  updateTaskStatusApi,
  deleteTaskApi,
} from "@/api/task/task.api";

import type { TaskStoreType, TaskType } from "@/types/task/task.type";

import { showError } from "@/utils/error/error.util";
import toast from "react-hot-toast";

export const useTaskStore = create(
  persist<TaskStoreType>(
    (set) => ({
      tasks: [],
      loading: false,
      getLoading: false,
      initialLoading: false,
      loadMoreLoading: false,
      actionLoading: false,
      error: null,

      getTasks: async () => {
        set({ getLoading: true, error: null });
        try {
          const response = await getTasksApi();
          set({ tasks: response.tasks || [] });
        } catch (error) {
          showError(error);
          set({ error: "Failed to fetch tasks" });
        } finally {
          set({ getLoading: false });
        }
      },

      loadMoreTasks: async () => {
        // implement later
        return false;
      },

      resetPagination: () => {
        // implement later
      },

      addTask: async (data: {
        title: string;
        description?: string;
        dueDate: string;
        dueTime: string;
      }) => {
        set({ actionLoading: true, error: null });
        try {
          const response = await addTaskApi(data);
          const newTask: TaskType = response.newTask;

          set((prev) => ({
            tasks: [newTask, ...prev.tasks],
          }));

          toast.success(response.message);
          return true;
        } catch (error) {
          showError(error);
          set({ error: "Failed to add task" });
          return false;
        } finally {
          set({ actionLoading: false });
        }
      },

      updateTask: async (id, data) => {
        set({ actionLoading: true, error: null });
        try {
          const response = await updateTaskApi(id, data);
          const updated: TaskType = response.updatedTask ?? response.task;

          set((prev) => ({
            tasks: prev.tasks.map((t) => (t._id === id ? updated : t)),
          }));

          toast.success(response.message);
          return true;
        } catch (error) {
          showError(error);
          set({ error: "Failed to update task" });
          return false;
        } finally {
          set({ actionLoading: false });
        }
      },

      markTaskCompleted: async (id: string) => {
        set({ actionLoading: true, error: null });
        try {
          const response = await updateTaskStatusApi(id, "COMPLETED");
          const updated: TaskType = response.updatedTask ?? response.task;

          set((prev) => ({
            tasks: prev.tasks.map((t) => (t._id === id ? updated : t)),
          }));

          return true;
        } catch (error) {
          showError(error);
          set({ error: "Failed to update task status" });
          return false;
        } finally {
          set({ actionLoading: false });
        }
      },

      deleteTask: async (id) => {
        set({ actionLoading: true, error: null });
        try {
          const response = await deleteTaskApi(id);

          set((prev) => ({
            tasks: prev.tasks.filter((t) => t._id !== id),
          }));

          toast.success(response.message);
          return true;
        } catch (error) {
          showError(error);
          set({ error: "Failed to delete task" });
          return false;
        } finally {
          set({ actionLoading: false });
        }
      },
    }),
    {
      name: "task-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
