import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import TaskManager from "./components/TaskManager";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <>
          {showRegister ? (
            <Register />
          ) : (
            <Login setUser={setUser} />
          )}
          <p className="text-center mt-4">
            {showRegister ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="ml-2 text-blue-600 underline"
            >
              {showRegister ? "Login" : "Register"}
            </button>
          </p>
        </>
      ) : (
        <TaskManager user={user} />
      )}
    </div>
  );
}

export default App;
