import { useTheme } from "./layout/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Log the current theme for debugging
  console.log("Current theme:", theme);

  return (
    <div
      onClick={toggleTheme}
      className="w-14 h-7 rounded-full cursor-pointer relative transition-all 
                 bg-gray-300 dark:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow absolute top-0.5 transition-all duration-300
          ${theme === "dark" ? "translate-x-7" : "translate-x-1"}
        `}
      />
    </div>
  );
}
