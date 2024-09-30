import { Outfit } from "next/font/google";
import Protected from "../../ProtectedRoute/Protected";
import Mode from "@/src/utils/modeSwitch/mode/Mode";
import LockRoute from "@/src/Lockprovider/LockProvider";
const outfit = Outfit({ subsets: ["latin"] });

export default function UserLayout({ children }) {
  return (
    <div className={outfit.className}>
      {/* <Mode /> */}
      {children}
    </div>
  );
}
