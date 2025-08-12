import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuoteCard from "../Components/QuoteCard";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Import

export default function Home() {
  const [search, setSearch] = useState("");
  const [verse, setVerse] = useState("Matthew 11:28");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([
    "Come to me, all you who are weary and burdened, and I will give you rest",
  ]);

  const fetchQuotes = async () => {
    setLoading(true);
    const formattedVerse = search.trim().replace(/\s+/g, "+");
    setError("");
    try {
      const res = await fetch(`https://bible-api.com/${formattedVerse}`);
      if (!res.ok) {
        throw new Error("Failed to find Verse");
      }
      const data = await res.json();
      const texts = data.verses ? data.verses.map((v) => v.text.trim()) : [];
      setQuotes(texts);
      setVerse(`${data.reference}`);
      setError("");
    } catch (err) {
      setQuotes([]);
      setVerse("");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchQuotes();
    }
  };

  return (
    <>
      <div className="HeaderContainer">
        <h2>Your Bible Quote App</h2>
        <p>
          This is a simple Bible Quote App that allows you to view and manage
          your favorite quotes from the Bible.
        </p>

        {/* Search input area with motion */}
        <motion.div
          className="search-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Enter verse like 'Romans 8:28'..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            value={search}
          />
          <span className="search-icon">
            <FaSearch onClick={fetchQuotes} />
          </span>
        </motion.div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <div className="spinner"></div>}

        {/* Animate presence of QuoteCard */}
        <AnimatePresence mode="wait">
          {!loading && quotes.length > 0 && (
            <motion.div
              key={verse} // 👈 makes sure animation runs when verse changes
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <QuoteCard quotes={quotes} verse={verse} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
