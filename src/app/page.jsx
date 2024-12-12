
// "use client";

// import { useEffect, useState } from 'react';
// import styles from './page.module.css';
// import { useAuth } from '../Context/ThemeContext';
// import { useRouter } from 'next/navigation';
// import LoadingSpinner from '../utils/LoadingComp/LoadingSpinner';
// import Welcomesceen from '../utils/welcomescreen/Welcomesceen';
// import useStore from '../useStore/Store';
// import StockBelowThreshold from '../utils/StokeRange/StockBelowThreshold'
// const App = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [showWelcome, setShowWelcome] = useState(false);

//   const { stocks, fetchStocks } = useStore((state) => ({
//     stocks: state.stocks,
//     fetchStocks: state.fetchStocks,
//   }));

//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchStocks();
//   }, [fetchStocks]);


//   useEffect(() => {
//     if (user !== undefined) {
//       setLoading(false);
//       setShowWelcome(true);
//       setShowModal(true);

//       console.log("User Role:", user?.role);

//       if (user) {
//         if (user?.role === 'store_owner') {
//           router.push('/dashboard');
//         } else if (user?.role === 'user') {
//           router.push('/market');
//         }
//       }
//     }
//   }, [user, router]);

//   if (loading) {
//     return (
//       <div className={styles.spinner}>
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       {showWelcome && (
//         <Welcomesceen
//           onLogin={() => router.push('/login')}
//           onNavigate={() => router.push('/dashboard')}
//           isAuthenticated={!!user}
//           user={user}
//         />
//       )}

//       {showModal && (
//         <StockBelowThreshold stocks={stocks} onClose={() => setShowModal(false)} />
//       )}
//     </div>
//   );
// };

// export default App;


"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useAuth } from '../Context/ThemeContext';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../utils/LoadingComp/LoadingSpinner';
import Welcomesceen from '../utils/welcomescreen/Welcomesceen';
import useStore from '../useStore/Store';
import StockBelowThreshold from '../utils/StokeRange/StockBelowThreshold';

const App = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  const { stocks, fetchStocks } = useStore((state) => ({
    stocks: state.stocks,
    fetchStocks: state.fetchStocks,
  }));

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
      setShowWelcome(true);

      console.log("User Role:", user?.role);

      if (user) {
        if (user?.role === 'store_owner') {
          router.push('/dashboard');
        } else if (user?.role === 'user') {
          router.push('/market');
        }

        // Check for admin or manager role and show modal accordingly
        if (user?.role === 'admin' || user?.role === 'manager') {
          setShowModal(true);  // Show modal for admin or manager
        }
      }
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className={styles.spinner}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {showWelcome && (
        // <Welcomesceen
        //   onLogin={() => router.push('/login')}
        //   onNavigate={() => router.push('/dashboard')}
        //   isAuthenticated={!!user}
        //   user={user}
        // />

        <Welcomesceen
          onLogin={() => router.push('/login')}
          onNavigate={(path) => router.push(path)}
          isAuthenticated={!!user}
          user={user}
        />
      )}

      {showModal && (
        <StockBelowThreshold
          stocks={stocks}
          showModal={showModal} // Pass showModal from parent
          setShowModal={setShowModal} // Pass setShowModal from parent
          onClose={() => setShowModal(false)} // Close modal logic
        />
      )}
    </div>
  );
};

export default App;

