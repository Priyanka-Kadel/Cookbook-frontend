//###1

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { FaClock, FaUsers, FaShoppingCart, FaMinus, FaPlus, FaHeart, FaUser, FaCaretDown, FaUtensils, FaHome, FaCrown, FaSignOutAlt } from "react-icons/fa";
// import SavedRecipes from "../../components/SavedRecipes.jsx";

// const RecipeDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);
//   const [similarRecipes, setSimilarRecipes] = useState([]);
//   const [servings, setServings] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if user is logged in
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const userObj = JSON.parse(storedUser);
//         setUser(userObj);
//       } catch (e) {
//         console.error("Error parsing user data:", e);
//       }
//     }

//     const fetchData = async () => {
//       try {
//         // Fetch recipe details - try with auth first, then without
//         let recipeResponse;
//         try {
//           const token = JSON.parse(localStorage.getItem("user") ?? '{}').token;
//           recipeResponse = await axios.get(
//             `http://localhost:3000/api/recipes/${id}`,
//             {
//               headers: token ? { Authorization: `Bearer ${token}` } : {}
//             }
//           );
//         } catch (error) {
//           // If auth fails, try without auth
//           recipeResponse = await axios.get(
//             `http://localhost:3000/api/recipes/${id}`
//           );
//         }
        
//         setRecipe(recipeResponse.data);
//         setServings(recipeResponse.data.servings || 1);

//         // Fetch similar recipes
//         let allRecipesResponse;
//         try {
//           const token = JSON.parse(localStorage.getItem("user") ?? '{}').token;
//           allRecipesResponse = await axios.get(
//             "http://localhost:3000/api/recipes",
//             {
//               headers: token ? { Authorization: `Bearer ${token}` } : {}
//             }
//           );
//         } catch (error) {
//           // If auth fails, try without auth
//           allRecipesResponse = await axios.get(
//             "http://localhost:3000/api/recipes"
//           );
//         }
        
//         const similar = allRecipesResponse.data
//           .filter((r) => r._id !== id)
//           .sort(() => 0.5 - Math.random())
//           .slice(0, 3);
//         setSimilarRecipes(similar);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Show more specific error message
//         if (error.response?.status === 404) {
//           alert("Recipe not found. It may have been removed or doesn't exist.");
//         } else {
//           alert("Error loading recipe. Please try again.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleServingsChange = (newServings) => {
//     if (newServings >= 1) {
//       setServings(newServings);
//     }
//   };

//   const calculateIngredientQuantity = (originalQuantity, originalServings) => {
//     if (!originalQuantity || !originalServings) return originalQuantity;
//     return (originalQuantity * servings) / originalServings;
//   };

//   const calculatePriceForServings = () => {
//     if (!recipe) return 0;
//     return (recipe.totalPrice * servings) / recipe.servings;
//   };

//   const addToCart = () => {
//     if (!user) {
//       alert("Please log in to add recipes to your cart!");
//       navigate("/login");
//       return;
//     }

//     // Always use the same key as Cart.jsx
//     const userCartKey = `cart_${user.id}`;
//     const cart = JSON.parse(localStorage.getItem(userCartKey) || "[]");
//     const cartItem = {
//       recipeId: recipe._id,
//       title: recipe.title,
//       servings: servings,
//       price: calculatePriceForServings(),
//       image: recipe.recipeImage,
//       ingredients: recipe.ingredients,
//       addedAt: new Date().toISOString()
//     };
    
//     // Check if recipe already in cart
//     const existingIndex = cart.findIndex(item => item.recipeId === recipe._id);
//     if (existingIndex >= 0) {
//       cart[existingIndex] = cartItem; // Update existing item
//     } else {
//       cart.push(cartItem); // Add new item
//     }
    
//     // Save to user's unique cart
//     localStorage.setItem(userCartKey, JSON.stringify(cart));
    
//     // Update cart count in navbar
//     const event = new CustomEvent('cartUpdated', { detail: cart.length });
//     window.dispatchEvent(event);
    
