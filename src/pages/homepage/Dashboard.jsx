
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import SearchBar from "../../components/Searchbar.jsx";
// import { FaWhatsapp, FaClock, FaUsers } from "react-icons/fa";
// import { Typewriter } from "react-simple-typewriter";

// import kathmanduImg from '../../assets/images/kathmandu.PNG';
// import lalitpurImg from '../../assets/images/lalitpur.PNG';
// import bhaktapurImg from '../../assets/images/bhaktapur.PNG';
// import searchGif from '../../assets/images/search.gif';
// import roompopGif from '../../assets/images/roompop.gif';
// import advertisementGif from '../../assets/images/advertisement.gif';
// import leftGif from '../../assets/images/logo1.png';
// import rightGif from '../../assets/images/right.gif';

// const Dashboard = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [featuredIndex, setFeaturedIndex] = useState(0);
//   const [quickMealsIndex, setQuickMealsIndex] = useState(0);
//   const [popularIndex, setPopularIndex] = useState(0);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Get user info to check if admin
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (e) {
//         console.error("Error parsing user data:", e);
//       }
//     }

//     fetch("http://localhost:3000/api/recipes", {
//       headers: {
//         Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") ?? '{}').token}`
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Ensure data is an array before setting it
//         if (Array.isArray(data)) {
//           setRecipes(data);
//         } else {
//           console.error("API returned non-array data:", data);
//           setRecipes([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching recipes:", error);
//         setRecipes([]);
//       });
//   }, []);

//   useEffect(() => {
//     if (recipes.length > 4) {
//       const interval = setInterval(() => {
//         setActiveIndex((prev) => (prev + 1) % (recipes.length - 3));
//       }, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [recipes.length]);

//   // Add safety checks to ensure recipes is an array before calling slice
//   const getVisibleRecipes = () => {
//     if (!Array.isArray(recipes)) return [];
//     return recipes.length <= 4 ? recipes : recipes.slice(activeIndex, activeIndex + 4);
//   };
  
//   const getVisibleFeaturedRecipes = () => {
//     if (!Array.isArray(recipes)) return [];
//     return recipes.length <= 4 ? recipes : recipes.slice(featuredIndex, featuredIndex + 4);
//   };
  
//   const getVisibleQuickMeals = () => {
//     if (!Array.isArray(recipes)) return [];
//     const quickMeals = recipes.filter(recipe => recipe.prepTime <= 30);
//     return quickMeals.length <= 4 ? quickMeals : quickMeals.slice(quickMealsIndex, quickMealsIndex + 4);
//   };
  
//   const getVisiblePopularRecipes = () => {
//     if (!Array.isArray(recipes)) return [];
//     // Show recent recipes
//     const recentRecipes = recipes.slice(0, 4);
//     return recentRecipes.length <= 4 ? recentRecipes : recentRecipes.slice(popularIndex, popularIndex + 4);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
//       {/* Hero Section */}
//       <section className="w-full py-20 px-4 md:px-0 flex flex-col items-center text-center bg-gradient-to-r from-orange-200 to-red-100 relative overflow-hidden">
//         <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('../../assets/images/bg.avif')] bg-cover bg-center" />
//         <h1 className="text-5xl md:text-6xl font-extrabold text-orange-900 mb-4 drop-shadow-xl tracking-tight">
//           <Typewriter words={["The Cookbook"]} loop={1} cursor cursorStyle="|" typeSpeed={70} deleteSpeed={50} delaySpeed={1000} />
//         </h1>
//         <p className="text-xl md:text-2xl text-orange-800 mb-8 max-w-2xl font-medium">
//           Find. Cook. Enjoy. Your journey to delicious home cooking starts here.
//         </p>

//         <div className="w-full max-w-2xl mb-8 z-10">
//           <SearchBar recipes={recipes} />
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4 mb-10 z-10">
//           <Link to="/recipes" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105">
//             Browse Recipes
//           </Link>
//           {/* Only show "Share Your Recipe" for admin users */}
//           {user && user.role === 'admin' && (
//             <Link to="/addRecipes" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105">
//               Share Your Recipe
//             </Link>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10 z-10">
//           {[
//             { name: 'Breakfast', img: kathmanduImg, category: 'breakfast' }, 
//             { name: 'Lunch', img: lalitpurImg, category: 'lunch' }, 
//             { name: 'Dinner', img: bhaktapurImg, category: 'dinner' }
//           ].map(category => (
//             <Link key={category.name} to={`/recipes?category=${category.category}`} className="flex flex-col items-center group hover:scale-105 transition-transform">
//               <img src={category.img} alt={category.name} className="w-24 h-24 rounded-full border-4 border-orange-300 shadow-lg group-hover:ring-4 group-hover:ring-orange-200" />
//               <span className="mt-2 text-orange-900 font-semibold text-lg">{category.name}</span>
//             </Link>
//           ))}
//         </div>

//         <div className="flex flex-wrap justify-center gap-6 z-10">
//           {[searchGif, roompopGif, advertisementGif].map((gif, i) => (
//             <img key={i} src={gif} alt="feature gif" className="w-32 h-24 object-contain rounded-xl shadow-md" />
//           ))}
//         </div>
//       </section>

//       {/* Recipe Sections */}
//       {[
//         { title: 'Featured Recipes', color: 'orange', data: getVisibleRecipes() },
//         { title: 'Quick Meals (30 min or less)', color: 'green', data: getVisibleQuickMeals() },
//         { title: 'Popular This Week', color: 'purple', data: getVisiblePopularRecipes() },
//         { title: 'Latest Additions', color: 'blue', data: getVisibleFeaturedRecipes() }
//       ].map((section, i) => (
//         <section key={i} className="pt-16 px-4 md:px-0">
//           <div className="max-w-7xl mx-auto border-4 border-gray-200 rounded-3xl p-8 shadow-xl bg-white">
//             <h2 className={`text-3xl font-bold text-${section.color}-700 mb-8`}>{section.title}</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {section.data.length > 0 ? section.data.map((recipe, idx) => (
//                 <div key={idx} className={`relative bg-${section.color}-50 p-4 shadow-md rounded-xl group border border-${section.color}-100 transition hover:shadow-xl`}>
//                   <div className="absolute top-2 left-2 bg-white/80 px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow">
//                     ₹{recipe.totalPrice}
//                   </div>
//                   <img src={`http://localhost:3000/${recipe.recipeImage}`} alt="Recipe" className="w-full h-48 object-cover rounded-md mb-3 transition-transform duration-300 group-hover:scale-105" />
//                   <h3 className={`text-lg font-semibold text-${section.color}-900 mb-1`}>{recipe.title}</h3>
//                   <p className={`text-${section.color}-700 text-sm mb-2`}>{recipe.description?.substring(0, 60)}...</p>
//                   <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//                     <div className="flex items-center">
//                       <FaClock className="mr-1" />
//                       {recipe.prepTime} min
//                     </div>
//                     <div className="flex items-center">
//                       <FaUsers className="mr-1" />
//                       {recipe.servings} servings
//                     </div>
//                   </div>
//                   <Link to={`/recipe-details/${recipe._id}`} className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-${section.color}-600/80 text-white font-bold text-lg rounded-md`}>
//                     View Recipe
//                   </Link>
//                 </div>
//               )) : (
//                 <p className={`col-span-full text-center text-${section.color}-700`}>No {section.title} available.</p>
//               )}
//             </div>
//           </div>
//         </section>
//       ))}

//       {/* Sponsor GIF Section */}
//       <section className="my-12 flex flex-col md:flex-row justify-between items-center gap-6 px-4 md:px-0 max-w-7xl mx-auto">
//         <img src={leftGif} alt="Sponsor GIF Left" className="w-64 h-40 object-cover rounded-xl shadow-md" />
//         <img src={advertisementGif} alt="Sponsor GIF Center" className="w-full md:w-1/2 h-24 object-cover rounded-xl shadow-md" />
//         <img src={rightGif} alt="Sponsor GIF Right" className="w-64 h-40 object-cover rounded-xl shadow-md" />
//       </section>

//       {/* WhatsApp Button */}
//       <a href="https://wa.me/9862242899" target="_blank" rel="noopener noreferrer"
//         className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-xl transition hover:scale-110 z-50">
//         <FaWhatsapp className="w-8 h-8" />
//       </a>
//     </div>
//   );
// };

// export default Dashboard;

// ... existing imports ...
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Searchbar.jsx";
import { FaWhatsapp, FaClock, FaUsers, FaMapMarkerAlt, FaLock, FaPiggyBank } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

// import kathmanduImg from '../../assets/images/kathmandu.PNG';
// import lalitpurImg from '../../assets/images/lalitpur.PNG';
// import bhaktapurImg from '../../assets/images/bhaktapur.PNG';
// import searchGif from '../../assets/images/search.gif';
// import roompopGif from '../../assets/images/roompop.gif';
// import advertisementGif from '../../assets/images/advertisement.gif';
// import leftGif from '../../assets/images/logo1.png';
// import rightGif from '../../assets/images/right.gif';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [quickMealsIndex, setQuickMealsIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info to check if admin
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }

    fetch("http://localhost:3000/api/recipes", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") ?? '{}').token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Ensure data is an array before setting it
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error("API returned non-array data:", data);
          setRecipes([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      });
  }, []);

  useEffect(() => {
    if (recipes.length > 4) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % (recipes.length - 3));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [recipes.length]);

  // Add safety checks to ensure recipes is an array before calling slice
  const getVisibleRecipes = () => {
    if (!Array.isArray(recipes)) return [];
    return recipes.length <= 4 ? recipes : recipes.slice(activeIndex, activeIndex + 4);
  };
  
  const getVisibleFeaturedRecipes = () => {
    if (!Array.isArray(recipes)) return [];
    return recipes.length <= 4 ? recipes : recipes.slice(featuredIndex, featuredIndex + 4);
  };
  
  const getVisibleQuickMeals = () => {
    if (!Array.isArray(recipes)) return [];
    const quickMeals = recipes.filter(recipe => recipe.prepTime <= 30);
    return quickMeals.length <= 4 ? quickMeals : quickMeals.slice(quickMealsIndex, quickMealsIndex + 4);
  };
  
  const getVisiblePopularRecipes = () => {
    if (!Array.isArray(recipes)) return [];
    // Show recent recipes
    const recentRecipes = recipes.slice(0, 4);
    return recentRecipes.length <= 4 ? recentRecipes : recentRecipes.slice(popularIndex, popularIndex + 4);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="w-full mt-24 mb-4 px-4 flex justify-center items-center bg-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          {/* Centered, larger Hero Card */}
          <div className="bg-[#509343] rounded-2xl shadow-xl px-24 py-14 flex flex-col justify-center items-start min-w-[600px] max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-xl tracking-tight leading-tight">
              Enjoy hassle-free home cooked meals
            </h1>
            <p className="text-lg md:text-xl text-white mb-6 font-medium leading-snug">
              Skip the grocery trip and get recipes delivered right to your kitchen. Fresh, popular, or curated, all fitting your mood!
            </p>
            <Link
              to="/recipes"
              className="bg-[#0B5A02] hover:bg-green-900 text-white font-bold py-4 px-12 rounded-full shadow-md transition-transform hover:scale-105 text-lg"
            >
              View Recipes
            </Link>
          </div>
          {/* Centered, larger image */}
          <img
            src="src\assets\images\meal4.png"
            alt="Hero"
            className="w-[500px] h-[400px] object-contain"
          />
        </div>
      </section>

      {/* Features Row */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 py-8 px-4 mt-12">
        <div className="flex flex-col items-center flex-1">
          <FaMapMarkerAlt className="w-12 h-12 mb-2 text-gray-800" />
          <span className="font-semibold text-lg text-[#509343]">Availability</span>
          <span className="text-gray-600 text-center text-sm">Care handpicked with lots of options for everyone, at affordable prices.</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <FaLock className="w-12 h-12 mb-2 text-gray-800" />
          <span className="font-semibold text-lg text-[#509343]">Secured</span>
          <span className="text-gray-600 text-center text-sm">Direct communication and secure payment methods for your peace of mind.</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <FaPiggyBank className="w-12 h-12 mb-2 text-gray-800" />
          <span className="font-semibold text-lg text-[#509343]">Savings</span>
          <span className="text-gray-600 text-center text-sm">Affordable rates and exclusive discounts available for all users.</span>
        </div>
      </div>

      {/* Choose Recipe Section */}
      <section className="mt-4 pt-4 pb-16 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B5A02]">
              Choose the recipe that suits your mood!
            </h2>
            <Link to="/recipes" className="text-[#509343] font-semibold hover:underline text-lg">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {getVisibleRecipes().length > 0 ? getVisibleRecipes().map((recipe, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105"
              >
                <img
                  src={`http://localhost:3000/${recipe.recipeImage}`}
                  alt="Recipe"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[#0B5A02] mb-1">{recipe.title}</h3>
                  <p className="text-gray-700 text-sm mb-2 flex-1">{recipe.description?.substring(0, 60)}...</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      {recipe.prepTime} min
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      {recipe.servings} servings
                    </div>
                  </div>
                  <Link
                    to={`/recipe-details/${recipe._id}`}
                    className="mt-2 bg-[#0B5A02] hover:bg-green-900 text-white font-semibold py-2 rounded-lg text-center transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )) : (
              <p className="col-span-full text-center text-[#509343]">No recipes available.</p>
            )}
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/9862242899"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-xl transition hover:scale-110 z-50"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>
    </div>
  );
};

export default Dashboard;