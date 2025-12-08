

// "use client";

// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClipboard, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import styles from './customerList.module.css';
// import useStore from '../../useStore/Store';

// const CustomerList = () => {
//   const [customers, setCustomers] = useState([]);
//   const [copySuccess, setCopySuccess] = useState(null);

//   // Extract `getCustomer` from the store
//   const { getCustomer } = useStore((state) => ({
//     getCustomer: state.getCustomer,
//   }));

//   // Fetch customer details when the component mounts
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const customerData = await getCustomer(); // Assuming this is an async function
//         setCustomers(customerData || []); // Set the customers or an empty array
//       } catch (error) {
//         console.error('Error fetching customer details:', error);
//       }
//     };

//     fetchCustomers();
//   }, [getCustomer]);

//   // Copy phone number to clipboard
//   const handleCopy = (phone) => {
//     navigator.clipboard.writeText(phone)
//       .then(() => {
//         setCopySuccess(`Copied: ${phone}`);
//         setTimeout(() => setCopySuccess(null), 2000);
//       })
//       .catch((err) => console.error('Failed to copy: ', err));
//   };

//   // Handle message functionality (placeholder)
//   const handleMessage = (phone) => {
//     alert(`Send a message to: ${phone}`); // Replace with actual messaging logic
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Customer List</h1>
//       {copySuccess && <p className={styles.copyMessage}>{copySuccess}</p>}
//       {customers.length > 0 ? (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th className={styles.th}>Customer ID</th>
//               <th className={styles.th}>Name</th>
//               <th className={styles.th}>Phone Number</th>
//               <th className={styles.th}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((customer, index) => (
//               <tr key={index}>
//                 <td className={styles.td}>{customer.customer_id}</td>
//                 <td className={styles.td}>{customer.customer_name}</td>
//                 <td className={styles.td}>
//                   {customer.number}
//                   <button
//                     className={styles.iconButton}
//                     onClick={() => handleCopy(customer.number)}
//                     title="Copy to clipboard"
//                   >
//                     <FontAwesomeIcon icon={faClipboard} />
//                   </button>
//                 </td>
//                 <td className={styles.td}>
//                   <button
//                     className={styles.messageButton}
//                     onClick={() => handleMessage(customer.number)}
//                     title="Send Message"
//                   >
//                     <FontAwesomeIcon icon={faEnvelope} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className={styles.emptyMessage}>No customers found.</p>
//       )}
//     </div>
//   );
// };

// export default CustomerList;

"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './customerList.module.css';
import useStore from '../../useStore/Store';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page for pagination
  const [endOfList, setEndOfList] = useState(false); // Track when the end of the list is reached
  const [hasMore, setHasMore] = useState(true); // To track if more customers are available
    const [copySuccess, setCopySuccess] = useState(null);

  // Extract `getCustomer` from the store
  const { getCustomer } = useStore((state) => ({
    getCustomer: state.getCustomer,
  }));

  // Fetch customer details when the component mounts or page changes
 
  // Fetch customer details when the component mounts or page changes
  const fetchCustomers = useCallback(async () => {
    if (loading || !hasMore) return; // Prevent fetching if already loading or no more customers
    setLoading(true);
    try {
      const customerData = await getCustomer(page); // Pass current page
      setCustomers((prevCustomers) => [...prevCustomers, ...customerData]); // Append new customers
      setPage((prevPage) => prevPage + 1); // Increment page number for next request

      // If the response is empty, no more customers are available
      if (customerData.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    } finally {
      setLoading(false);
    }
  }, [getCustomer, page, loading, hasMore]);

 // Listen for scroll event to detect when user reaches bottom of the page
 const handleScroll = (event) => {
  const bottom =
    event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
  if (bottom && !loading && hasMore) {
    fetchCustomers(); // Load more customers when scrolled to the bottom
  }
};


    // Copy phone number to clipboard
  const handleCopy = (phone) => {
    navigator.clipboard.writeText(phone)
      .then(() => {
        setCopySuccess(`Copied: ${phone}`);
        setTimeout(() => setCopySuccess(null), 2000);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  // Initialize fetch when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className={styles.container} onScroll={handleScroll}>
      {copySuccess && <p className={styles.copyMessage}>{copySuccess}</p>}
      <h1 className={styles.title}>Customer List</h1>
      {customers.length > 0 ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Customer ID</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Phone Number</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td className={styles.td}>{customer.customer_id}</td>
                  <td className={styles.td}>{customer.customer_name}</td>
                  <td className={styles.td}>
                    {customer.number}
                    <button
                      className={styles.iconButton}
                      onClick={() => handleCopy(customer.number)}
                      title="Copy to clipboard"
                    >
                      <FontAwesomeIcon icon={faClipboard} />
                    </button>
                  </td>
                  <td className={styles.td}>
                    <button
                      className={styles.messageButton}
                      onClick={() => alert(`Send a message to: ${customer.number}`)} // Placeholder
                      title="Send Message"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p className={styles.loadingMessage}>Loading more customers...</p>}
          {!hasMore && <p className={styles.emptyMessage}>End of list</p>}
        </>
      ) : (
        <p className={styles.emptyMessage}>No customers found.</p>
      )}
    </div>
  );
};


export default CustomerList;
