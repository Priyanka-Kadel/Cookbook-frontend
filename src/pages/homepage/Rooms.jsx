import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [flats, setFlats] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/rooms?show=true", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") ?? '{}').token}`
      },
    }
    )
      .then((response) => response.json())
      .then((data) => setFlats(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  // Get unique locations for dropdown
  const locations = Array.from(new Set(flats.map(f => f.address?.split(",")[0]?.trim()))).filter(Boolean);

  // Filtering logic
  const filteredFlats = flats.filter(flat => {
    const matchesSearch =
      flat.roomDescription.toLowerCase().includes(search.toLowerCase()) ||
      flat.address.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location ? flat.address.toLowerCase().includes(location.toLowerCase()) : true;
    let matchesPrice = true;
    if (price === "lt10k") matchesPrice = flat.rentPrice < 10000;
    else if (price === "10k-20k") matchesPrice = flat.rentPrice >= 10000 && flat.rentPrice <= 20000;
    else if (price === "20k-30k") matchesPrice = flat.rentPrice > 20000 && flat.rentPrice <= 30000;
    else if (price === "gt30k") matchesPrice = flat.rentPrice > 30000;
    return matchesSearch && matchesLocation && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">Available Rooms</h1>
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center bg-blue-50 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search by address or description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Locations</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Prices</option>
          <option value="lt10k">Below ₹10,000</option>
          <option value="10k-20k">₹10,000 - ₹20,000</option>
          <option value="20k-30k">₹20,000 - ₹30,000</option>
          <option value="gt30k">Above ₹30,000</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFlats.length > 0 ? (
          filteredFlats.map((flat) => (
            <div key={flat._id} className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
              <img src={`http://localhost:3000/${flat.roomImage}`} alt="Room" className="w-full h-48 object-cover rounded mb-3" />
              <h2 className="text-lg font-semibold text-blue-900 mb-1">{flat.roomDescription}</h2>
              <p className="text-blue-700 text-sm">Price: ₹{flat.rentPrice}</p>
              <p className="text-blue-700 text-sm">Address: {flat.address}</p>
              <Link to={`/flat-details/${flat._id}`} className="block mt-2 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded font-bold">View Details</Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-blue-700">No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
