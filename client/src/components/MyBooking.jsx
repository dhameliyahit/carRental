import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./layout/Layout";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const MyBooking = () => {
    return (
        <Layout>
            <BookingOrder />
        </Layout>
    );
};

const statusColors = {
    pending: "badge-warning",
    confirmed: "badge-success",
    cancelled: "badge-error",
};

const base_url = "http://localhost:9000";


const BookingOrder = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getBookings = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${base_url}/api/myBooking`, {
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                },
            });
            console.log(res.data.result)
            setBookings(res.data.result || []);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch bookings");
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getBookings();
    }, []);

    if (loading) return <p className="text-center">Loading bookings...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="w-full py-10 px-4 bg-base-100 dark:bg-gray-900 min-h-screen flex justify-center">
            <div className="w-full max-w-5xl">
                {/* Header */}
                <div className="mb-10 text-center" data-aos="fade-down">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Bookings
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        View and manage all your car bookings
                    </p>
                </div>

                {/* Booking List */}
                <div className="space-y-8">
                    {bookings.map((booking, index) => (
                        <div
                            key={booking._id}
                            className="card lg:card-side bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transform transition duration-300 hover:scale-[1.02] mx-auto"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Car Image */}
                            <figure className="lg:w-64 w-full aspect-video sm:aspect-[4/3]">
                                <img
                                    src={booking.carId.carImage}
                                    alt={booking.carId?.carName || "Car"}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </figure>

                            {/* Booking Details */}
                            <div className="card-body flex flex-col sm:flex-row sm:justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            #{booking._id.slice(-6)}
                                        </span>
                                        <span
                                            className={`badge ${statusColors[booking.status] || "badge-ghost"} badge-sm`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-800 dark:text-gray-200 mt-1 font-medium text-lg">
                                        {booking.carId?.carName}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {booking.carId?.year} • {booking.carId?.type}
                                    </p>

                                    {/* Rental Info */}
                                    <div className="mt-4 space-y-2 text-sm">
                                        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <FaCalendarAlt className="text-blue-500" />
                                            Rental Period:{" "}
                                            <span className="font-medium">
                                                {new Date(booking.fromDate).toLocaleDateString()} -{" "}
                                                {new Date(booking.toDate).toLocaleDateString()}
                                            </span>
                                        </p>
                                        <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <FaMapMarkerAlt className="text-red-500" />
                                            Pick-up Location:{" "}
                                            <span className="font-medium">
                                                {booking.carId?.location}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Price Info */}
                                <div className="text-right sm:min-w-[170px] flex flex-col justify-between">
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Total Price
                                    </p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        ₹{booking.TotalPay}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
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

export default MyBooking;
