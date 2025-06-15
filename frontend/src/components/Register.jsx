import { useState } from "react";
import { api } from "../api";

export default function Register() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/v1/register", form);
      alert("User registered successfully!");
    } catch(error) {
      alert("User already exists or registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}
