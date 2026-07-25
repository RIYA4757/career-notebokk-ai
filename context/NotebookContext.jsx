"use client";

import { createContext, useContext, useState } from "react";

const NotebookContext = createContext();

export function NotebookProvider({ children }) {
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  return (
    <NotebookContext.Provider
      value={{
        selectedNotebook,
        setSelectedNotebook,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
}

export function useNotebook() {
  return useContext(NotebookContext);
}