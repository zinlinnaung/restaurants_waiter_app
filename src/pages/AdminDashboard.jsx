import { useState, useEffect } from "react";
import {
  FaBars,
  FaUtensils,
  FaReceipt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [waiters, setWaiters] = useState([]);
  const [kitchens, setKitchens] = useState([]);

  // Simulate real-time order updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) => [
        ...prevOrders,
        {
          id: Date.now(),
          table: Math.ceil(Math.random() * 10),
          status: ["Pending", "Preparing", "Completed"][
            Math.floor(Math.random() * 3)
          ],
          items: [
            {
              id: 1,
              name: "🍔 Burger",
              quantity: 1 + Math.floor(Math.random() * 2),
            },
            {
              id: 2,
              name: "🥤 Cola",
              quantity: 1 + Math.floor(Math.random() * 2),
            },
          ],
        },
      ]);
    }, 10000); // New order every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate waiter and kitchen data
  useEffect(() => {
    setWaiters([
      { id: 1, name: "John", activeOrders: 5 },
      { id: 2, name: "Jane", activeOrders: 3 },
    ]);
    setKitchens([
      { id: 1, name: "Kitchen 1", activeOrders: 10 },
      { id: 2, name: "Kitchen 2", activeOrders: 5 },
    ]);
  }, []);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`transition-transform duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 p-6`}
      >
        <button
          onClick={handleSidebarToggle}
          className="text-2xl text-yellow-400 mb-6 md:hidden"
        >
          {isSidebarOpen ? "←" : "→"}
        </button>
        <div className="flex flex-col space-y-8">
          <h2 className="text-3xl text-center text-yellow-400 font-bold mb-10">
            Admin Panel
          </h2>
          <div>
            <a
              href="#"
              className="flex items-center space-x-4 text-lg hover:bg-gray-700 p-3 rounded-xl transition"
            >
              <FaUtensils size={24} />
              {isSidebarOpen && <span>Kitchen</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-4 text-lg hover:bg-gray-700 p-3 rounded-xl transition"
            >
              <FaReceipt size={24} />
              {isSidebarOpen && <span>Orders</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-4 text-lg hover:bg-gray-700 p-3 rounded-xl transition"
            >
              <FaUsers size={24} />
              {isSidebarOpen && <span>Waiters</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-4 text-lg hover:bg-gray-700 p-3 rounded-xl transition"
            >
              <FaCog size={24} />
              {isSidebarOpen && <span>Settings</span>}
            </a>
            <a
              href="#"
              className="flex items-center space-x-4 text-lg hover:bg-gray-700 p-3 rounded-xl transition"
            >
              <RiLogoutCircleRLine size={24} />
              {isSidebarOpen && <span>Logout</span>}
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl text-yellow-400 font-bold">Dashboard</h1>
          <div className="flex items-center space-x-6">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-white border border-gray-700 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="w-10 h-10 rounded-full bg-yellow-400"></div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl text-gray-400 mb-4">Active Orders</h3>
            <h2 className="text-3xl font-bold text-yellow-400">
              {orders.length}
            </h2>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl text-gray-400 mb-4">Active Waiters</h3>
            <h2 className="text-3xl font-bold text-yellow-400">
              {waiters.length}
            </h2>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl text-gray-400 mb-4">Active Kitchens</h3>
            <h2 className="text-3xl font-bold text-yellow-400">
              {kitchens.length}
            </h2>
          </div>
        </div>

        {/* Real-Time Orders */}
        <div>
          <h2 className="text-2xl text-yellow-400 mb-6">Real-Time Orders</h2>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-4 rounded-lg bg-gray-700"
              >
                <div>
                  <h3 className="text-xl text-white">Table {order.table}</h3>
                  <ul className="text-gray-300">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`px-4 py-2 rounded-full text-white text-sm ${
                    order.status === "Pending"
                      ? "bg-yellow-500"
                      : order.status === "Preparing"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                >
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waiter & Kitchen Management */}
        <div className="mt-8">
          <h2 className="text-2xl text-yellow-400 mb-6">
            Waiter & Kitchen Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Waiters */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl text-gray-400 mb-4">Active Waiters</h3>
              {waiters.map((waiter) => (
                <div
                  key={waiter.id}
                  className="flex justify-between items-center mb-4"
                >
                  <span className="text-white">{waiter.name}</span>
                  <span className="text-gray-400">
                    {waiter.activeOrders} Orders
                  </span>
                </div>
              ))}
            </div>

            {/* Kitchens */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl text-gray-400 mb-4">Active Kitchens</h3>
              {kitchens.map((kitchen) => (
                <div
                  key={kitchen.id}
                  className="flex justify-between items-center mb-4"
                >
                  <span className="text-white">{kitchen.name}</span>
                  <span className="text-gray-400">
                    {kitchen.activeOrders} Orders
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
