import { useState } from "react";
import { api } from "../api";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/v1/login", form);
      setUser(res.data.others); // Save user info in parent state
      alert("Login successful!");
    } catch(error) {
      alert("Login failed. Check email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Login
        </button>
      </form>
    </div>
  );
}
