// import React, { useState, useEffect } from 'react';
// import Modal from './Modal';

// const StockBelowThreshold = ({ stockData }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [lowStockItems, setLowStockItems] = useState([]);

//   useEffect(() => {
//     // Filter stock items with quantity below 100
//     const filteredItems = stockData.filter(item => item.quantity < 100);
//     setLowStockItems(filteredItems);
//   }, [stockData]);

//   return (
//     <div>
//       <button onClick={() => setIsModalOpen(true)}>View Low Stock Items</button>

//       <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <h2>Low Stock Items</h2>
//         {lowStockItems.length > 0 ? (
//           <ul>
//             {lowStockItems.map(item => (
//               <li key={item.id}>
//                 {item.name} - {item.quantity} remaining
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>All stocks are sufficient!</p>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default StockBelowThreshold;


// import React from 'react';
// import styles from './StockBelowThreshold.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

// const StockBelowThreshold = ({ stocks, onClose }) => {
//   // Filter stocks below the threshold of 100
//   const lowStockItems = stocks.filter((stock) => stock.closing_value < 100);

//   return (
//     <div className={styles.modal}>
//       <div className={styles.modalContent}>
//         <div className={styles.modalHeader}>
//           <h2>Low Stock Alert</h2>
//           <FontAwesomeIcon
//             icon={faTimes}
//             className={styles.closeIcon}
//             onClick={onClose}
//           />
//         </div>
//         {lowStockItems.length > 0 ? (
//           <ul className={styles.stockList}>
//             {lowStockItems.map((stock) => (
//               <li key={stock.id} className={styles.stockItem}>
//                 <span>{stock.Description}</span> - <span>{stock.closing_value} units</span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>All stock levels are sufficient.</p>
//         )}
//         <button onClick={onClose} className={styles.closeButton}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StockBelowThreshold;
import React from 'react';
import styles from './StockBelowThreshold.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const StockBelowThreshold = ({ stocks, showModal, setShowModal, onClose }) => {
  // Filter stocks below the threshold of 100
//   const lowStockItems = stocks.filter((stock) => stock.closing_value < 100);


 // Filter stocks below the threshold of 100 and with record_type "day_to_day"
 const lowStockItems = stocks.filter((stock) => stock.
 closing_stock < 100 && stock.record_type === 'day_to_day');

  console.log(stocks);
  

  const handleBoxClick = () => {
    setShowModal(true); // Open the modal when the box is clicked
  };

  return (
    <div className={styles.container}>
      {/* Small box displaying the number of low stock items */}
      <div className={`${styles.stockBox} ${showModal ? styles.hideBox : ''}`} onClick={handleBoxClick}>
        <span>{lowStockItems.length} Low Stock Items</span>
      </div>

      {/* Full modal displayed when the user clicks the small box */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Low Stock Alert</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className={styles.closeIcon}
                onClick={onClose}
              />
            </div>
            {lowStockItems.length > 0 ? (
              <ul className={styles.stockList}>
                {lowStockItems.map((stock) => (
                  <li key={stock.id} className={styles.stockItem}>
                    <span>{stock.description}</span> - <span>{stock.closing_stock} units</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>All stock levels are sufficient.</p>
            )}
            {/* <button onClick={onClose} className={styles.closeButton}>
               Close
             </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockBelowThreshold;
