"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themes = ["event-station", "alienware"];
export type Theme = (typeof themes)[number];

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  const { resolvedTheme } = useTheme();

  if (!mounted) return null;

  return (
    // position absolute in the bottom right corner
    <div className="fixed bottom-4 w-60 right-4">
      <Select
        items={themes}
        label="Theme"
        placeholder="Select a theme"
        className="max-w-xs"
        defaultSelectedKeys={[resolvedTheme || themes[0]]}
        onChange={(e) => setTheme(e.target.value)}
        color="primary"
      >
        {themes.map((theme) => (
          <SelectItem key={theme}>{theme}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
