import { useState } from "react";

const OrderCard = ({ order, onUpdateStatus }) => {
  const [note, setNote] = useState(order.note || "");

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(order.id, newStatus); // Update status to Preparing or Completed
  };

  const statusColors = {
    Pending: "bg-yellow-500",
    Preparing: "bg-blue-500",
    Completed: "bg-green-600",
  };

  // Check if the order is completed (for both desktop and mobile)
  if (order.status === "Completed") {
    return null; // Hide completed orders
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-white">🪑 Table {order.table}</h2>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
            statusColors[order.status]
          }`}
        >
          {order.status}
        </span>
      </div>
      <ul className="mb-3 text-gray-300">
        {order.items.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity}
          </li>
        ))}
      </ul>

      <textarea
        className="w-full p-2 bg-gray-700 text-white rounded-md"
        rows="3"
        placeholder="Add kitchen notes..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex gap-2 mt-3">
        {order.status === "Pending" && (
          <button
            onClick={() => handleStatusChange("Preparing")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Start Preparing
          </button>
        )}

        {order.status === "Preparing" && (
          <button
            onClick={() => handleStatusChange("Completed")}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
          >
            Mark as Done
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
