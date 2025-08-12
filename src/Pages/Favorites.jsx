import React, { useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";
import Bibs from "../assets/Bible teaching-amic.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function Favourites() {
  const [favouriteQuote, setFavouriteQuote] = useState(() => {
    const storedQuotes = localStorage.getItem("Favourite Quotes");
    return storedQuotes ? JSON.parse(storedQuotes) : [];
  });

  const syncFavourites = (data) => {
    localStorage.setItem("Favourite Quotes", JSON.stringify(data));
  };

  const isFavouriteQuote = ({ text, reference }) =>
  favouriteQuote.some((q) => q.text === text && q.reference === reference);

const toggleSavedFavourites = ({ text, reference }) => {
  if (isFavouriteQuote({ text, reference })) {
    const updated = favouriteQuote.filter(
      (q) => !(q.text === text && q.reference === reference)
    );
    setFavouriteQuote(updated);
    syncFavourites(updated);
  }
};

  return (
    <>
      <div className="favourite-container">
        <h2>View Your Favourite Bible Quotes</h2>
        <p className="fav-text">
          All your saved quotes will be stored here in your{" "}
          <strong>Favorites Page.</strong>
        </p>

        <AnimatePresence>
          {/* for a good exit motion*/}
          {favouriteQuote.length === 0 ? (
            <motion.h1
              key="empty" // required for AnimatePresence
              className="fav-text"
              style={{ fontWeight: "bold", marginTop: "10%" }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              There are no favourite quotes yet. Go Save Some!
            </motion.h1>
          ) : (
            favouriteQuote.map((q, index) => (
              <motion.div
                key={q.text + q.verse}
                className="favourite-quote"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }} // stagger effect
              >
                <p>{q.text}</p>
                <small>{q.reference}</small>
                <small>{q.verse}</small>
                <br />
                <button
                  className="save-btn"
                  onClick={() => toggleSavedFavourites(q)}
                  style={{marginTop:'10px'}}
                >
                  <BsBookmarkFill />
                </button>
              </motion.div>
            ))
          )}  
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {favouriteQuote.length > 0 && (
          <div className="Bibs">
            <img src={Bibs} alt="" />
          </div>
        )}
      </motion.div>
    </>
  );
}
