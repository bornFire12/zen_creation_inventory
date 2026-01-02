import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function HeaderUserCard() {
  return (
    <div className="flex justify-between items-center mb-6 bg-[#E1E1DC] dark:bg-[#43433F] p-5 rounded-xl">
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-3">
        <img src="/avatar.png" className="w-12 h-12 rounded-full" />

        <div>
          <p className="font-semibold dark:text-white">Prason Tuladhar</p>
          <p className="text-sm opacity-60 dark:opacity-100 dark:text-gray-200">
            Admin
          </p>
        </div>
      </div>

      {/* Right: Dark/Light toggle */}
      <ThemeToggle />
    </div>
  );
}
