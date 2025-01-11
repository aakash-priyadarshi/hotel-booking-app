// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => (
<nav className="bg-white shadow-md mb-8">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="flex items-center justify-between h-16">
      <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
        Hotel Booking
      </Link>
      <div className="flex gap-8">
        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Book Room</Link>
        <Link to="/bookings" className="text-gray-600 hover:text-blue-600 font-medium">My Bookings</Link>
        <Link to="/guests" className="text-gray-600 hover:text-blue-600 font-medium">Guest List</Link>
      </div>
    </div>
  </div>
</nav>
);

export default Navbar;