//     // Show success message
//     alert("Recipe added to cart! Check your cart to proceed with checkout.");
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   if (!recipe) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-600 text-lg">Recipe not found</p>
//         <Link to="/recipes" className="text-orange-600 hover:text-orange-700 mt-2 inline-block">
//           Back to Recipes
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen pt-20">
//       <div className="flex-grow px-6 pb-12">
//         <div className="max-w-6xl mx-auto">
//           {/* Breadcrumb */}
//           <nav className="mb-6">
//             <ol className="flex items-center space-x-2 text-sm text-gray-600">
//               <li><Link to="/" className="hover:text-orange-600">Home</Link></li>
//               <li>/</li>
//               <li><Link to="/recipes" className="hover:text-orange-600">Recipes</Link></li>
//               <li>/</li>
//               <li className="text-gray-900">{recipe?.title}</li>
//             </ol>
//           </nav>

//           {/* Recipe Header */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
//             <div className="flex flex-col lg:flex-row">
//               {/* Recipe Image */}
//               <div className="lg:w-1/2">
//                 <img
//                   src={`http://localhost:3000/${recipe?.recipeImage}`}
//                   alt={recipe?.title}
//                   className="w-full h-96 lg:h-full object-cover"
//                 />
//               </div>

//               {/* Recipe Info */}
//               <div className="lg:w-1/2 p-8">
//                 <div className="flex justify-between items-start mb-4">
//                   <h1 className="text-3xl font-bold text-gray-900">{recipe?.title}</h1>
//                   {user && <SavedRecipes recipeId={recipe?._id} />}
//                 </div>
                
//                 <p className="text-gray-600 mb-6">{recipe?.description}</p>
                
//                 <div className="flex items-center space-x-6 mb-6">
//                   <div className="flex items-center text-gray-600">
//                     <FaClock className="mr-2 text-orange-500" />
//                     <span>{recipe?.prepTime} min</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <FaUsers className="mr-2 text-orange-500" />
//                     <span>{recipe?.servings} servings</span>
//                   </div>
//                   <div className="text-orange-600 font-semibold">
//                     ₹{recipe?.totalPrice}
//                   </div>
//                 </div>

//                 {/* Servings Selector - only show for authenticated users */}
//                 {user && (
//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Adjust Servings
//                     </label>
//                     <div className="flex items-center space-x-4">
//                       <button
//                         onClick={() => handleServingsChange(servings - 1)}
//                         className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center text-orange-600"
//                       >
//                         <FaMinus />
//                       </button>
//                       <span className="text-xl font-semibold w-12 text-center">{servings}</span>
//                       <button
//                         onClick={() => handleServingsChange(servings + 1)}
//                         className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center text-orange-600"
//                       >
//                         <FaPlus />
//                       </button>
//                     </div>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Price for {servings} serving{servings !== 1 ? 's' : ''}: ₹{calculatePriceForServings()}
//                     </p>
//                   </div>
//                 )}

//                 {/* Add to Cart Button - different behavior for authenticated vs non-authenticated users */}
//                 {user ? (
//                   <button
//                     onClick={addToCart}
//                     className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <FaShoppingCart />
//                     <span>Buy Ingredients for ₹{calculatePriceForServings()}</span>
//                   </button>
//                 ) : (
//                   <Link
//                     to="/login"
//                     className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
//                   >
//                     <FaShoppingCart />
//                     <span>Login to Add to Cart</span>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Recipe Content */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Ingredients */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
//               <div className="space-y-3">
//                 {recipe?.ingredients && recipe.ingredients.map((ingredient, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
//                     <span className="font-medium text-gray-800">{ingredient.name}</span>
//                     <span className="text-orange-600 font-semibold">
//                       {calculateIngredientQuantity(ingredient.quantity, recipe.servings)} {ingredient.unit}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Instructions */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
//               <div className="space-y-4">
//                 {recipe?.steps && recipe.steps.map((step, index) => (
//                   <div key={step._id || index} className="flex">
//                     <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
//                       {step.stepNumber || index + 1}
//                     </div>
//                     <p className="text-gray-700 leading-relaxed">{step.instruction || step}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Similar Recipes */}
//           {similarRecipes.length > 0 && (
//             <div className="mt-12">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {similarRecipes.map((similarRecipe) => (
//                   <Link
//                     key={similarRecipe._id}
//                     to={`/recipe-details/${similarRecipe._id}`}
//                     className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//                   >
//                     <img
//                       src={`http://localhost:3000/${similarRecipe.recipeImage}`}
//                       alt={similarRecipe.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="p-4">
//                       <h3 className="font-semibold text-gray-900 mb-2">{similarRecipe.title}</h3>
//                       <div className="flex items-center justify-between text-sm text-gray-600">
//                         <span>{similarRecipe.prepTime} min</span>
//                         <span className="text-orange-600 font-semibold">₹{similarRecipe.totalPrice}</span>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetails; 





