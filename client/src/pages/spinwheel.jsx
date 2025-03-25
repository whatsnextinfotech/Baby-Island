import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { motion } from "framer-motion";

const SpinWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState("");

  const data = [
    { option: "10% OFF", style: { backgroundColor: "#FF6B6B", textColor: "#fff" } },
    { option: "20% OFF", style: { backgroundColor: "#FFB36B", textColor: "#fff" } },
    { option: "30% OFF", style: { backgroundColor: "#FFD166", textColor: "#fff" } },
    { option: "Free Shipping", style: { backgroundColor: "#06D6A0", textColor: "#fff" } },
    { option: "No Luck", style: { backgroundColor: "#118AB2", textColor: "#fff" } },
    { option: "Try Again", style: { backgroundColor: "#073B4C", textColor: "#fff" } },
  ];

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Button to Open Spin Wheel */}
      <motion.button
        className="px-6 py-3 text-white text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        🎡 Spin & Win Exciting Offers!
      </motion.button>

      {/* Modal with Spin Wheel */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl w-96 text-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Spin the Wheel & Win! 🎉</h2>
            
            {/* Spin Wheel */}
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={() => {
                setMustSpin(false);
                setWinner(data[prizeNumber].option);
              }}
            />

            {/* Spin Button */}
            <button
              className="mt-4 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300"
              onClick={handleSpinClick}
            >
              Spin Now
            </button>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            {/* Show Winner */}
            {winner && (
              <motion.p
                className="mt-4 text-lg font-bold text-gray-700"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                🎊 You won: {winner} 🎊
              </motion.p>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
