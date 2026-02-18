import * as THREE from "three";

/**
 * THEME CONFIGURATION
 * Centralized Source of Truth for Colors
 * Matches index.css tokens
 */

export const THEME_COLORS = {
  black: "#050505",
  crimson: "#E61919",
  white: "#F5F5F5",
  silver: "#BEC0C2",
  graphite: "#1A1A1A",
};

// Three.js Color objects for the 3D Scene
export const THEME_THREE = {
  black: new THREE.Color(THEME_COLORS.black),
  crimson: new THREE.Color(THEME_COLORS.crimson),
  white: new THREE.Color(THEME_COLORS.white),
  silver: new THREE.Color(THEME_COLORS.silver),
  graphite: new THREE.Color(THEME_COLORS.graphite),
};

export default { THEME_COLORS, THEME_THREE };
