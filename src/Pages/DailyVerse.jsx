import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GiFlowers } from "react-icons/gi";
import verseList from "../Data/dailyVerseList";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";

export default function DailyVerse() {
  const [verse, setVerse] = useState(null);
  // const [daily, setDaily] = useState(() => {
  //   try{
  //     const dailyQuote = localStorage.getItem("Favourite Quotes");
  //     const parsedDaily = dailyQuote ? JSON.parse(dailyQuote) : [];
  //     return Array.isArray(parsedDaily) ? parsedDaily : []
  //   } catch {
  //     return[]
  //   }
  // },[])

  // useEffect(() => {
  //   localStorage.setItem("Favourite Quotes", JSON.stringify(daily));
  // },[daily]);

  // const isDailyQuote = ({text, reference}) => {
  //   if(!Array.isArray(daily)) return false;
  //   return daily.some((v) => v.text === text && v.reference === reference);
  // };

  // const toggleDailyQuote = ({text, reference}) => {
  //   if (isDailyQuote({text, reference})) {
  //     setDaily((prev) => prev.filter((v) => !(v.text === text && v.reference === reference)));
  //   } else setDaily((prev) => [...prev, {text, reference}]);
  // }

  useEffect(() => {
    const today = new Date().toDateString();
    const savedData = JSON.parse(localStorage.getItem("DailyVerseData"));

    if (savedData && savedData.date === today) {
      setVerse(savedData.verse);
      return;
    }
    const shownVerses = JSON.parse(localStorage.getItem("shownVerses")) || [];
    let availableVerses = verseList.filter(
      (v) => !shownVerses.includes(v.text)
    );

    if (availableVerses.length === 0) {
      availableVerses = [...verseList];
      localStorage.setItem("shownVerses", JSON.stringify([]));
    }

    const randomVerse =
      availableVerses[Math.floor(Math.random() * availableVerses.length)];
    localStorage.setItem(
      "shownVerses",
      JSON.stringify([...shownVerses, randomVerse.text])
    );
    localStorage.setItem(
      "DailyVerseData",
      JSON.stringify({ date: today, verse: randomVerse })
    );
    setVerse(randomVerse);
  }, []);

  if (!verse) return <div className="spinner"></div>;

  return (
    <div className="daily-verse-container">
      <motion.div
        className="daily-verse-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="daily-verse-title">
          <GiFlowers /> Verse of the Day
        </h2>
        <p className="daily-verse-text">"{verse.text}"</p>
        <small className="daily-verse-ref">— {verse.reference}</small>
        <div className="verse-actions">
          <button 
          className="share-btn"
          onClick={() => {
            if(navigator.share) {
              navigator.share({
                title:"Bib's Daily Quote",
                text:`${verse.text} — ${verse.reference}`,
                url:window.location.href
              }).catch ((err) => 
              console.log('Share was Canceled', err))
            } else {
              alert ('sharing is not supported in this browser.')
            }
          }}>
            <IoShareOutline/>
          </button>
        </div>
        {/* <div className="verse-actions">
                          <button
                            className="save-btn"
                            onClick={() =>
                              toggleDailyQuote({
                                text: verse.text,
                                reference: verse.reference,
                              })
                            }
                          >
                            {isDailyQuote({
                              text: verse.text,
                              reference: verse.reference,
                            }) ? (
                              <BsBookmarkFill title="Unsave" />
                            ) : (
                              <BsBookmark title="Save" />
                            )}
                          </button>
                          </div> */}
      </motion.div>
    </div>
  );
}
