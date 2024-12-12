

// import React, { useState } from 'react';
// import Logosvg from './svg/logosvg/Logosvg.js';
// import styles from './welcomescreen.module.css';
// import Image from 'next/image';
// import logo from '../../../public/logo_0002.svg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingBag, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
// import LoadingSpinner from '@/utils/LoadingComp/LoadingSpinner.jsx';

// const Welcomesceen = ({ onNavigate, onLogin, isAuthenticated, user }) => {
//   const [loading, setLoading] = useState(false);

//   const handleNavigation = () => {
//     setLoading(true);
//     onNavigate();
//   };

//   return (
//     <div className={styles.welcomeContainer}>
//       <div className={styles.logoWrapper}>
//         <div className={styles.logo}>
//           <Image src={logo} alt="e-palateOasis Logo" />
//         </div>
//       </div>
//       {/* <h1 className={styles.greeting}>Welcome to e-palateOasis!</h1> */}
//       {/* Greeting Message */}
//       <h1 className={styles.greeting}>
//         {isAuthenticated ? `Welcome back, ${user.username}!` : 'Welcome to e-palateOasis!'}
//       </h1>
//       <p className={styles.tagline}>Your favorite marketplace awaits.</p>

//       <div className={styles.navbtnContainer}>
//         {/* Show login button only if not authenticated */}
//         {!isAuthenticated && (
//           <div onClick={onLogin} className={styles.navbtn}>
//             <button>Login</button>
//             <div className={styles.icon}>
//               <FontAwesomeIcon icon={faSignInAlt} />
//             </div>
//           </div>
//         )}

//         <div onClick={handleNavigation}>
//           {/* <div className={styles.message}>
//           <p className={styles.roleMessage}>
//             {user.role === "admin" && "Manage your platform effectively!"}
//             {user.role === "store_owner" && "Ready to manage your store today?"}
//             {user.role === "user" && "Explore our marketplace now!"}
//           </p>
//           </div> */}
         
//           {loading ? (
//             <div className={styles.spinner} aria-disabled={loading}>
//               <LoadingSpinner />
//             </div>
//           ) : (
//             <div className={`${styles.navbtn} ${loading ? styles.loading : ''}`}>
//               <button disabled={loading}>Go to Market</button>
//               <div className={styles.icon}>
//                 <FontAwesomeIcon icon={faShoppingBag} />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Welcomesceen;



// import React, { useState } from 'react';
// import Image from 'next/image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
// import LoadingSpinner from '@/utils/LoadingComp/LoadingSpinner';
// import styles from './welcomescreen.module.css';
// import logo from "../../../public/logo_0002.svg";

// const Welcomesceen = ({ user, onNavigate, onLogin, isAuthenticated }) => {
//   const [loading, setLoading] = useState(false);
//   const handleNavigation = () => {
//     setLoading(true);
//     onNavigate();
//   };

//   return (
//     <div className={styles.welcomeContainer}>
//       <div className={styles.logoWrapper}>
//         <div className={styles.logo}>
//           <Image src={logo} alt="e-palateOasis Logo" />
//         </div>
//       </div>
//       <h1 className={styles.greeting}>
//         {isAuthenticated ? `Welcome back, ${user.username}!` : "Welcome to e-palateOasis!"}
//       </h1>
//       <p className={styles.tagline}>Your favorite marketplace awaits.</p>

//       {isAuthenticated ? (
//         <>
//           <p className={styles.roleMessage}>
//             {user.role === "admin" && "Manage your platform effectively!"}
//             {user.role === "store owner" && "Ready to manage your store today?"}
//             {user.role === "user" && "Explore our marketplace now!"}
//           </p>
//           <div onClick={handleNavigation} className={`${styles.navbtn} ${loading ? styles.loading : ''}`}>
//             {loading ? (
//               <LoadingSpinner />
//             ) : (
//               <>
//                 <button disabled={loading}>Go to Market</button>
//                 <div className={styles.icon}>
//                   <FontAwesomeIcon icon={faShoppingBag} />
//                 </div>
//               </>
//             )}
//           </div>
//         </>
//       ) : (
//         <div onClick={onLogin} className={styles.navbtn}>
//           <button>Login</button>
//           <div className={styles.icon}>
//             <FontAwesomeIcon icon={faShoppingBag} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Welcomesceen;


// import React, { useState } from 'react';
// // import Logosvg from './svg/logosvg/Logosvg.js';
// import styles from './welcomescreen.module.css';
// import Image from 'next/image';
// import logo from '../../../public/companyLogo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingBag, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
// import LoadingSpinner from '../../utils/LoadingComp/LoadingSpinner.jsx';


// const Welcomesceen = ({ onNavigate, onLogin, isAuthenticated, user }) => {
//   const [loading, setLoading] = useState(false);

//   const handleLogin = () => {
//     setLoading(true);
//     onLogin();
//   };

//   const handleNavigation = () => {
//     setLoading(true);
//     onNavigate();
//   };

//   return (
//     <div className={styles.welcomeContainer}>
//       <div className={styles.logoWrapper}>
//         <div className={styles.logo}>
//           <Image src={logo} alt="e-palateOasis Logo" />
//         </div>
//       </div>
      
//       <h1 className={styles.greeting}>
//         {isAuthenticated ? `Welcome back, ${user?.username}!` : 'Welcome on board!'}
//       </h1>
//       <p className={styles.tagline}>We build the future.</p>

//       <div className={styles.navbtnContainer}>
//         {loading ? (
//           <div className={styles.spinner}>
//             <LoadingSpinner />
//           </div>
//         ) : (
//           <>
//             {!isAuthenticated && (
//               <div onClick={handleLogin} className={styles.navbtn}>
//                 <button>Login</button>
//                 <div className={styles.icon}>
//                   <FontAwesomeIcon icon={faSignInAlt} />
//                 </div>
//               </div>
//             )}
//             <div onClick={handleNavigation} className={styles.navbtn}>
//               <button>Visit your dashboard</button>
//               <div className={styles.icon}>
//                 <FontAwesomeIcon icon={faShoppingBag} />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Welcomesceen;





import React, { useState } from 'react';
import styles from './welcomescreen.module.css';
import Image from 'next/image';
import logo from '../../../public/companyLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../utils/LoadingComp/LoadingSpinner.jsx';

const Welcomesceen = ({ onNavigate, onLogin, isAuthenticated, user }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    onLogin();
  };

  const handleNavigation = (redirectPath) => {
    setLoading(true);
    onNavigate(redirectPath);
  };

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo}>
          <Image src={logo} alt="e-palateOasis Logo" />
        </div>
      </div>

      <h1 className={styles.greeting}>
        {isAuthenticated ? `Welcome back, ${user?.username}!` : 'Welcome on board!'}
      </h1>
      <p className={styles.tagline}>We build the future.</p>

      <div className={styles.navbtnContainer}>
        {loading ? (
          <div className={styles.spinner}>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {!isAuthenticated && (
              <div onClick={handleLogin} className={styles.navbtn}>
                <button>Login</button>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faSignInAlt} />
                </div>
              </div>
            )}

            {isAuthenticated && user?.role === 'admin' && (
              <div
                onClick={() => handleNavigation('/dashboard')}
                className={styles.navbtn}
              >
                <button>Go to Dashboard</button>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faShoppingBag} />
                </div>
              </div>
            )}

            {isAuthenticated && user?.role !== 'admin' && (
              <div
                onClick={() => handleNavigation('/sales')}
                className={styles.navbtn}
              >
                <button>Visit Sales Page</button>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faShoppingBag} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Welcomesceen;
