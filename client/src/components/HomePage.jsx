import React, { useState, useEffect } from 'react'
import Layout from './layout/Layout'
import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import { FaCar, FaUsers, FaCogs, FaMapMarkerAlt } from "react-icons/fa";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';

const HomePage = () => {
    return (
        <Layout>
            <HeroSection />
            <BestCars />
            <AboutUs />
            <Testimonials />
            <Newsletter />
        </Layout>
    )
}

const HeroSection = () => {
    return (
        <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
            {/* Content Wrapper */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-10 items-center">

                {/* Left Side */}
                <div className="space-y-6" data-aos="fade-right">
                    <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                        Luxury Cars <span className="text-blue-400">on Rent</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-lg">
                        Drive your dream car today! Explore our premium collection of luxury cars with easy booking and affordable pricing. Perfect for your special occasions or business trips.
                    </p>

                    <div className="flex gap-4">
                        <Link
                            to="/cars"
                            className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-8 flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transition"
                        >
                            <FaCarSide size={20} /> Book Now
                        </Link>
                        <Link
                            to="/about"
                            className="btn btn-outline border-gray-400 text-gray-200 rounded-full px-8 hover:bg-gray-700 hover:border-gray-300"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Right Side (Car Image) */}
                <div className="flex justify-center" data-aos="fade-left">
                    <img
                        src="/assets/HomeCar.png"
                        alt="Luxury Car"
                        className="max-h-[80vh] w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                    />
                </div>
            </div>
        </div>
    );
};



const BestCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const base_url ="http://localhost:9000"
    // ✅ Fetch Cars
    const fetchCars = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${base_url}/api/cars`);
            if (res.data?.success) {
                // Only take first 3 cars
                setCars(res.data.cars.slice(0, 3)); // Use the cars array
                console.log(res.data.cars.slice(0, 3));
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
                                    src={car.carImage || "/placeholder.jpg"}
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




const AboutUs = () => {
    return (
        <section className="relative bg-gray-900 text-gray-100 py-20 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

                {/* Left Image */}
                <div
                    className="relative"
                    data-aos="fade-right"
                >
                    <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
                    <img
                        src="/assets/titleCar.jpg"
                        alt="Car Rental"
                        className="relative w-full max-w-lg border-r-5"
                    />
                </div>

                {/* Right Content */}
                <div
                    className="space-y-6"
                    data-aos="fade-left"
                    data-aos-delay="200"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        About <span className="text-primary">Our Service</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        We provide premium cars at affordable prices, making your journeys
                        smooth and hassle-free. From luxury sedans to SUVs, our rental
                        services are designed to give you the best driving experience with
                        comfort, safety, and style.
                    </p>

                    {/* Features / Stats */}
                    <div
                        className="grid grid-cols-2 gap-6 mt-8"
                        data-aos="zoom-in-up"
                        data-aos-delay="400"
                    >
                        <div className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-3xl font-bold text-primary">150+</h3>
                            <p className="text-gray-400 text-sm">Luxury Cars</p>
                        </div>
                        <div className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-3xl font-bold text-primary">10k+</h3>
                            <p className="text-gray-400 text-sm">Happy Customers</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div
                        className="flex flex-wrap gap-4 mt-8"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        <button className="btn btn-primary rounded-xl px-6 py-3 text-lg">
                            Learn More
                        </button>
                        <button className="btn btn-outline btn-secondary rounded-xl px-6 py-3 text-lg">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};



const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Rahul Mehta",
            role: "Business Owner",
            review:
                "This car rental service made my trip so smooth and stress-free. The booking process was easy, and the cars were in excellent condition.",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
        },
        {
            id: 2,
            name: "Ananya Sharma",
            role: "Traveler",
            review:
                "Amazing experience! Customer support was very responsive, and the pricing was very fair compared to others.",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 4,
        },
        {
            id: 3,
            name: "Amit Patel",
            role: "Frequent Renter",
            review:
                "Highly recommend! The car was clean, well-maintained, and delivered right on time. Will definitely book again.",
            img: "https://randomuser.me/api/portraits/men/12.jpg",
            rating: 5,
        },
    ];

    const Card = ({ review }) => {
        const [pos, setPos] = useState({ x: 50, y: 50 });

        const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setPos({ x, y });
        };

        return (
            <div
                onMouseMove={handleMouseMove}
                className="relative card bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col justify-between overflow-hidden group transition-all duration-500"
                data-aos="fade-up"
                data-aos-once="true"
            >
                {/* Hover Glow */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
                    style={{
                        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(99,102,241,0.25), transparent 60%)`,
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                    <FaQuoteLeft className="text-indigo-500 text-3xl mb-4" />
                    <p className="text-gray-300 italic mb-6">"{review.review}"</p>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <img
                        src={review.img}
                        alt={review.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <div className="text-left">
                        <h4 className="font-semibold text-white">{review.name}</h4>
                        <span className="text-gray-400 text-sm">{review.role}</span>
                        <div className="flex mt-2 text-yellow-400">
                            {Array.from({ length: 5 }, (_, i) => (
                                <FaStar
                                    key={i}
                                    className={i < review.rating ? "" : "opacity-30"}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="bg-gradient-to-b from-gray-900 to-black text-white py-16 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2
                    className="text-4xl font-extrabold mb-4"
                    data-aos="fade-down"
                    data-aos-once="true"
                >
                    What Our <span className="text-indigo-500">Customers Say</span>
                </h2>
                <p
                    className="text-gray-400 mb-10 text-lg"
                    data-aos="fade-up"
                    data-aos-once="true"
                >
                    Real experiences from people who trusted our service.
                </p>

                {/* Testimonial Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review) => (
                        <Card key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
};




const Newsletter = () => {
    return (
        <section className="bg-gradient-to-b from-gray-900 to-black py-16 px-6 text-white">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-3">Never Miss a Deal!</h2>
                <p className="text-gray-400 mb-8">
                    Subscribe to get the latest offers, new arrivals, and exclusive discounts
                </p>

                <div className="flex flex-col sm:flex-row items-center bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                    <input
                        type="email"
                        placeholder="Enter your email id"
                        className="flex-1 px-4 py-3 bg-transparent text-gray-200 placeholder-gray-400 outline-none"
                    />
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-medium w-full sm:w-auto transition-all">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
};



export default HomePage