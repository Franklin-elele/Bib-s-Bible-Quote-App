import React, { useEffect, useState } from "react";
import { FaBible } from "react-icons/fa";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import bibleBro from "../assets/BibleBro.svg";
import { motion } from "framer-motion";
import { data, Link } from "react-router-dom";

export default function Home({ onNewVerse, onClick }) {
  const bibleBooks = {
    1: "Genesis",
    2: "Exodus",
    3: "Leviticus",
    4: "Numbers",
    5: "Deuteronomy",
    6: "Joshua",
    7: "Judges",
    8: "Ruth",
    9: "1 Samuel",
    10: "2 Samuel",
    11: "1 Kings",
    12: "2 Kings",
    13: "1 Chronicles",
    14: "2 Chronicles",
    15: "Ezra",
    16: "Nehemiah",
    17: "Esther",
    18: "Job",
    19: "Psalms",
    20: "Proverbs",
    21: "Ecclesiastes",
    22: "Song of Solomon",
    23: "Isaiah",
    24: "Jeremiah",
    25: "Lamentations",
    26: "Ezekiel",
    27: "Daniel",
    28: "Hosea",
    29: "Joel",
    30: "Amos",
    31: "Obadiah",
    32: "Jonah",
    33: "Micah",
    34: "Nahum",
    35: "Habakkuk",
    36: "Zephaniah",
    37: "Haggai",
    38: "Zechariah",
    39: "Malachi",
    40: "Matthew",
    41: "Mark",
    42: "Luke",
    43: "John",
    44: "Acts",
    45: "Romans",
    46: "1 Corinthians",
    47: "2 Corinthians",
    48: "Galatians",
    49: "Ephesians",
    50: "Philippians",
    51: "Colossians",
    52: "1 Thessalonians",
    53: "2 Thessalonians",
    54: "1 Timothy",
    55: "2 Timothy",
    56: "Titus",
    57: "Philemon",
    58: "Hebrews",
    59: "James",
    60: "1 Peter",
    61: "2 Peter",
    62: "1 John",
    63: "2 John",
    64: "3 John",
    65: "Jude",
    66: "Revelation",
  };

  const [currentQuote, setCurrentQuote] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const favRandom = localStorage.getItem("Favourite Quotes");
      const parsed = favRandom ? JSON.parse(favRandom) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },[]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("Favourite Quotes", JSON.stringify(favorites));
  }, [favorites]);

  const isFavRandom = ({ text, reference }) => {
    if (!Array.isArray(favorites)) return false;
    return favorites.some(
      (data) => data.text === text && data.reference === reference
    );
  };

  const toggleRandomQuote = ({ text, reference }) => {
    if (isFavRandom({ text, reference })) {
      setFavorites((prev) =>
        prev.filter(
          (data) => !(data.text === text && data.reference === reference)
        )
      );
    } else setFavorites((prev) => [...prev, { text, reference }]);
  };

  useEffect(() => {
    const loadRandom = async () => {
      setError("");
      setLoading(true);

      const cachedQuote = sessionStorage.getItem("bq_random_current");
      if (cachedQuote) {
        setCurrentQuote(JSON.parse(cachedQuote));
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://bolls.life/get-random-verse/NIV/");
        if (!res.ok) {
          throw new Error(
            "OOPS! Failed to fetch random verse!...Your gonna have to chill OG"
          );
        }
        const data = await res.json();

        const normalized = {
          id: data.pk || Date.now(),
          text: data.text || "No text available",
          reference: `${bibleBooks[data.book] || "Unknown Book"} ${
            data.chapter || "?"
          }
                    :${data.verse || "?"}`,
        };
        setCurrentQuote(normalized);
        sessionStorage.setItem("bq_random_current", JSON.stringify(normalized));
        setLoading(false);
      } catch (err) {
        setError(
          err.message ||
            "Hmm...Something definitely went wrong fetching the verse"
        );
        setLoading(false);
      }
    };
    loadRandom();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="home-container"
      >
        {/* Title Section */}
        <h2 className="page-title">
          <FaBible style={{ color: "#2a2442", marginRight: "10px" }} />
          Bib's Bible Quote App
        </h2>

        <p className="subtitle">
          Get closer to God with{" "}
          <strong style={{ fontWeight: "bold" }}>Bib's</strong> bible quote app
        </p>

        {/* Main Content Row */}
        <div className="content-row">
          {/* Verse Section */}
          <div className="verse-section">
             {loading && (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
             )}

             {error && <p className="error">{error}</p>}
             {currentQuote && (
              <motion.div
                key={currentQuote.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="verse-card"
              >
                <p className="verse-text">"{currentQuote.text}"</p>
                <small className="verse-reference">
                  — {currentQuote.reference}
                </small>
                <div className="verse-actions">
                  <button
                    className="save-btn"
                    onClick={() =>
                      toggleRandomQuote({
                        text: currentQuote.text,
                        reference: currentQuote.reference,
                      })
                    }
                  >
                    {isFavRandom({
                      text: currentQuote.text,
                      reference: currentQuote.reference,
                    }) ? (
                      <BsBookmarkFill title="Unsave" />
                    ) : (
                      <BsBookmark title="Save" />
                    )}
                  </button>
                  {/*Share button*/}
                  <button
                    className="share-btn"
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: "Bib's Bible Quote",
                            text: `${currentQuote.text} — ${currentQuote.reference}`,
                            url: window.location.href,
                          }).catch((err) =>
                            console.log("Share was canceled", err));
                      } else {
                        alert("Sharing is not supported in this browser.");
                      }
                    }}>

                    <IoShareOutline />
                  </button>
                </div>
              </motion.div>
             )}
                {!loading && (
              <Link to="/dailyVerse">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="new-verse-btn"
                >
                  Get Daily Quote
                </motion.button>
              </Link>
             )}
          </div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="image-section"
          >
            <picture>
              <img src={bibleBro} alt="Bible.svg" width="300px" />
            </picture>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
