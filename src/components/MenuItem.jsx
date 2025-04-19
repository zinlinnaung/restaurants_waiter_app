export default function MenuItem({ item, addToOrder }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow hover:scale-[1.02] transition-transform duration-200 flex flex-col h-[250px]">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[120px] object-cover"
      />
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-400">
            {item.price.toLocaleString()} MMK
          </p>
        </div>
        <button
          onClick={() => addToOrder(item)}
          className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-1.5 rounded-lg text-sm font-medium"
        >
          Add
        </button>
      </div>
    </div>
  );
}
