import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../stores/auth";

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">ID:</span> {user?.id}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Name:</span> {user?.name}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