// //###2

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { FaClock, FaHeart } from "react-icons/fa";

// const RecipeDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);
//   const [servings, setServings] = useState(1);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const userObj = JSON.parse(storedUser);
//         setUser(userObj);
//       } catch (e) {
//         console.error("Error parsing user data:", e);
//       }
//     }

//     const fetchData = async () => {
//       try {
//         // Fetch recipe details - try with auth first, then without
//         let recipeResponse;
//         try {
//           const token = JSON.parse(localStorage.getItem("user") ?? '{}').token;
//           recipeResponse = await axios.get(
//             `http://localhost:3000/api/recipes/${id}`,
//             {
//               headers: token ? { Authorization: `Bearer ${token}` } : {}
//             }
//           );
//         } catch (error) {
//           // If auth fails, try without auth
//           recipeResponse = await axios.get(
//             `http://localhost:3000/api/recipes/${id}`
//           );
//         }
//         setRecipe(recipeResponse.data);
//         setServings(recipeResponse.data.servings || 1);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         alert("Error loading recipe. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   // --- Buy Ingredients Functionality ---
//   const addToCart = () => {
//     if (!user) {
//       alert("Please log in to add recipes to your cart!");
//       navigate("/login");
//       return;
//     }
//     const userCartKey = `cart_${user.id}`;
//     const cart = JSON.parse(localStorage.getItem(userCartKey) || "[]");
//     const cartItem = {
//       recipeId: recipe._id,
//       title: recipe.title,
//       servings: servings,
//       price: calculatePriceForServings(),
//       image: recipe.recipeImage,
//       ingredients: recipe.ingredients,
//       addedAt: new Date().toISOString()
//     };
//     const existingIndex = cart.findIndex(item => item.recipeId === recipe._id);
//     if (existingIndex >= 0) {
//       cart[existingIndex] = cartItem;
//     } else {
//       cart.push(cartItem);
//     }
//     localStorage.setItem(userCartKey, JSON.stringify(cart));
//     const event = new CustomEvent('cartUpdated', { detail: cart.length });
//     window.dispatchEvent(event);
//     alert("Recipe added to cart! Check your cart to proceed with checkout.");
//   };

//   const calculatePriceForServings = () => {
//     if (!recipe) return 0;
//     return (recipe.totalPrice * servings) / recipe.servings;
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-700"></div>
//       </div>
//     );
//   }

//   if (!recipe) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-600 text-lg">Recipe not found</p>
//         <Link to="/recipes" className="text-green-700 hover:text-green-800 mt-2 inline-block">
//           Back to Recipes
//         </Link>
//       </div>
//     );
//   }

//   // Helper: split ingredients into 3 columns for desktop
//   const getIngredientColumns = (ingredients) => {
//     const cols = [[], [], []];
//     ingredients.forEach((item, idx) => {
//       cols[idx % 3].push(item);
//     });
//     return cols;
//   };

//   return (
//     <div className="min-h-screen bg-[#fafbfa] pt-8">
//       {/* Recipe Card Button - above the card, left-aligned */}
//       <div className="max-w-5xl mx-auto mt-8 mb-8">
//         <button className="bg-green-700 text-white font-bold text-xl px-6 py-2 rounded-lg shadow hover:bg-green-800 transition">
//           Recipe Card
//         </button>
//       </div>

