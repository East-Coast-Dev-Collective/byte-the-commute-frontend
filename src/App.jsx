import { useState } from "react";
import Home from "./pages/Home";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = ({ username, password }) => {
    if (!username.trim() || !password.trim()) {
      return;
    }

    setUser({
      name: username.trim(),
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return <Home user={user} onLogin={handleLogin} onLogout={handleLogout} />;
};

export default App;
