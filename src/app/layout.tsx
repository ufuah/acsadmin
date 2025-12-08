import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "../component/navbar/Sidebar";
import Mood from "../utils/modeSwitch/mode/Mode";
import { AuthContextProvider, ThemeContextProvider } from "../Context/ThemeContext";
import Lock from "../utils/modeSwitch/companyLock/Lock";
import Network from '../utils/Network/Network'
import { NotificationContextProvider } from "../Context/NotificationContext";
import { PersistProvider } from '../Context/PersistLogin'
import { Suspense } from "react";
import Loading from "../component/Loading/Loading";


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
        <AuthContextProvider>
          <ThemeContextProvider>
            <PersistProvider>
              <NotificationContextProvider>
                <Network />
                <Suspense fallback={<Loading />}>
                {children}
                </Suspense>
              </NotificationContextProvider>
            </PersistProvider>
          </ThemeContextProvider>
        </AuthContextProvider>

      </body>
    </html>
  );
}
