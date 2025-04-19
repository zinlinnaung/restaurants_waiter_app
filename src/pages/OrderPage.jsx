import { useEffect, useState } from "react";
import { menuItems } from "../data/menu";
import MenuItem from "../components/MenuItem";
import OrderSummary from "../components/OrderSummary";

export default function OrderPage() {
  const [selectedTable, setSelectedTable] = useState("");
  const [order, setOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tableOrders, setTableOrders] = useState({});
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  useEffect(() => {
    setOrder([]);
  }, [selectedTable]);

  const addToOrder = (item) => {
    setOrder((prev) => {
      const existing = prev.find((o) => o.id === item.id);
      if (existing) {
        return prev.map((o) =>
          o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  const markAsPaid = (tableNumber) => {
    // Reset the orders for the selected table
    setTableOrders((prevOrders) => {
      const newOrders = { ...prevOrders };
      delete newOrders[tableNumber]; // Remove the table’s orders
      return newOrders;
    });

    // Optionally alert the user or display a success message
    alert(`Table ${tableNumber} marked as paid!`);
  };

  const updateQty = (id, delta) => {
    if (id === "CLEAR") {
      setOrder([]);
      return;
    }

    setOrder((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const submitOrder = () => {
    if (!selectedTable) return alert("Please select a table.");
    if (order.length === 0) return alert("No items in order.");

    // Save as new batch
    setTableOrders((prev) => ({
      ...prev,
      [selectedTable]: [...(prev[selectedTable] || []), order],
    }));

    const receipt = order
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ${item.price * item.quantity} MMK`
      )
      .join("\n");

    alert(`Order for Table ${selectedTable} submitted!\n\n${receipt}`);
    setOrder([]);
  };

  const filteredMenu = menuItems.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">🧾 Waiter POS</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search menu..."
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <select
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            <option value="">-- Select Table --</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                Table {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 flex gap-2 flex-wrap">
        {["All", "Food", "Drink", "Dessert"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 h-[80vh] overflow-y-auto pr-1">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <MenuItem key={item.id} item={item} addToOrder={addToOrder} />
              ))
            ) : (
              <p className="text-gray-400 col-span-full">No items found.</p>
            )}
          </div>
        </div>

        <div>
          <OrderSummary
            order={order}
            submitOrder={submitOrder}
            updateQty={updateQty}
          />

          {selectedTable && tableOrders[selectedTable]?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2 text-white">
                Previous Orders for Table {selectedTable}
              </h2>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {tableOrders[selectedTable].map((batch, i) => {
                  const batchTotal = batch.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  );
                  return (
                    <div
                      key={i}
                      className="bg-gray-800 rounded-lg p-3 text-sm text-white border border-gray-600"
                    >
                      <p className="font-semibold mb-1">Batch #{i + 1}</p>
                      {batch.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>{item.price * item.quantity} MMK</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-semibold border-t border-gray-700 pt-2 mt-2">
                        <span>Total</span>
                        <span>{batchTotal} MMK</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Grand Total for All Batches */}
              <div className="mt-4 bg-gray-900 rounded-lg p-4 text-white border-t border-gray-700">
                <div className="flex justify-between font-bold text-lg">
                  <span>💰 Grand Total</span>
                  <span>
                    {tableOrders[selectedTable].reduce(
                      (total, batch) =>
                        total +
                        batch.reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        ),
                      0
                    )}{" "}
                    MMK
                  </span>
                </div>
                {/* Mark as Paid Button */}
                <div className="mt-4">
                  <button
                    onClick={() => markAsPaid(selectedTable)}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                  >
                    ✅ Mark as Paid
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showMobileSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden flex justify-end">
          <div className="bg-gray-900 w-full h-[80%] rounded-t-2xl p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">Order Summary</h2>
              <button
                onClick={() => setShowMobileSummary(false)}
                className="text-white text-sm"
              >
                Close ✖️
              </button>
            </div>
            <OrderSummary
              order={order}
              submitOrder={submitOrder}
              updateQty={updateQty}
            />
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <button
          onClick={() => setShowMobileSummary(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          View Order ({order.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </div>
    </div>
  );
}
