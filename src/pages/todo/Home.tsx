import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppName from "@/assets/AppName.png";
import { FiPlus, FiEdit, FiX } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useTaskStore } from "@/stores/task/tasks.store";
import type { TaskType } from "@/types/task/task.type";
import { useAccountStore } from "@/stores/account/account.store";
import { FaUserCircle } from "react-icons/fa";

type Status = "IN_PROGRESS" | "COMPLETED";
type Filter = "ALL" | Status;

export default function Home() {
  const {
    tasks,
    getTasks,
    addTask,
    updateTask,
    markTaskCompleted,
    deleteTask,
  } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const { account, getAccount } = useAccountStore();

  useEffect(() => {
    if (!account) getAccount();
  }, [account, getAccount]);

  const navigate = useNavigate();

  const [filter, setFilter] = useState<Filter>("ALL");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredTasks =
    filter === "ALL" ? tasks : tasks.filter((t) => t.status === filter);

  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentTask({
      _id: "",
      title: "",
      description: "",
      status: "IN_PROGRESS",
      dueDate: "",
      dueTime: "",
      createdAt: new Date().toISOString(),
    });
    setIsTaskModalOpen(true);
  };

  const openEditModal = (task: TaskType) => {
    setIsEditMode(true);
    setCurrentTask(task);
    setIsTaskModalOpen(true);
  };

  const saveTask = async () => {
    if (!currentTask) return;

    if (isEditMode) {
      await updateTask(currentTask._id, {
        title: currentTask.title,
        description: currentTask.description,
        dueDate: currentTask.dueDate,
        dueTime: currentTask.dueTime,
      });
    } else {
      await addTask({
        title: currentTask.title,
        description: currentTask.description,
        dueDate: currentTask.dueDate,
        dueTime: currentTask.dueTime,
      });
    }

    setIsTaskModalOpen(false);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const markCompleted = async (id: string) => {
    await markTaskCompleted(id);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;

    await deleteTask(taskToDelete);
    setIsDeleteModalOpen(false);
  };

  const handleLogout = () => {
    toast.success("Logged out.");
    navigate("/login");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen px-4 py-6 font-[Lexend] bg-linear-to-br from-[#7fb2e5] via-[#4f87c2] to-[#2b6cb0] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 flex justify-between items-center relative">
        <img src={AppName} alt="logo" className="w-20" />

        <div className="text-center ml-20">
          <p className="text-sm text-gray-500">Welcome!</p>
          <p className="font-semibold text-2xl">
            {account ? `${account.firstName} ${account.lastName}` : "..."}
          </p>{" "}
        </div>

        <div className="relative" ref={dropdownRef}>
          <FaUserCircle
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-[#1C4D8D] text-4xl cursor-pointer"
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg text-sm">
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mt-6">
        {["ALL", "IN_PROGRESS", "COMPLETED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as Filter)}
            className={`px-4 py-2 rounded-md text-sm shadow
              ${filter === f ? "bg-[#1C4D8D] text-white" : "bg-white text-[#1C4D8D]"}`}
          >
            {f === "ALL"
              ? "All Tasks"
              : f === "IN_PROGRESS"
                ? "In progress"
                : "Completed"}
          </button>
        ))}
      </div>

      {/* Add Task */}
      <div className="flex justify-end mt-4">
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#1C4D8D] text-white px-4 py-2 rounded-md shadow"
        >
          <FiPlus />
          Add task
        </button>
      </div>

      {/* Task List */}
      <div className="mt-6 flex-1 overflow-y-auto space-y-4 pr-2">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-xl p-4 shadow relative"
          >
            <div className="flex items-center gap-2 mt-1 mb-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  task.status === "IN_PROGRESS"
                    ? "bg-yellow-100 text-yellow-700"
                    : " bg-green-100 text-green-500"
                }`}
              >
                {task.status === "IN_PROGRESS" ? "In Progress" : "Completed"}
              </span>
            </div>
            {task.status !== "COMPLETED" && (
              <FiEdit
                onClick={() => openEditModal(task)}
                className="absolute top-3 right-3 text-gray-600 cursor-pointer"
              />
            )}

            <p className="font-semibold">{task.title}</p>

            <div className="bg-[#2f5f9f] text-white rounded-lg p-3 mt-2 text-sm">
              {task.description}
            </div>

            <div className="text-xs text-gray-500 mt-2">
              Created: {formatDateTime(task.createdAt)}
            </div>

            <div className="text-xs text-gray-500">
              Due:{" "}
              {task.dueDate
                ? `${formatDateTime(task.dueDate)} ${task.dueTime || ""}`
                : "No date"}
            </div>

            {task.status === "COMPLETED" && task.completedAt && (
              <div className="text-xs text-green-600 mt-1">
                Completed at {formatDateTime(task.completedAt)}
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <RiDeleteBin6Line
                onClick={() => {
                  setTaskToDelete(task._id);
                  setIsDeleteModalOpen(true);
                }}
                className="text-red-500 cursor-pointer"
              />

              {filter === "IN_PROGRESS" && task.status === "IN_PROGRESS" && (
                <button
                  onClick={() => markCompleted(task._id)}
                  className="bg-gray-200 px-3 py-1 rounded-full text-xs"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isTaskModalOpen && currentTask && (
        <div
          onClick={() => {
            setIsTaskModalOpen(false);
            setIsDeleteModalOpen(false);
            setIsLogoutModalOpen(false);
          }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center font-[Lexend]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 w-80 space-y-4 relative"
          >
            <button
              onClick={() => {
                setIsTaskModalOpen(false);
                setIsDeleteModalOpen(false);
                setIsLogoutModalOpen(false);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <FiX size={18} />
            </button>
            <h2 className="font-semibold text-lg">
              {isEditMode ? "Edit Task" : "Add Task"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={currentTask.title}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, title: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

            <textarea
              placeholder="Description"
              value={currentTask.description}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, description: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

            <input
              type="date"
              min={today}
              value={currentTask.dueDate}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, dueDate: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

            <input
              type="time"
              value={currentTask.dueTime}
              onChange={(e) =>
                setCurrentTask({ ...currentTask, dueTime: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

            <button
              onClick={saveTask}
              className="w-full bg-[#1C4D8D] text-white py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div
          onClick={() => {
            setIsTaskModalOpen(false);
            setIsDeleteModalOpen(false);
            setIsLogoutModalOpen(false);
          }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center font-[Lexend]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 w-80 space-y-4 relative"
          >
            <button
              onClick={() => {
                setIsTaskModalOpen(false);
                setIsDeleteModalOpen(false);
                setIsLogoutModalOpen(false);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <FiX size={18} />
            </button>
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div
          onClick={() => {
            setIsTaskModalOpen(false);
            setIsDeleteModalOpen(false);
            setIsLogoutModalOpen(false);
          }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center font-[Lexend]"
        >
          <button
            onClick={() => {
              setIsTaskModalOpen(false);
              setIsDeleteModalOpen(false);
              setIsLogoutModalOpen(false);
            }}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <FiX size={18} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 w-80 space-y-4 relative"
          >
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
