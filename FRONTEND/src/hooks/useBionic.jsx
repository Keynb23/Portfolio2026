// src/hooks/useBionic.js
import { useAtom } from "jotai";
import { bionicModeAtom } from "../store/bionicStore";

export const useBionic = () => {
  const [isBionicMode, setIsBionicMode] = useAtom(bionicModeAtom);

  const toggleBionic = () => setIsBionicMode((prev) => !prev);

  const formatText = (text) => {
    if (!isBionicMode || typeof text !== "string") return text;

    return text.split(" ").map((word, i) => {
      if (!word.length) return null;

      // IMPROVED ALGORITHM:
      // More aggressive bolding for better fixation points.
      // 1-3 chars: bold 1
      // 4-6 chars: bold 2
      // 7-9 chars: bold 3
      // 10+ chars: bold ~40-50%
      let boldLength = 1;
      if (word.length > 3 && word.length <= 6) boldLength = 2;
      else if (word.length > 6 && word.length <= 9) boldLength = 3;
      else if (word.length > 9) boldLength = Math.ceil(word.length * 0.4);

      return (
        <span key={i}>
          <strong style={{ fontWeight: "800" }}>
            {word.slice(0, boldLength)}
          </strong>
          {word.slice(boldLength)}{" "}
        </span>
      );
    });
  };

  return { isBionicMode, toggleBionic, formatText };
};
