"use client";
import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}
const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem={true} attribute="class">
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  );
};

export default Provider;
