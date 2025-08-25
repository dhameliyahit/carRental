import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCar } from "react-icons/fa";
import { MdOutlineBookmarkAdded, MdLogin } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [welcomeName, setWelcomeName] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const storedName = localStorage.getItem("UserName");
        const storedRole = localStorage.getItem("UserRole");
        if (storedName) setWelcomeName(storedName);
        if (storedRole) setRole(parseInt(storedRole));
    }, []);

    const base_url = "http://localhost:9000";

    const Login = async () => {
        try {
            if (!email || !password) {
                toast.error("Email & Password are required");
                return;
            }

            const res = await axios.post(`${base_url}/api/login`, { email, password });

            if (res.data?.success) {
                toast.success(res.data.message || "Login successful!");
                setIsModalOpen(false);

                const token = res?.data?.token;
                localStorage.setItem("Authorization", `Bearer ${token}`);
                localStorage.setItem("UserName", res.data.name);
                localStorage.setItem("UserRole", res.data.role);
                setWelcomeName(res.data.name);
                setRole(res.data.role);
            } else {
                toast.error(res.data?.message || "Error while login");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const Register = async () => {
        try {
            if (!name || !email || !password) {
                toast.error("Name, Email & Password are required");
                return;
            }

            const res = await axios.post(`${base_url}/api/register`, {
                name,
                email,
                password,
            });

            if (res.data?.success) {
                toast.success(res.data.message || "Registration successful!");

                const token = res?.data?.token;
                if (token) {
                    localStorage.setItem("Authorization", `Bearer ${token}`);
                    localStorage.setItem("UserName", res.data.name);
                    localStorage.setItem("UserRole", res.data.role); // ✅ save role
                    setWelcomeName(res.data.name);
                    setRole(res.data.role);
                }

                setIsModalOpen(false);
            } else {
                toast.error(res.data?.message || "Error while registering");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const Logout = () => {
        localStorage.clear();
        setWelcomeName("");
        setRole(null);
        toast.success("Logged out successfully");
        setDropdownOpen(false);
    };

    const isLoggedIn = !!localStorage.getItem("Authorization");

    return (
        <div className="navbar bg-base-100 shadow-lg px-4 md:px-10 sticky top-0 z-50">
            {/* Logo */}
            <div className="flex-1">
                <Link
                    to="/"
                    className="text-3xl font-extrabold text-primary tracking-wide flex items-center gap-2"
                >
                    <FaCar className="text-blue-600" /> CarRental
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 font-medium">
                <Link to="/" className="flex items-center gap-2 hover:text-primary">
                    <FaHome /> Home
                </Link>
                <Link to="/cars" className="flex items-center gap-2 hover:text-primary">
                    <FaCar /> Cars
                </Link>
                <Link
                    to="/bookings"
                    className="flex items-center gap-2 hover:text-primary"
                >
                    <MdOutlineBookmarkAdded /> My Bookings
                </Link>

                {/* Auth */}
                {isLoggedIn ? (
                    <div className="relative">
                        <button
                            className="btn btn-primary rounded-full px-6 flex items-center gap-2"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {welcomeName}
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* ✅ Show Admin Panel if role === 1 */}
                                {role === 1 && (
                                    <Link
                                        to="/admin"
                                        className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={Logout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className="btn btn-primary rounded-full px-6 flex items-center gap-2"
                        onClick={() => {
                            setIsRegister(false);
                            setIsModalOpen(true);
                        }}
                    >
                        <MdLogin size={18} /> Login
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost">
                    ☰
                </label>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <Link to="/" className="flex items-center gap-2">
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/cars" className="flex items-center gap-2">
                            <FaCar /> Cars
                        </Link>
                    </li>
                    <li>
                        <Link to="/bookings" className="flex items-center gap-2">
                            <MdOutlineBookmarkAdded /> My Bookings
                        </Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            {/* ✅ Show Admin Panel in mobile if role === 1 */}
                            {role === 1 && (
                                <li>
                                    <Link
                                        to="/admin"
                                        className="flex items-center gap-2 text-blue-600"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        ⚙️ Admin Panel
                                    </Link>
                                </li>
                            )}
                            <li>
                                <button
                                    className="btn btn-error rounded-full px-6"
                                    onClick={Logout}
                                >
                                    Logout ({welcomeName})
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button
                                className="btn btn-primary rounded-full px-6"
                                onClick={() => {
                                    setIsRegister(false);
                                    setIsModalOpen(true);
                                }}
                            >
                                <MdLogin size={18} /> Login
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            {/* Modal (Login / Register) */}
            {isModalOpen && !isLoggedIn && (
                <div className="modal modal-open">
                    <div className="modal-box border border-gray-600 rounded-2xl shadow-xl bg-gray-900 text-white max-w-md">
                        {!isRegister ? (
                            <>
                                {/* Login Form */}
                                <h3 className="font-bold text-2xl text-center mb-2">
                                    Welcome Back
                                </h3>
                                <p className="text-center text-gray-400 mb-6">
                                    Login to continue booking your dream car 🚗
                                </p>
                                <div className="form-control mb-3">
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="input input-bordered w-full bg-gray-800 text-white rounded-full placeholder-gray-400"
                                    />
                                </div>
                                <div className="form-control mb-3">
                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="input input-bordered w-full bg-gray-800 text-white rounded-full placeholder-gray-400"
                                    />
                                </div>
                                <div className="modal-action flex flex-col gap-3">
                                    <button
                                        className="btn btn-outline rounded-full"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Close
                                    </button>
                                    <button onClick={Login} className="btn btn-accent rounded-full">
                                        Login
                                    </button>
                                    <p className="text-center text-gray-400 mt-2 text-sm">
                                        Don't have an account?{" "}
                                        <span
                                            className="text-indigo-400 cursor-pointer hover:underline"
                                            onClick={() => setIsRegister(true)}
                                        >
                                            Create Account
                                        </span>
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Register Form */}
                                <h3 className="font-bold text-2xl text-center mb-2">
                                    Create Account
                                </h3>
                                <p className="text-center text-gray-400 mb-6">
                                    Sign up to start your journey 🚗
                                </p>
                                <div className="form-control mb-3">
                                    <input
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Full Name"
                                        className="input input-bordered w-full bg-gray-800 text-white rounded-full placeholder-gray-400"
                                    />
                                </div>
                                <div className="form-control mb-3">
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="input input-bordered w-full bg-gray-800 text-white rounded-full placeholder-gray-400"
                                    />
                                </div>
                                <div className="form-control mb-3">
                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="input input-bordered w-full bg-gray-800 text-white rounded-full placeholder-gray-400"
                                    />
                                </div>
                                <div className="modal-action flex flex-col gap-3">
                                    <button
                                        className="btn btn-outline rounded-full"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={Register}
                                        className="btn btn-accent rounded-full"
                                    >
                                        Register
                                    </button>
                                    <p className="text-center text-gray-400 mt-2 text-sm">
                                        Already have an account?{" "}
                                        <span
                                            className="text-indigo-400 cursor-pointer hover:underline"
                                            onClick={() => setIsRegister(false)}
                                        >
                                            Login
                                        </span>
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
