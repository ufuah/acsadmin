// "use client";

// import React, { useState, useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Styles from './sidebar.module.css';
// import Image from 'next/image';
// import logo from '../../../public/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPieChart, faReceipt, faWarehouse, faFolder, faTools, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import useStore from '@/src/useStore/Store'; // Assuming the store contains the lock and role states

// const Sidebar: React.FC = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   const { isLocked, role, checkLock } = useStore((state) => ({
//     isLocked: state.isLocked,
//     role: state.role,
//     checkLock: state.checkLock,
//   }));

//   useEffect(() => {
//     checkLock(); // Check the lock status when the component mounts
//   }, [checkLock]);

//   const handleOpen = () => {
//     setOpen(prev => !prev);
//   };

//   const handleNavigation = (path: string) => {
//     if (pathname !== path) {
//       router.push(path);
//     }
//   };

//   // Define all possible nav items
//   const allNavItems = [
//     { path: '/dashboard', icon: faPieChart },
//     { path: '/sales', icon: faReceipt },
//     { path: '/stock', icon: faWarehouse },
//     { path: '/manage', icon: faFolder },
//     { path: '/installations', icon: faTools },
//   ];

//   // Filter nav items based on role
//   const filteredNavItems = allNavItems.filter((item) => {
//     if (role === 'admin') return true; // Admin has access to all paths
//     if (role === 'manager') return item.path === '/sales' || item.path === '/manage'; // Manager can access sales and manage
//     if (role === 'user') return item.path === '/sales'; // User can only access sales
//     return false; // No access if the role doesn't match
//   });

//   // Only render the sidebar if the system is not locked, or if the user is an admin or manager
//   if (isLocked && role !== 'admin' && role !== 'manager') {
//     return null;
//   }

//   return (
//     <div className={Styles.container}>
//       <div className={open ? `${Styles.box} ${Styles.active}` : Styles.box}>
//         <div className={Styles.logo_styles}>
//           <Image src={logo} alt="Company Logo" />
//         </div>

//         <div className={Styles.nav}>
//           <ul>
//             {filteredNavItems.map(({ path, icon }) => (
//               <li
//                 key={path}
//                 className={pathname === path ? Styles.active : ''}
//                 onClick={() => handleNavigation(path)}
//               >
//                 <FontAwesomeIcon icon={icon} />
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className={Styles.profile}>
//           {/* Add profile section here */}
//         </div>

//         <div className={Styles.toggle} onClick={handleOpen}>
//           <FontAwesomeIcon icon={faArrowRight} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Styles from "./sidebar.module.css";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPieChart,
  faReceipt,
  faWarehouse,
  faFolder,
  faTools,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "@/src/useStore/Store"; // Assuming the store contains the lock and role states

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { isLocked, role, checkLock, isAuthenticated, loadUserFromStorage } =
    useStore((state) => ({
      isLocked: state.isLocked,
      role: state.role,
      checkLock: state.checkLock,
      isAuthenticated: state.isAuthenticated,
      loadUserFromStorage: state.loadUserFromStorage,
    }));

  useEffect(() => {
    const initialize = async () => {
      await loadUserFromStorage(); // Ensure user data is loaded from storage
      await checkLock(); // Check the lock status when the component mounts
    };
    initialize();
  }, [checkLock, loadUserFromStorage]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleNavigation = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  // Define all possible nav items
  const allNavItems = [
    { path: "/dashboard", icon: faPieChart },
    { path: "/sales", icon: faReceipt },
    { path: "/stock", icon: faWarehouse },
    { path: "/salesmanager", icon: faFolder },
    { path: "/return", icon: faTools },
  ];

  // Filter nav items based on role
  const filteredNavItems = allNavItems.filter((item) => {
    if (role === "admin") return true; // Admin has access to all paths
    if (role === "manager")
      return item.path === "/sales" || item.path === "/manage" || item.path === "/return"  || item.path === "/salesmanager" || item.path === "/stock"; // Manager can access sales and manage
    if (role === "user") return item.path === "/sales"  || item.path === "/return"; // User can only access sales
    return false; // No access if the role doesn't match
  });

  // Only render the sidebar if the user is authenticated
  if (!isAuthenticated()) {
    return null;
  }

  // Only render the sidebar if the system is not locked, or if the user is an admin or manager
  if (isLocked && role !== "admin" && role !== "manager") {
    return null;
  }

  return (
    <div className={Styles.container}>
      <div className={open ? `${Styles.box} ${Styles.active}` : Styles.box}>
        <div className={Styles.logo_styles}>
          <Image src={logo} alt="Company Logo" />
        </div>

        <div className={Styles.nav}>
          <ul>
            {filteredNavItems.map(({ path, icon }) => (
              <li
                key={path}
                className={pathname === path ? Styles.active : ""}
                onClick={() => handleNavigation(path)}
              >
                <FontAwesomeIcon icon={icon} />
              </li>
            ))}
          </ul>
        </div>

        <div className={Styles.profile}>{/* Add profile section here */}</div>

        <div className={Styles.toggle} onClick={handleOpen}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
