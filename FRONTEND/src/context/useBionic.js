// src/context/useBionic.js
import { useContext } from "react";
import { BionicContext } from "./BionicContextDefinition";

export const useBionic = () => useContext(BionicContext);
