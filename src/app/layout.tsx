import Provider from "@/components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/Toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed w-full h-20 top-0 border border-red-400">
          root layout
        </div>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
