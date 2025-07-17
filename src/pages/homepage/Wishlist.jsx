// components/Wishlist.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Wishlist = () => {
  const [wishlistRooms, setWishlistRooms] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    fetch("http://localhost:3000/api/rooms", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") ?? '{}').token}`,
      },
    })
      .then((res) => res.json())
      .then((allFlats) => {
        const wishlistFlats = allFlats.filter((flat) => wishlist.includes(flat._id));
        setWishlistRooms(wishlistFlats);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5">
      <div className="pt-20 px-6 pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center flex items-center justify-center">
            <span className="mr-3"></span>
            My Wishlist
            <span className="ml-3"></span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistRooms.length > 0 ? (
              wishlistRooms.map((room) => (
                <Link
                  key={room._id}
                  to={`/flat-details/${room._id}`}
                  className="group relative bg-white p-4 shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={`http://localhost:3000/${room.roomImage}`}
                      alt="Room"
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                      ₹{room.rentPrice}/mo
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {room.roomDescription}
                    </h3>
                    <p className="text-gray-600 text-sm flex items-center">
                      📍 {room.address}
                    </p>
                    <p className="text-gray-600 text-sm flex items-center">
                      🏢 Floor {room.floor}
                    </p>
                    <p className="text-gray-600 text-sm flex items-center">
                      📞 {room.contactNo}
                    </p>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">View Details</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-6">Start exploring rooms and add them to your wishlist!</p>
                <Link 
                  to="/rooms" 
                  className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Browse Rooms
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;