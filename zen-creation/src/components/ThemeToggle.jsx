import { useTheme } from "./layout/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="w-14 h-7 rounded-full cursor-pointer relative transition-all 
                 bg-gray-700 dark:bg-gray-300"
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow absolute top-0.5 transition-all
          ${theme === "dark" ? "right-1" : "left-1"}
        `}
      />
    </div>
  );
}
