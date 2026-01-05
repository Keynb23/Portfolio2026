// src/context/BionicContext.jsx
import { createContext, useContext, useState } from 'react';

const BionicContext = createContext();

export const BionicProvider = ({ children }) => {
  const [isBionicMode, setIsBionicMode] = useState(false);

  const toggleBionic = () => setIsBionicMode(prev => !prev);

  // The logic that actually bionic-ifies text
  const formatText = (text) => {
    if (!isBionicMode || typeof text !== 'string') return text;

    return text.split(" ").map((word, i) => {
      const boldLength = word.length <= 3 ? 1 : Math.ceil(word.length * 0.4);
      return (
        <span key={i} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          <strong style={{ fontWeight: '700', color: 'inherit' }}>
            {word.slice(0, boldLength)}
          </strong>
          {word.slice(boldLength)}
        </span>
      );
    });
  };

  return (
    <BionicContext.Provider value={{ isBionicMode, toggleBionic, formatText }}>
      {children}
    </BionicContext.Provider>
  );
};

export const useBionic = () => useContext(BionicContext);