import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLogo from "@/assets/AppLogo.png";
import { FiPlus, FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Home() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState<"ALL" | "IN_PROGRESS" | "COMPLETED">("ALL");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    // Later: clear token / store
    navigate("/login");
  };

  const tasks = [
    { id: 1, title: "Task 1", description: "Do laundry", status: "IN_PROGRESS" },
    { id: 2, title: "Task 2", description: "Do laundry", status: "COMPLETED" },
    { id: 3, title: "Task 3", description: "Do laundry", status: "IN_PROGRESS" },
  ];

  const filteredTasks =
    filter === "ALL"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <div className="min-h-screen px-4 py-6
      bg-linear-to-br from-[#7fb2e5] via-[#4f87c2] to-[#2b6cb0]">

      {/* Header */}
      <div className="bg-white rounded-2xl p-4 flex justify-between items-center relative">

        <img src={AppLogo} alt="logo" className="w-20" />

        <div className="text-center">
          <p className="text-xs text-gray-500">Welcome!</p>
          <p className="font-semibold text-lg">User 123</p>
        </div>

        {/* Profile Avatar */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 rounded-full bg-yellow-400 cursor-pointer"
          />

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg text-sm">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
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
        <button
          onClick={() => setFilter("ALL")}
          className={`px-4 py-2 rounded-md text-sm shadow
            ${filter === "ALL" ? "bg-[#1C4D8D] text-white" : "bg-white text-[#1C4D8D]"}`}
        >
          All Tasks
        </button>

        <button
          onClick={() => setFilter("IN_PROGRESS")}
          className={`px-4 py-2 rounded-md text-sm shadow
            ${filter === "IN_PROGRESS" ? "bg-[#1C4D8D] text-white" : "bg-white text-[#1C4D8D]"}`}
        >
          In progress
        </button>

        <button
          onClick={() => setFilter("COMPLETED")}
          className={`px-4 py-2 rounded-md text-sm shadow
            ${filter === "COMPLETED" ? "bg-[#1C4D8D] text-white" : "bg-white text-[#1C4D8D]"}`}
        >
          Completed
        </button>
      </div>

      {/* Add Task Button */}
      <div className="flex justify-end mt-4">
        <button className="flex items-center gap-2 bg-[#1C4D8D] text-white px-4 py-2 rounded-md shadow">
          <FiPlus />
          Add task
        </button>
      </div>

      {/* Task List */}
      <div className="mt-6 space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl p-4 shadow relative">

            {/* Edit icon */}
            <FiEdit className="absolute top-3 right-3 text-gray-600 cursor-pointer" />

            <p className="font-semibold">{task.title}</p>

            <div className="bg-[#2f5f9f] text-white rounded-lg p-3 mt-2 text-sm">
              {task.description}
            </div>

            <div className="flex justify-between items-center mt-3">
              <RiDeleteBin6Line className="text-red-500 cursor-pointer" />

              <div className="flex gap-2 text-xs">
                <span className="bg-gray-200 px-3 py-1 rounded-full">
                  In progress
                </span>
                <span className="bg-gray-200 px-3 py-1 rounded-full">
                  Completed
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
