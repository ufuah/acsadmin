// "use client";

// import { useState } from "react";
// import useStore from "../../useStore/Store";
// import { useRouter } from "next/navigation";
// import styles from "./login.module.css";

// const Login = () => {
//   const router = useRouter();
//   const { login } = useStore((state) => ({
//     login: state.login,
//   }));

//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Pass a callback to handle routing after login
//       await login(credentials.username, credentials.password, (role) => {
//         if (role === "admin") {
//           router.push("/dashboard"); // Admin's route
//         } else if (role === "user") {
//           router.push("/sales"); // User's route
//         } 
//       });
//     } catch (err) {
//       setError("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <h2 className={styles.heading}>Login</h2>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={credentials.username}
//           onChange={handleChange}
//           className={styles.input}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={credentials.password}
//           onChange={handleChange}
//           className={styles.input}
//           required
//         />
//         <button type="submit" className={styles.button}>
//           Login
//         </button>
//         {error && <p className={styles.error}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;



"use client";

import { useState } from "react";
import useStore from "../../useStore/Store";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

const Login = () => {
  const router = useRouter();
  const { login } = useStore((state) => ({
    login: state.login,
  }));

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
    setError(null); // Clear any previous errors
    try {
      // Pass a callback to handle routing after login
      await login(credentials.username, credentials.password, (role) => {
        if (role === "admin") {
          router.push("/dashboard"); // Admin's route
        } else if (role === "user") {
          router.push("/sales"); // User's route
        } 
      });
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when login is complete
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
