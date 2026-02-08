import { useRef, useEffect } from "react";

// Helper to parse and interpolate
function interpolateSettings(from, to, factor) {
  // Parse settings into objects: { 'wght': 400, 'opsz': 9 }
  const parse = (str) => {
    const settings = {};
    str.split(",").forEach((part) => {
      const [key, val] = part.trim().split(" ");
      if (key && val) {
        // key includes quotes usually, val is number
        settings[key.replace(/['"]/g, "")] = parseFloat(val);
      }
    });
    return settings;
  };

  const fromSettings = parse(from);
  const toSettings = parse(to);

  const result = [];
  for (const key in fromSettings) {
    const start = fromSettings[key];
    const end = toSettings[key] || start; // fallback if missing
    const current = start + (end - start) * factor;
    result.push(`'${key}' ${current}`);
  }
  return result.join(", ");
}

const VariableProximity = ({
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 50,
  falloff = "linear",
  className = "",
  onClick,
  style,
}) => {
  const letterRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // If containerRef is provided, calculate relative to it, otherwise window
      const x = e.clientX;
      const y = e.clientY;

      const container = containerRef?.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        // Check if mouse is within plausible range to react (optional optimization)
        if (
          x < rect.left - radius ||
          x > rect.right + radius ||
          y < rect.top - radius ||
          y > rect.bottom + radius
        ) {
          // Reset to base state if far away to save calculation/repaint?
          // Or just let the distance formula handle it (cleaner)
        }
      }

      letterRefs.current.forEach((letterSpan) => {
        if (!letterSpan) return;

        const rect = letterSpan.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(x - letterCenterX, 2) + Math.pow(y - letterCenterY, 2),
        );

        let proximity = Math.max(0, 1 - distance / radius);

        // Apply falloff
        if (falloff === "exponential") {
          proximity = Math.pow(proximity, 2);
        } // linear is default

        // Interpolate font variation settings
        const newSettings = interpolateSettings(
          fromFontVariationSettings,
          toFontVariationSettings,
          proximity,
        );

        letterSpan.style.fontVariationSettings = newSettings;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [
    fromFontVariationSettings,
    toFontVariationSettings,
    radius,
    falloff,
    containerRef,
  ]);

  return (
    <span
      className={`${className} inline-block`}
      onClick={onClick}
      style={{ display: "inline", ...style }} // changed to inline to flow with text
    >
      {label.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => (letterRefs.current[index] = el)}
          className="inline-block transition-transform duration-75" // Smooth movement if any
          style={{
            fontVariationSettings: fromFontVariationSettings,
            minWidth: char === " " ? "0.25em" : "auto", // Handle spaces
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default VariableProximity;
