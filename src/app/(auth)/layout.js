import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

export default function UserLayout({ children }) {
  return (
    <div className={outfit.className}>
    {children}
  </div>
  )
}
