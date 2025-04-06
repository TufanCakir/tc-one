// src/AppProviders.js
import React from "react";
import { CoinsProvider } from "./context/CoinsContext";
import { SummonedBackgroundsProvider } from "./context/SummonedBackgroundsContext";
import { BackgroundProvider } from "./context/BackgroundContext";

export default function AppProviders({ children }) {
  return (
    <CoinsProvider>
      <SummonedBackgroundsProvider>
        <BackgroundProvider>{children}</BackgroundProvider>
      </SummonedBackgroundsProvider>
    </CoinsProvider>
  );
}
