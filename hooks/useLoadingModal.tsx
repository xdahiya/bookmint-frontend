"use client";

import { useContext } from "react";

import { GlobalContext, ContextType } from "@/app/providers";

export const useLoadingModal = () => {
  const { setCurrentRunning, setIsOpen, setSteps } = useContext(
    GlobalContext
  ) as ContextType;

  return {
    setCurrentRunning,
    setIsOpen,
    setSteps,
  };
};
