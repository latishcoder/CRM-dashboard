import { useState } from "react";
import LoginScreen from "./components/auth/LoginScreen";
import Dashboard from "./pages/dashboard";

function App() {
  const [user, setUser] = useState(null);

  return user ? (
    <Dashboard user={user} onLogout={() => setUser(null)} />
  ) : (
    <LoginScreen onLogin={setUser} />
  );
}

export default App;
