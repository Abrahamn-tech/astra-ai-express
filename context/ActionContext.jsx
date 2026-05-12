"use client";
import { createContext, useState, useCallback } from "react";

export const ActionContext = createContext();

export function ActionProvider({ children }) {
  const [action, setAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAction = useCallback(async (actionType, payload = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      switch (actionType) {
        case "export":
          // Handle export logic
          console.log("Exporting code...");
          break;

        case "deploy":
          // Handle deploy logic
          console.log("Deploying code...");
          break;

        default:
          console.log("Unknown action:", actionType);
      }

      setAction({
        actionType: actionType,
        timeStamp: Date.now(),
        ...payload,
      });
    } catch (err) {
      setError(err.message);
      console.error("Action error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    action,
    setAction,
    isLoading,
    error,
    handleAction,
  };

  return (
    <ActionContext.Provider value={value}>{children}</ActionContext.Provider>
  );
}
