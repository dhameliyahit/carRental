import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const base_url = "http://localhost:9000";

const statusColors = {
  pending: "bg-yellow-200 text-yellow-800",
  confirmed: "bg-green-200 text-green-800",
  cancelled: "bg-red-200 text-red-800",
};

const statusOptions = ["pending", "confirmed", "cancelled"];

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("Authorization");

      const res = await axios.get(`${base_url}/api/all/booking`, {
        headers: { Authorization: `${token}` },
      });

      if (res.data.success) setBookings(res.data.bookings);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `${base_url}/api/all/booking/${id}`,
        { status: newStatus },
        { headers: { Authorization: `${localStorage.getItem("Authorization")}` } }
      );

      if (res.data.success)
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
        );
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await axios.delete(`${base_url}/api/delete/booking/${id}`, {
        headers: { Authorization: `${localStorage.getItem("Authorization")}` },
      });

      if (res.data.success)
        setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 dark:text-gray-300 mt-20">Loading bookings...</p>;

  return (
    <div className="w-full py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            All Bookings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all customer bookings in one place
          </p>
        </div>

        {/* Booking List */}
        <div className="space-y-8">
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transform transition duration-300 hover:scale-[1.02]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Car Image */}
              <div className="lg:w-64 w-full aspect-video sm:aspect-[4/3] relative flex-shrink-0">
                <img
                  src={booking.carId.carImage || "/placeholder.jpg"}
                  alt={booking.carId?.carName || "Car"}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />
              </div>

              {/* Booking Details */}
              <div className="flex-1 p-6 flex flex-col justify-between relative gap-4">
                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  className="absolute top-4 right-4 btn btn-xs btn-error text-white rounded-full shadow-md"
                  title="Delete Booking"
                >
                  ✕
                </button>

                <div>
                  {/* Booking ID & Status */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      #{booking._id.slice(-6)}
                    </span>

                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-md text-sm font-medium ${statusColors[booking.status]}`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Car Info */}
                  <p className="text-gray-800 dark:text-gray-200 mt-2 font-semibold text-lg">
                    {booking.carId?.carName}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {booking.carId?.carYear} • {booking.carId?.carFuel} •{" "}
                    {booking.carId?.location}
                  </p>

                  {/* Rental Info */}
                  <div className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />{" "}
                      <span>
                        {new Date(booking.fromDate).toLocaleDateString()} -{" "}
                        {new Date(booking.toDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaUser className="text-green-500" />{" "}
                      <span>
                        {booking.userId?.name} ({booking.userId?.email})
                      </span>
                    </p>
                  </div>
                </div>

                {/* Price Info */}
                <div className="mt-4 sm:mt-0 text-right">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Total Price</p>
                  <p className="text-2xl font-bold text-blue-600">₹{booking.TotalPay}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
