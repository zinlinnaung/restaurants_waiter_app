import React from "react";

export default function Tabs({ currentTab, setCurrentTab }) {
  return (
    <div className="flex justify-around mb-4 sm:hidden">
      <button
        className={`flex-1 p-2 text-white ${
          currentTab === "Pending" ? "bg-blue-600" : "bg-gray-700"
        }`}
        onClick={() => setCurrentTab("Pending")}
      >
        Pending
      </button>
      <button
        className={`flex-1 p-2 text-white ${
          currentTab === "Completed" ? "bg-green-600" : "bg-gray-700"
        }`}
        onClick={() => setCurrentTab("Completed")}
      >
        Completed
      </button>
    </div>
  );
}
