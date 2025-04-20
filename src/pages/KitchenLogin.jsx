import { useState } from "react";

export default function KitchenLogin() {
  const [restaurantCode, setRestaurantCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (restaurantCode.trim() === "" || password.trim() === "") {
      setError("Please fill in both fields");
      return;
    }

    // Fake login for now
    console.log("Logging in with", restaurantCode, password);
    // TODO: Add real login logic
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-950 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          👨‍🍳 Kitchen Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Restaurant Code
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              placeholder="e.g. outlet_01"
              value={restaurantCode}
              onChange={(e) => setRestaurantCode(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              placeholder="Enter kitchen password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg px-4 py-3 transition text-lg"
          >
            Enter Kitchen
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-6">
          For staff use only. Contact admin for access.
        </p>
      </div>
    </div>
  );
}
