import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import Tabs from "../components/Tabs";

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [notificationAudio] = useState(new Audio("/sounds/notification.wav"));
  const [currentTab, setCurrentTab] = useState("Pending");

  // Simulate incoming orders
  useEffect(() => {
    const interval = setInterval(() => {
      const newOrder = {
        id: Date.now(),
        table: Math.ceil(Math.random() * 5),
        status: "Pending",
        items: [
          {
            id: 1,
            name: "🍔 Burger",
            quantity: 1 + Math.floor(Math.random() * 3),
          },
          {
            id: 2,
            name: "🥤 Cola",
            quantity: 1 + Math.floor(Math.random() * 2),
          },
        ],
        placedAt: Date.now(),
        note: "",
      };

      setOrders((prev) => [newOrder, ...prev]);

      if (soundEnabled) {
        notificationAudio.play().catch(() => {});
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [soundEnabled, notificationAudio]);

  useEffect(() => {
    const enableAudio = () => {
      notificationAudio.play().catch(() => {});
      setSoundEnabled(true);
      window.removeEventListener("click", enableAudio);
    };

    window.addEventListener("click", enableAudio);
    return () => window.removeEventListener("click", enableAudio);
  }, [notificationAudio]);

  const updateStatus = (id, newStatus) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o
      );

      if (newStatus === "Completed") {
        const targetOrder = updatedOrders.find((o) => o.id === id);
        if (targetOrder) {
          setOrderHistory((prevHistory) => {
            const alreadyInHistory = prevHistory.find(
              (h) => h.id === targetOrder.id
            );
            if (!alreadyInHistory) {
              return [targetOrder, ...prevHistory];
            }
            return prevHistory;
          });
        }
      }

      return updatedOrders;
    });
  };

  const formatTimeElapsed = (startTime) => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes}m ${seconds}s`;
  };

  const statusColors = {
    Pending: "bg-yellow-500",
    Preparing: "bg-blue-500",
    Completed: "bg-green-600",
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">👨‍🍳 Kitchen Dashboard</h1>
        <button
          onClick={() => setSoundEnabled((prev) => !prev)}
          className="text-white text-2xl"
          title={soundEnabled ? "Disable sound" : "Enable sound"}
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {currentTab === "Pending" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">🕓 Active Orders</h2>
            {orders.filter((o) => o.status !== "Completed").length === 0 && (
              <p className="text-gray-400">No active orders.</p>
            )}
            <div className="space-y-4">
              {orders
                .filter(
                  (order) =>
                    order.status === "Pending" || order.status === "Preparing"
                )
                .map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={updateStatus}
                    onAddNote={(id, note) => {
                      setOrders((prevOrders) =>
                        prevOrders.map((o) =>
                          o.id === id ? { ...o, note } : o
                        )
                      );
                    }}
                  />
                ))}
            </div>
          </div>
        )}

        {currentTab === "Completed" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">✅ Completed Orders</h2>
            {orderHistory.length === 0 && (
              <p className="text-gray-400">No completed orders yet.</p>
            )}
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600"
                >
                  <h3 className="text-xl text-white font-bold">
                    🪑 Table {order.table}
                  </h3>
                  <ul className="text-gray-300 mb-2">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <span className="text-green-500 text-sm font-medium">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:grid gap-6 lg:grid-cols-2">
        {/* Active Orders */}
        <div>
          <h2 className="text-xl font-semibold mb-4">🕓 Active Orders</h2>
          {orders.filter((o) => o.status !== "Completed").length === 0 && (
            <p className="text-gray-400">No active orders.</p>
          )}
          <div className="space-y-4">
            {orders
              .filter((order) => order.status !== "Completed")
              .map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onUpdateStatus={updateStatus}
                  onAddNote={(id, note) => {
                    setOrders((prevOrders) =>
                      prevOrders.map((o) => (o.id === id ? { ...o, note } : o))
                    );
                  }}
                />
              ))}
          </div>
        </div>

        {/* Completed Orders */}
        <div>
          <h2 className="text-xl font-semibold mb-4">✅ Completed Orders</h2>
          {orderHistory.length === 0 && (
            <p className="text-gray-400">No completed orders yet.</p>
          )}
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600"
              >
                <h3 className="text-xl text-white font-bold">
                  🪑 Table {order.table}
                </h3>
                <ul className="text-gray-300 mb-2">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
                <span className="text-green-500 text-sm font-medium">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
