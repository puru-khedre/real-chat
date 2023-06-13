"use client";
import { useTheme } from "next-themes";
import { FC } from "react";

interface TestProps {}
const Test: FC<TestProps> = ({}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      onClick={() => {
        console.log(theme);
        setTheme(theme == "dark" ? "light" : "dark");
      }}
      className="text-red-500 dark:text-green-500"
    >
      Test
    </div>
  );
};

export default Test;
