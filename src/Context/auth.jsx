// import axios from 'axios';

// export const userLogin = async (inputs) => {
//   try {
//     const res = await axios.post('http://localhost:5000/api/oasisusers/login', inputs);
//     console.log(axios);
//     return res.data;
//   } catch (error) {
//     console.error('User login error:', error);
//     throw error;
//   }
// };

// export const storeOwnerLogin = async (inputs) => {
//   try {
//     const res = await axios.post('http://localhost:5000/api/Oasisstoreowner/login', inputs);
//     return res.data;
//   } catch (error) {
//     console.error('Store owner login error:', error);
//     throw error;
//   }
// };

// export const logisticsLogin = async (inputs) => {
//   try {
//     const res = await axios.post('http://localhost:5000/api/Oasislogistics/login', inputs);
//     return res.data;
//   } catch (error) {
//     console.error('Logistics login error:', error);
//     throw error;
//   }
// };






// export const userLogout = async (accessToken) => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/oasisusers/logout', null, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.status === 200) {
//       console.log('Logout successful');
//     } else {
//       console.error(`Logout failed: ${response.data}`);
//     }
//   } catch (error) {
//     console.error('An error occurred during logout:', error.message);
//     throw error;
//   }
// };



// export const  storeOwnerLogout = async (accessToken) => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/Oasisstoreowner/logout', null, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.status === 200) {
//       console.log('Logout successful');
//     } else {
//       console.error(`Logout failed: ${response.data}`);
//     }
//   } catch (error) {
//     console.error('An error occurred during logout:', error.message);
//     throw error;
//   }
// };



// export const logisticsLogout = async (accessToken) => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/Oasislogistics/logout', null, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.status === 200) {
//       console.log('Logout successful');
//     } else {
//       console.error(`Logout failed: ${response.data}`);
//     }
//   } catch (error) {
//     console.error('An error occurred during logout:', error.message);
//     throw error;
//   }
// };
