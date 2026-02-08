import { useRef } from "react";

import VariableProximity from "./VariableProximity";

const FW_Header = () => {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="container mx-auto px-10 md:px-20 mb-12 relative z-20"
    >
      <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase drop-shadow-2xl">
        <VariableProximity
          label={"Featured Work"}
          className={"variable-proximity-demo cursor-default"}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </h2>
    </div>
  );
};

export default FW_Header;
