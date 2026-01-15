import { useState } from "react";
import { Users } from "lucide-react";

const LoginScreen = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "demo@crm.com",
    password: "demo123",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (
        credentials.email === "demo@crm.com" &&
        credentials.password === "demo123"
      ) {
        onLogin({ email: credentials.email, name: "Demo User" });
      } else {
        alert("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">Lead CRM</h1>
          <p className="text-gray-600 mt-2">Manage your leads efficiently</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Email"
          />

          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Password"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
