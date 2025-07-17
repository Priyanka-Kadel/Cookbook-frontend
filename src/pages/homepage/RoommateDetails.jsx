import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RoommateDetails = () => {
  const { id } = useParams();
  const [roommate, setRoommate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/roommates/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Not found');
        return response.json();
      })
      .then((data) => {
        // Defensive: handle empty object or array
        if (!data || Object.keys(data).length === 0 || Array.isArray(data)) {
          setRoommate(undefined);
        } else {
          setRoommate(data);
        }
      })
      .catch((error) => {
        setRoommate(undefined);
        console.error("Error fetching roommate:", error);
      });
  }, [id]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setSendStatus("Message cannot be empty");
      return;
    }
    setIsSending(true);
    setSendStatus(null);
    try {
      // You can customize the email sending logic as needed
      await fetch("http://localhost:3000/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: roommate.email || "basobasmitra20@gmail.com",
          subject: `Inquiry about Roommate ${roommate.name}`,
          text: `User Message: ${message}\n\nRoommate Details:\n${JSON.stringify(roommate, null, 2)}`,
        }),
      });
      setSendStatus("Message sent successfully!");
      setMessage("");
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (error) {
      setSendStatus("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  if (roommate === null) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }
  if (roommate === undefined) {
    return <p className="text-center text-red-600">Roommate not found.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="flex-grow pt-20 px-6 pb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Roommate Details</h2>
        <div className="border border-blue-200 rounded-lg p-8 bg-white shadow-lg max-w-3xl mx-auto mb-12 flex flex-col items-center">
          <img
            src={roommate.roommateImage ? `http://localhost:3000/${roommate.roommateImage}` : "/default-avatar.png"}
            alt="Roommate"
            className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-blue-200 mb-4"
          />
          <h3 className="text-2xl font-bold text-blue-900 mb-2">{roommate.name}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">{roommate.gender}</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">Age: {roommate.age}</span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">Budget: ₹{roommate.budget}</span>
          </div>
          <div className="mb-2 text-blue-700 text-sm">
            <span className="font-semibold">Preferred Location:</span> {roommate.preferredLocation}
          </div>
          <div className="mb-2 text-blue-700 text-sm">
            <span className="font-semibold">Contact:</span> {roommate.contactNo}
          </div>
          <div className="mb-4 text-blue-700 text-sm text-center">
            <span className="font-semibold">Bio:</span> {roommate.bio}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 w-64 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Ask About This Roommate
          </button>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 w-64 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
          >
            Back
          </button>
        </div>
        {/* Email Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h3 className="text-xl font-bold mb-4">Ask About This Roommate</h3>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Type your question here..."
                maxLength="500"
              />
              {sendStatus && (
                <p className={`mb-4 text-sm ${sendStatus.includes("success") ? "text-green-600" : "text-red-600"}`}>{sendStatus}</p>
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={isSending}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoommateDetails;
