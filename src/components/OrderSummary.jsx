export default function OrderSummary({ order, submitOrder, updateQty }) {
  const total = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">🧾 Order Summary</h2>
      {order.length === 0 ? (
        <p className="text-gray-400">No items selected.</p>
      ) : (
        order.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-700 py-2"
          >
            <div>
              <p>{item.name}</p>
              <p className="text-sm text-gray-400">
                {item.price.toLocaleString()} MMK x {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.id, -1)}
                className="bg-red-500 px-2 rounded text-white"
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQty(item.id, 1)}
                className="bg-green-500 px-2 rounded text-white"
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
      <div className="pt-2 text-right font-bold text-lg">
        Total: {total.toLocaleString()} MMK
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-medium"
        onClick={submitOrder}
      >
        Submit Order
      </button>
      <button
        className="w-full bg-gray-600 hover:bg-gray-700 py-2 rounded-lg text-white font-medium"
        onClick={() => updateQty("CLEAR", 0)}
      >
        Clear Order
      </button>
    </div>
  );
}
