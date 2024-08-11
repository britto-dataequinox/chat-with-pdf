import React from "react";
import Documents from "../containers/Documents";

const Dashboard = () => {
  return (
    <div className="h-full max-w-7xl mx-auto mt-4">
      <h1 className="text-3xl p-5 bg-gray-100 font-extralight text-red-600">
        My Documents
      </h1>
      <Documents />
    </div>
  );
};

export default Dashboard;
Dashboard;
