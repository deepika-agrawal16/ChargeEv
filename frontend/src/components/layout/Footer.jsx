import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-10 pb-6 mt-10 text-gray-800 bg-gradient-to-r from-green-500 to-green-600">
      <div className="grid grid-cols-1 gap-10 px-6 mx-auto max-w-7xl md:grid-cols-4">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-blue-800">
            Charge<span className="italic">EV⚡</span>
          </div>
          <p className="text-sm text-gray-700">
            Powering your journey with smart station discovery. Book smarter, drive cleaner.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-green-800">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link to="/" className="hover:text-green-900">Home</Link></li>
            <li><Link to="/about" className="hover:text-green-900">About Us</Link></li>
            <li><Link to="/charging-stations" className="hover:text-green-900">Find Stations</Link></li>
            <li><Link to="/contact" className="hover:text-green-900">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-green-800">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link to="/blog" className="hover:text-green-900">Blog</Link></li>
            <li><Link to="/faq" className="hover:text-green-900">FAQ</Link></li>
            <li><a href="mailto:support@chargeev.com" className="hover:text-green-900">Support</a></li>
          </ul>
        </div>

        {/* Social and Contact */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-green-800">Connect with Us</h3>
          <div className="flex gap-3 mb-4">
            <a href="#" className="p-2 text-green-700 bg-white rounded-full shadow hover:bg-green-100"><FaFacebookF /></a>
            <a href="#" className="p-2 text-green-700 bg-white rounded-full shadow hover:bg-green-100"><FaTwitter /></a>
            <a href="#" className="p-2 text-green-700 bg-white rounded-full shadow hover:bg-green-100"><FaInstagram /></a>
            <a href="#" className="p-2 text-green-700 bg-white rounded-full shadow hover:bg-green-100"><FaLinkedin /></a>
          </div>
          <p className="text-sm text-gray-700">📧 support@chargeev.com</p>
          <p className="text-sm text-gray-700">📞 +91 98765 43210</p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="pt-4 mt-10 text-sm text-center text-gray-600 border-t border-green-400">
        © {new Date().getFullYear()} ChargeEV. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
