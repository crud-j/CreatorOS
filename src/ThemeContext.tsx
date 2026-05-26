/**
 * ThemeContext.tsx
 *
 * Provides light/dark mode toggle for the entire app.
 *
 * Usage:
 *   1. Wrap your app root with <ThemeProvider> (done in App.tsx).
 *   2. In any component: const { theme, toggleTheme } = useTheme();
 *      - theme: 'light' | 'dark'
 *      - toggleTheme(): switches between light and dark
 *
 * Implementation:
 *   - Reads initial preference from localStorage ('creatoros-theme')
 *   - Falls back to the OS-level prefers-color-scheme preference
 *   - Applies/removes the 'dark' class on <html> to activate dark tokens in theme.css
 *   - Persists the user's choice to localStorage on each toggle
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

const STORAGE_KEY = 'creatoros-theme';

/** Determine the initial theme:
 *  1. Saved preference in localStorage
 *  2. OS prefers-color-scheme
 *  3. Default: light
 */
function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // localStorage not available (SSR, private mode, etc.)
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply / remove the `.dark` class on <html> whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Convenience hook — use in any component */
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
