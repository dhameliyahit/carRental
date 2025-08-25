import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "./layout/Layout";
import { useNavigate } from "react-router-dom";


const base_url = "http://localhost:9000";

const CarDetailsPage = () => {
    return (
        <Layout>
            <BookCar />
        </Layout>
    );
};

const BookCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCarDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${base_url}/api/car/${id}`);
            if (res.data.success) {
                setCar(res.data.car);
            } else {
                toast.error(res.data?.message || "Failed to fetch car details");
            }
        } catch (error) {
            handleAxiosError(error, "Failed to load car details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchCarDetails();
    }, [id]);

    if (loading) return <p className="text-center text-gray-400">Loading car details...</p>;

    if (!car) return <p className="text-center text-gray-400">Car not found</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl rounded-2xl p-8 text-white">

                {/* Left: Car Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={car.carImage || "/placeholder.jpg"}
                        alt={car.carName}
                        className="w-full h-80 object-cover rounded-xl shadow-lg transform hover:scale-105 transition duration-500 ease-in-out"
                    />
                </div>

                {/* Right: Car Info + Booking */}
                <div className="flex flex-col justify-between">

                    {/* Car Info */}
                    <div className="space-y-3 mb-6 border-b border-gray-700 pb-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-extrabold tracking-wide">{car.carName}</h1>
                            <p className="text-gray-300">Category: <span className="font-medium text-white">{car.carCategory}</span></p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-300">Year: <span className="font-medium text-white">{car.carYear}</span></p>
                            <p className="text-xl font-semibold text-blue-400">Rent: ₹{car.carRent} / day</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400">Fuel: <span className="font-medium text-white">{car.carFuel}</span></p>
                            <p className="text-gray-400">Seats: <span className="font-medium text-white">{car.carSeats}</span></p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400">Location: <span className="font-medium text-white">{car.location}</span></p>
                            <p className="text-gray-400">Gear: <span className="font-medium text-white">{car.carGear}</span></p>
                        </div>
                        <span className={`inline-block px-4 py-1 text-sm font-semibold rounded-full shadow-md ${car.isAvailable ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                            {car.isAvailable ? "Available" : "Not Available"}
                        </span>
                    </div>

                    {/* Booking Form */}
                    <BookingForm car={car} />
                </div>
            </div>
        </div>
    );
};


// BookingForm Sub-Component
const BookingForm = ({ car }) => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // 👈 React Router hook

    const handleBooking = async () => {
        if (!fromDate || !toDate) return toast.error("Please select both From and To dates");
        const token = localStorage.getItem("Authorization");

        setLoading(true);
        try {
            if (!token) {
                toast.error("No token found. Please login again.");
                setLoading(false);
                return;
            }

            const res = await axios.post(
                `${base_url}/api/new/booking`,
                { carId: car._id, fromDate, toDate },
                { headers: { Authorization: token } } // you already confirmed raw token works
            );

            if (res.data.success) {
                toast.success(res.data.message);
                console.log(res.data);

                // 👇 Redirect after success
                navigate("/bookings");

                setFromDate("");
                setToDate("");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Booking error:", error.response || error);
            toast.error(error.response?.data?.message || "Booking failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* From Date */}
            <div>
                <label className="block mb-2 font-medium">From Date</label>
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 
                               focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition"
                />
            </div>

            {/* To Date */}
            <div>
                <label className="block mb-2 font-medium">To Date</label>
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 
                               focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition"
                />
            </div>

            {/* Location */}
            <div>
                <label className="block mb-2 font-medium">Location</label>
                <input
                    type="text"
                    defaultValue={car.location}
                    readOnly
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 
                               focus:border-blue-500 focus:ring focus:ring-blue-500/30 
                               transition cursor-not-allowed"
                />
            </div>

            {/* Button */}
            <button
                onClick={handleBooking}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 
                    ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"}`}
            >
                {loading ? "Booking..." : "Book This Car"}
            </button>
        </div>
    );
};


// Axios error handler
const handleAxiosError = (error, defaultMessage) => {
    console.error(error);
    if (error.response) toast.error(error.response.data?.message || defaultMessage);
    else if (error.request) toast.error("No response from server. Please try again.");
    else toast.error(defaultMessage);
};

export default CarDetailsPage;
