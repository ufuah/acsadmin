import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "../component/navbar/Sidebar";
import Mood from "../utils/modeSwitch/mode/Mode";
import { ThemeContextProvider } from "../Context/ThemeContext";
import Lock from "../utils/modeSwitch/companyLock/Lock";
import ProtectedRoute from "../ProtectedRoute/Protected";
import LockProvider from "../Lockprovider/LockProvider"; 
import Network from '../utils/Network/Network'

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acs Global",
  description:
    "Here at ACS ROOFING we are always looking for a better way of doing things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ProtectedRoute>
          <ThemeContextProvider>
            <Sidebar />
            <Mood />
            <Lock />
            <Network/>
            {children}
          </ThemeContextProvider>
        </ProtectedRoute>
      </body>
    </html>
  );
}
