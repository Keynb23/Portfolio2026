"use client";
import { useRef } from "react";
import { useFluidSimulation } from "./useFluidSimulation";

function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.0, g: 0.0, b: 0.0 }, // Set to black/transparent for better overlay
  TRANSPARENT = true,
}) {
  const canvasRef = useRef(null);

  useFluidSimulation(canvasRef, {
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  });

  return (
    <div className="fixed top-0 left-0 z-[10000] pointer-events-none w-full h-full">
      <canvas
        ref={canvasRef}
        id="fluid"
        className="w-screen h-screen block"
      ></canvas>
    </div>
  );
}

export default SplashCursor;
