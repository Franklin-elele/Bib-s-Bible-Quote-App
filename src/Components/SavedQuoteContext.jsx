import React, { createContext,useContext, useEffect, useState } from "react";

const savedQuoteContext = createContext();

export const savedQuoteProvider = ({children}) => {
    const [savedQuote, setSavedQuote] = useState(() => {
    const localData = localStorage.getItem('Favourite Quotes');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('Favourite Quotes', JSON.stringify(savedQuote))
  },[savedQuote])

  const toggleQuote = (quoteObj) => {
    const alreadySaved = savedQuote.some(
      (q) => q.text === quoteObj.text && q.verse === quoteObj.verse
    );

    if (alreadySaved) {
      setSavedQuote((prev) =>
        prev.filter(
          (q) => q.text !== quoteObj.text || q.verse !== quoteObj.verse
        )
      );
    } else {
      setSavedQuote((prev) => [...prev, quoteObj]);
    }
  };

  return (
    <savedQuoteContext.Provider value={{savedQuote, toggleQuote}}>
        {children}
    </savedQuoteContext.Provider>
  )
};

export const useSavedQuotes = () => useContext(savedQuoteContext)