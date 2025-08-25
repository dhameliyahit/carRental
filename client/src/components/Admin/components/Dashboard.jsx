import React, { useEffect, useState } from "react";
import axios from "axios";

const base_url = "http://localhost:9000"; // ✅ change if needed

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Users & Cars Count
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch users
      const usersRes = await axios.get(`${base_url}/api/all/users`);
      const carsRes = await axios.get(`${base_url}/api/cars`);

      if (usersRes.data) {

        setTotalUsers(usersRes.data.totalUsers); // assuming array of users
      }

      if (carsRes.data?.cars) {
        setTotalCars(carsRes.data.cars.length); // assuming { cars: [] }
      }

    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading ? (
        <p className="text-gray-400">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Users */}
          <div className="stat shadow-lg bg-gray-800 rounded-xl p-6">
            <div className="stat-title text-gray-400">Total Users</div>
            <div className="stat-value text-4xl font-bold text-blue-400">
              {totalUsers}
            </div>
          </div>

          {/* Total Cars */}
          <div className="stat shadow-lg bg-gray-800 rounded-xl p-6">
            <div className="stat-title text-gray-400">Total Cars</div>
            <div className="stat-value text-4xl font-bold text-green-400">
              {totalCars}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
