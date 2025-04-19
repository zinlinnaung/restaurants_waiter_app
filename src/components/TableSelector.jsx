export default function TableSelector({ selectedTable, setSelectedTable }) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Select Table</label>
      <select
        className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2"
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}
      >
        <option value="">-- Choose a Table --</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            Table {num}
          </option>
        ))}
      </select>
    </div>
  );
}
