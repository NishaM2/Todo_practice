import { useEffect, useState } from "react";
import { api } from "../api";

export default function TaskManager({ user }) {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [editId, setEditId] = useState(null);

  // Fetch tasks on load
  useEffect(() => {
  const fetchTasks = async () => {
    if (!user || !user._id) return; // ✅ Wait until user is valid

    console.log("Fetching tasks for user id:", user._id);
    try {
      const res = await api.get(`/v2/getTask/${user._id}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  fetchTasks();
}, [user]);


  // Add or update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/v2/updateTask/${editId}`, {
        ...form,
        email: user.email,
      });
    } else {
      await api.post("/v2/addTask", {
        ...form,
        email: user.email,
      });
    }

    // Reset form and reload tasks
    setForm({ title: "", body: "" });
    setEditId(null);
    const res = await api.get(`/v2/getTask/${user._id}`);
    setTasks(res.data);
  };

  // Delete task
  const deleteTask = async (id) => {
    await api.delete(`/v2/deleteTask/${id}`, {
      data: { email: user.email },
    });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  // Edit task
  const startEdit = (task) => {
    setEditId(task._id);
    setForm({ title: task.title, body: task.body });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold text-center mb-4">Task Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 border rounded shadow flex justify-between items-start"
            >
              <div>
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-gray-600">{task.body}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => startEdit(task)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
}
