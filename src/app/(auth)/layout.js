import { Outfit } from "next/font/google";

import Notification from "../../utils/Middlewares/Notifications/notification/Notification";
const outfit = Outfit({ subsets: ["latin"] });

export default function UserLayout({ children }) {
  return (
    <div className={outfit.className}>
    {children}
    <Notification />
  </div>
  )
}