//       {/* Main Card */}
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8 border border-gray-300 flex flex-col md:flex-row gap-8">
//         {/* Left: Text Content */}
//         <div className="flex-1 flex flex-col gap-y-6">
//           {/* Title & Meta */}
//           <div className="flex items-start justify-between">
//             <div>
//               <div className="flex items-center gap-4">
//                 <h1 className="text-2xl md:text-3xl font-extrabold text-black mb-1">{recipe.title}</h1>
//                 <span className="text-green-800 text-xl font-bold">₹{recipe.totalPrice}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
//                 <FaClock className="text-lg" />
//                 <span>{recipe.prepTime} Mins</span>
//               </div>
//             </div>
//             <button className="text-2xl text-gray-500 hover:text-green-700">
//               <FaHeart />
//             </button>
//           </div>
//           <p className="text-gray-800 mb-4">{recipe.description}</p>

//           {/* Servings */}
//           {recipe.servings && (
//             <div>
//               <span className="font-bold text-lg block mb-2">Servings</span>
//               <div className="flex gap-2">
//                 <span className="w-10 h-10 flex items-center justify-center bg-gray-200 border border-gray-400 rounded font-bold text-lg">{servings}</span>
//               </div>
//             </div>
//           )}

//           {/* Ingredients */}
//           <div>
//             <h2 className="font-bold text-xl mb-2">Ingredients</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 text-gray-900">
//               {recipe.ingredients && getIngredientColumns(recipe.ingredients).map((col, i) => (
//                 <ul key={i} className="list-disc list-inside space-y-1">
//                   {col.map((item, idx) => (
//                     <li key={item._id || idx}>
//                       {item.quantity} {item.unit} {item.name}
//                     </li>
//                   ))}
//                 </ul>
//               ))}
//             </div>
//           </div>

//           {/* Directions/Steps */}
//           <div>
//             <h2 className="font-bold text-xl mb-2">Directions</h2>
//             <ol className="list-decimal list-inside space-y-2 text-gray-900">
//               {(recipe.directions || recipe.steps || []).map((step, idx) => (
//                 <li key={idx}>
//                   {typeof step === "string"
//                     ? step
//                     : step.instruction || step.description || JSON.stringify(step)}
//                 </li>
//               ))}
//             </ol>
//           </div>
//         </div>

//         {/* Right: Image */}
//         <div className="flex-shrink-0 flex items-start justify-center">
//           <img
//             src={recipe.recipeImage ? `http://localhost:3000/${recipe.recipeImage}` : "/src/assets/images/meal.png"}
//             alt={recipe.title}
//             className="rounded-xl shadow w-[350px] h-[260px] object-cover border border-gray-300"
//           />
//         </div>
//       </div>

//       {/* Add to Cart Button */}
//       <div className="flex justify-center my-8">
//         <button
//           className="bg-green-700 text-white text-lg font-bold px-10 py-3 rounded-lg shadow hover:bg-green-800 transition"
//           onClick={addToCart}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetails;




