import React, { useState, useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function QuoteCard({ quotes, verse }) {

  const [savedQuote, setSavedQuote] = useState(() => {
    const saved = localStorage.getItem('Favourite Quotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('Favourite Quotes', JSON.stringify(savedQuote));
  }, [savedQuote]);

  const isQuoteSaved = ({text: quote, verse: verse}) => savedQuote.some((q) => q.text === quote && q.verse === verse);

  const toggleSavedQuotes = ({text: quote, verse: verse}) => {
    if (isQuoteSaved({text: quote, verse: verse})) {
      setSavedQuote((prev) => prev.filter((q) => !(q.text === quote && q.verse === verse)));
    } else ( 
      setSavedQuote((prev) => [...prev, { text: quote, verse: verse }])
    );
  }

  return (
    <div className="quote-box">
      {quotes.map((q, index) => (
        <div key={index}>
          <p className="quote">{q}</p>
          <button className="save-btn" onClick={() => toggleSavedQuotes({text:q, verse})}>
            {isQuoteSaved({text:q,verse}) ? (
              <BsBookmarkFill title="Unsave" />
            ) : (
              <BsBookmark title="Save" />
            )}
          </button>
        </div>
      ))}

      <div className="verse">
        <p>{verse}</p>
      </div>
    </div>

  );
}
