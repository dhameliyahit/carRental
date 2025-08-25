import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import { FaSearch, FaFilter } from "react-icons/fa";
import { FaCar, FaUsers, FaCogs, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';

const Cars = () => {
    return (
        <Layout>
            <FilterCars />
            <BestCars />
        </Layout>
    )
}

const FilterCars = () => {
    return (
        <div className="w-full py-10 px-4 bg-base-200 dark:bg-gray-900">
            {/* Title & Subtitle */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Available Cars
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
                    Browse our selection of premium vehicles available for your next adventure
                </p>
            </div>

            {/* Search Box */}
            <div className="mt-6 flex justify-center">
                <div className="flex items-center bg-white dark:bg-gray-800 shadow-md rounded-full px-4 py-2 w-full max-w-lg">
                    <FaSearch className="text-gray-400 dark:text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search by make, model, or features"
                        className="flex-1 outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base"
                    />
                    <button className="btn btn-sm btn-ghost rounded-full text-gray-600 dark:text-gray-300">
                        <FaFilter />
                    </button>
                </div>
            </div>
        </div>
    )
}

// Define your API base URL here
const base_url = "http://localhost:9000";

// Helper function to fetch car image by ID
const BestCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const getImageUrl = async (id) => {
        try {
            const res = await axios.get(`${base_url}/api/image/${id}`);
            if (res.data?.success) {
                return res.data.carImage; // data:image/png;base64,...
            }
            return null;
        } catch (error) {
            console.error("Error fetching image:", error);
            return null;
        }
    };



    // ✅ Fetch Cars + Attach Images
    const fetchCars = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${base_url}/api/cars`);
            if (res.data?.success) {
                // Only first 3 cars
                const carsWithImages = await Promise.all(
                    res.data.cars.slice(0, 3).map(async (car) => {
                        const img = await getImageUrl(car._id);
                        return { ...car, imageBase64: img };
                    })
                );

                setCars(carsWithImages);
            } else {
                toast.error(res.data?.message || "Failed to fetch cars");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching cars");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <section className="relative bg-gray-50 dark:bg-base-300 transition-colors duration-500 py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <h2
                    className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-3"
                    data-aos="fade-up"
                >
                    <FaCar className="text-3xl" /> Featured Cars
                </h2>

                {/* Total Results */}
                <p className="my-3 text-center font-medium text-gray-600 dark:text-gray-400">
                    {cars.length > 0
                        ? `Showing ${cars.length} featured cars`
                        : loading
                            ? "Loading cars..."
                            : "No cars available"}
                </p>

                {/* Car Grid */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {cars.map((car, index) => (
                        <div
                            key={car._id || index}
                            className="card bg-white dark:bg-base-200 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-blue-500/50 dark:hover:border-purple-500/50 transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
                            data-aos="zoom-in"
                            data-aos-delay={index * 200}
                        >
                            {/* Image Section */}
                            <div className="relative">
                                <img
                                    src={car.carImage} // fallback if no image
                                    alt={car.carName}
                                    className="h-52 w-full object-cover rounded-t-2xl"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-t-2xl"></div>

                                {/* Price Badge */}
                                <span className="absolute bottom-3 right-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-md">
                                    ₹{car.carRent}/day
                                </span>

                                {/* Availability Badge */}
                                {car.isAvailable && (
                                    <span className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        Available Now
                                    </span>
                                )}
                            </div>

                            {/* Card Body */}
                            <div className="card-body p-6">
                                <h2 className="card-title text-xl font-bold text-gray-900 dark:text-white">
                                    {car.carName}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {car.carCategory} · {car.carYear}
                                </p>

                                {/* Car Details */}
                                <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
                                    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FaUsers className="text-blue-600 dark:text-blue-400" />
                                        {car.carSeats} Seats
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FaCar className="text-purple-600 dark:text-purple-400" />
                                        {car.carFuel}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FaCogs className="text-indigo-600 dark:text-indigo-400" />
                                        {car.carGear}
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FaMapMarkerAlt className="text-pink-600 dark:text-pink-400" />
                                        {car.location}
                                    </p>
                                </div>

                                {/* Rent Button */}
                                <div className="card-actions justify-end mt-6">
                                    <Link
                                        to={`/car/${car._id}`}
                                        className="btn bg-gradient-to-r from-blue-600 to-purple-600 
                                        text-white font-semibold rounded-xl px-6 py-2
                                        shadow-md hover:shadow-lg hover:scale-105 
                                        transition-transform duration-300
                                        dark:from-blue-500 dark:to-purple-500"
                                    >
                                        Rent Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Cars;
