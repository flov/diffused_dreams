"use client";

import { Button, Select, SelectItem } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = ["purple-dark", "alienware"];

  return (
    // position absolute in the bottom right corner
    <div className="fixed bottom-4 w-60 right-4">
      <Select
        items={themes}
        label="Theme"
        placeholder="Select a theme"
        className="max-w-xs"
        onChange={(e) => setTheme(e.target.value)}
      >
        {themes.map((theme) => (
          <SelectItem key={theme}>{theme}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
