import { useState } from "react";
import axios from "axios";

// const useSignupRequest = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const signup = async (userData) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const response = await axios.post("http://localhost:5000/api/oasisusers/signup", userData);
//       console.log("Signup successful:", response.data);
//       setSuccess(true);
//     } catch (err) {
//       console.error("Signup error:", err);
//       if (err.response) {
//         // Server responded with an error status code
//         setError(err.response.data.message || "An error occurred during signup.");
//       } else if (err.request) {
//         // No response received (e.g., network error)
//         setError("Network error occurred. Please try again later.");
//       } else {
//         // Something else went wrong
//         setError("An unexpected error occurred. Please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, error, success, signup };
// };

// export default useSignupRequest;



// Exporting user signup logic
export const useUserSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const userSignup = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:5000/api/oasisusers/signup", userData);
      console.log("User signup successful:", response.data);
      setSuccess(true);
    } catch (err) {
      console.error("User signup error:", err);
      if (err.response) {
        setError(err.response.data.message || "An error occurred during user signup.");
      } else if (err.request) {
        setError("Network error occurred. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, userSignup };
};




// Exporting store owner signup logic
export const useStoreOwnerSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const storeOwnerSignup = async (storeData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:5000/api/Oasisstoreowner/signup", storeData);
      console.log("Store owner signup successful:", response.data);
      setSuccess(true);
    } catch (err) {
      console.error("Store owner signup error:", err);
      if (err.response) {
        setError(err.response.data.message || "An error occurred during store owner signup.");
      } else if (err.request) {
        setError("Network error occurred. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, storeOwnerSignup };
};
