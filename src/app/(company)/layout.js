import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });
import {PersistProvider} from '../../Context/PersistLogin'
import Sidebar from "../../component/navbar/Sidebar";
import Mood from "../../utils/modeSwitch/mode/Mode";
import Lock from "../../utils/modeSwitch/companyLock/Lock";
import Notification from "@/src/utils/Middlewares/Notifications/notification/Notification";

export default function UserLayout({ children }) {
  return (
    <div className={outfit.className}>
      {/* <Mode /> */}
      <PersistProvider>
      <Sidebar />
      <Mood />
      <Lock />
      {children}
      <Notification />
      </PersistProvider>
    </div>
  );
}
