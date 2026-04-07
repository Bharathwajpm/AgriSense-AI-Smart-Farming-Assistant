import { useState, createContext, useContext, useEffect } from "react";

type Language = "en" | "ta" | "hi";
interface AppContextType {
  language: Language;
  setLanguage: (l: Language) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType>({
  language: "en",
  setLanguage: () => {},
  isDark: true,
  toggleTheme: () => {},
});

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <AppContext.Provider value={{ language, setLanguage, isDark, toggleTheme: () => setIsDark(!isDark) }}>
      {children}
    </AppContext.Provider>
  );
}
