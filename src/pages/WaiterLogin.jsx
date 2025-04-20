import { useState } from "react";

export default function WaiterLoginDark() {
  const [waiterName, setWaiterName] = useState("");
  const [tableCode, setTableCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!waiterName.trim() || !tableCode.trim()) {
      setError("Please fill in both fields");
      return;
    }

    // Fake login logic for now
    console.log("Waiter login:", { waiterName, tableCode });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-850 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          🍽️ Waiter Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              User Name
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="e.g. John"
              value={waiterName}
              onChange={(e) => setWaiterName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Pass Code
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="e.g. WT_01"
              value={tableCode}
              onChange={(e) => setTableCode(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg px-4 py-3 transition text-lg shadow-lg"
          >
            Start Taking Orders
          </button>
        </form>

        <p className="text-gray-400 text-xs text-center mt-6">
          Enter your assigned passcode and name to continue.
        </p>
      </div>
    </div>
  );
}
