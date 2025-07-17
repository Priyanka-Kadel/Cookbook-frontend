// import {
//   FaEnvelope,
//   FaFileAlt,
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaPhoneSquareAlt,
//   FaQuestionCircle,
//   FaShieldAlt,
//   FaUser,
// } from "react-icons/fa"; // Import Font Awesome icons
// import "tailwindcss/tailwind.css"; // Import Tailwind CSS
// import parts from "../assets/icons/logo1.png";

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white py-6 mt-6">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
//           {/* Left Section with Icons */}
//           <div className="flex flex-col justify-center items-start space-y-4">
//             <div className="flex items-center space-x-2">
//               <FaMapMarkerAlt className="w-5 h-5" /> {/* Address Icon */}
//               <p className="text-sm font-bold">Boudha, Kathmandu 44600</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <FaEnvelope className="w-5 h-5" /> {/* Email Icon */}
//               <p className="text-sm font-bold">basobasmitra@gmail.com</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <FaPhoneAlt className="w-5 h-5" /> {/* Phone Icon */}
//               <p className="text-sm font-bold">+977-999999999</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <FaUser className="w-5 h-5" /> {/* Developer Icon */}
//               <p className="text-sm font-bold">Sashwat Pyakurel</p>
//             </div>
//           </div>

//           {/* Logo Section (Center) */}
//           <div className="flex justify-center">
//             <a href="/">
//               <img src={parts} alt="Your Logo" className="w-32" />{" "}
//               {/* Increased logo size */}
//             </a>
//           </div>

//           {/* Quick Links Section (Extreme Right) */}
//           <div className="flex justify-end space-y-2">
//             <ul className="list-none text-sm space-y-2">
//               <li className="flex items-center space-x-2">
//                 <FaShieldAlt className="w-5 h-5" /> {/* Privacy Icon */}
//                 <a
//                   href="/privacypolicy"
//                   className="text-white hover:text-gray-400 font-bold"
//                 >
//                   Privacy Policy
//                 </a>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <FaFileAlt className="w-5 h-5" /> {/* Terms Icon */}
//                 <a
//                   href="/termscondition"
//                   className="text-white hover:text-gray-400 font-bold"
//                 >
//                   Terms of Use
//                 </a>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <FaQuestionCircle className="w-5 h-5" /> {/* FAQ Icon */}
//                 <a
//                   href="/faq"
//                   className="text-white hover:text-gray-400 font-bold"
//                 >
//                   FAQ
//                 </a>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <FaPhoneSquareAlt className="w-5 h-5" /> {/* Contact Icon */}
//                 <a
//                   href="/contactus"
//                   className="text-white hover:text-gray-400 font-bold"
//                 >
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Copyright Section */}
//         <p className="text-center mt-6 text-xs text-gray-400 font-bold">
//           &copy; 2025 basobasmitra- Sashwat Pyakurel. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-transparent py-16 flex justify-center">
    <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full px-12 py-14 flex flex-col md:flex-row justify-between items-start gap-16">
      {/* Contact Info */}
      <div className="flex flex-col md:flex-row gap-16 flex-1">
        {/* Address */}
        <div className="flex items-start gap-3">
          <span className="bg-[#0B5A02] rounded-full p-2 flex items-center justify-center">
            <FaMapMarkerAlt className="text-white w-5 h-5" />
          </span>
          <div>
            <div className="text-sm text-gray-700">Address</div>
            <div className="font-bold text-black">Dilibazaar, Kathmandu, Nepal</div>
          </div>
        </div>
        {/* Email */}
        <div className="flex items-start gap-3">
          <span className="bg-[#0B5A02] rounded-full p-2 flex items-center justify-center">
            <FaEnvelope className="text-white w-5 h-5" />
          </span>
          <div>
            <div className="text-sm text-gray-700">Email</div>
            <div className="font-bold text-black">thecookbook2121@gmail.com</div>
          </div>
        </div>
        {/* Phone */}
        <div className="flex items-start gap-3">
          <span className="bg-[#0B5A02] rounded-full p-2 flex items-center justify-center">
            <FaPhone className="text-white w-5 h-5" />
          </span>
          <div>
            <div className="text-sm text-gray-700">Phone</div>
            <div className="font-bold text-black">+9745709544</div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="flex-1">
        <div className="font-bold mb-2">Everything You Need, All In One Box</div>
        <div className="text-sm text-gray-700">
          Discover a world of delicious possibilities with Cookbook. Enjoy easy-to-follow instructions, fresh ideas, and a community passionate about great food, right at your fingertips.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
