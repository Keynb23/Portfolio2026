// src/context/useBionic.js
import { useAtom } from 'jotai';
import { bionicModeAtom } from '../store/bionicStore';

export const useBionic = () => {
  const [isBionicMode, setIsBionicMode] = useAtom(bionicModeAtom);

  const toggleBionic = () => setIsBionicMode((prev) => !prev);

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

  return { isBionicMode, toggleBionic, formatText };
};