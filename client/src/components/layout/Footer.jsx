import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">CarRental</h2>
          <p className="text-sm opacity-80 mb-4">
            Premium car rental service with a wide selection of luxury and everyday
            vehicles for all your driving needs.
          </p>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-primary cursor-pointer">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-primary cursor-pointer">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primary cursor-pointer">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primary cursor-pointer">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-3">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cars" className="hover:text-primary cursor-pointer">
                Browse Cars
              </Link>
            </li>
            <li>
              <Link to="/list-cars" className="hover:text-primary cursor-pointer">
                List Your Car
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary cursor-pointer">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-bold mb-3">RESOURCES</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/help" className="hover:text-primary cursor-pointer">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary cursor-pointer">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary cursor-pointer">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/insurance" className="hover:text-primary cursor-pointer">
                Insurance
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-3">CONTACT</h4>
          <ul className="space-y-2 text-sm">
            <li>1234 Luxury Drive</li>
            <li>San Francisco, CA 94107</li>
            <li>+1 234 567890</li>
            <li>info@example.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} CarRental. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