//###3

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaClock, FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import SavedRecipes from "../../components/SavedRecipes";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUser(userObj);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }

    const fetchData = async () => {
      try {
        let recipeResponse;
        try {
          const token = JSON.parse(localStorage.getItem("user") ?? '{}').token;
          recipeResponse = await axios.get(
            `http://localhost:3000/api/recipes/${id}`,
            {
              headers: token ? { Authorization: `Bearer ${token}` } : {}
            }
          );
        } catch (error) {
          recipeResponse = await axios.get(
            `http://localhost:3000/api/recipes/${id}`
          );
        }
        setRecipe(recipeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading recipe. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // --- Buy Ingredients Functionality ---
  const addToCart = () => {
    if (!user) {
      alert("Please log in to add recipes to your cart!");
      navigate("/login");
      return;
    }
    const userCartKey = `cart_${user.id}`;
    const cart = JSON.parse(localStorage.getItem(userCartKey) || "[]");
    const cartItem = {
      recipeId: recipe._id,
      title: recipe.title,
      servings: servings,
      price: recipe.totalPrice * servings,
      image: recipe.recipeImage,
      ingredients: recipe.ingredients.map(ingredient => ({
        ...ingredient,
        quantity: ingredient.quantity * servings
      })),
      addedAt: new Date().toISOString()
    };
    const existingIndex = cart.findIndex(item => item.recipeId === recipe._id);
    if (existingIndex >= 0) {
      cart[existingIndex] = cartItem;
    } else {
      cart.push(cartItem);
    }
    localStorage.setItem(userCartKey, JSON.stringify(cart));
    const event = new CustomEvent('cartUpdated', { detail: cart.length });
    window.dispatchEvent(event);
    alert("Recipe added to cart! Check your cart to proceed with checkout.");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Recipe not found</p>
        <Link to="/recipes" className="text-green-700 hover:text-green-800 mt-2 inline-block">
          Back to Recipes
        </Link>
      </div>
    );
  }

  // Helper: split ingredients into 3 columns for desktop
  const getIngredientColumns = (ingredients) => {
    const cols = [[], [], []];
    ingredients.forEach((item, idx) => {
      cols[idx % 3].push(item);
    });
    return cols;
  };

  return (
    <div className="min-h-screen bg-[#fafbfa]">
      {/* Recipe Card Button - above the card, left-aligned */}
      <div className="max-w-5xl mx-auto mt-8 pt-8 mb-8">
        <button className="bg-green-700 text-white font-bold text-xl px-6 py-2 rounded-lg shadow hover:bg-green-800 transition">
          Recipe Card
        </button>
      </div>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8 border border-gray-300 flex flex-col md:flex-row gap-8">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col gap-y-6">
          {/* Title & Meta */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-extrabold text-black mb-1">{recipe.title}</h1>
                <span className="text-green-800 text-xl font-bold">₹{recipe.totalPrice * servings}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FaClock className="text-lg" />
                <span>{recipe.prepTime} Mins</span>
              </div>
            </div>
            {user && <SavedRecipes recipeId={recipe._id} />}
          </div>
          <p className="text-gray-800 mb-4">{recipe.description}</p>

          {/* Servings */}
          <div>
            <span className="font-bold text-lg block mb-2">Servings</span>
            <div className="flex items-center gap-4">
              <button
                className="w-10 h-10 flex items-center justify-center bg-gray-200 border border-gray-400 rounded font-bold text-xl hover:bg-green-100"
                onClick={() => setServings(s => Math.max(1, s - 1))}
                aria-label="Decrease servings"
              >
                <FaMinus />
              </button>
              <span className="w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-400 rounded font-bold text-lg">{servings}</span>
              <button
                className="w-10 h-10 flex items-center justify-center bg-gray-200 border border-gray-400 rounded font-bold text-xl hover:bg-green-100"
                onClick={() => setServings(s => (s < 15 ? s + 1 : s))}
                aria-label="Increase servings"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="font-bold text-xl mb-2">Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 text-gray-900">
              {recipe.ingredients && getIngredientColumns(recipe.ingredients).map((col, i) => (
                <ul key={i} className="list-disc list-inside space-y-1">
                  {col.map((item, idx) => (
                    <li key={item._id || idx}>
                      {item.quantity * servings} {item.unit} {item.name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Directions/Steps */}
          <div>
            <h2 className="font-bold text-xl mb-2">Directions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-900">
              {(recipe.directions || recipe.steps || []).map((step, idx) => (
                <li key={idx}>
                  {typeof step === "string"
                    ? step
                    : step.instruction || step.description || JSON.stringify(step)}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-shrink-0 flex items-start justify-center">
          <img
            src={recipe.recipeImage ? `http://localhost:3000/${recipe.recipeImage}` : "/src/assets/images/meal.png"}
            alt={recipe.title}
            className="rounded-xl shadow w-[350px] h-[260px] object-cover border border-gray-300"
          />
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="flex justify-center my-8">
        <button
          className="bg-green-700 text-white text-lg font-bold px-8 py-2 rounded-lg shadow hover:bg-green-800 transition"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;






