"use client";

import { useState } from 'react';
import useStore from '../../useStore/Store';
import { useRouter } from 'next/navigation';
import styles from './Signup.module.css';

const Signup = () => {
  const { signup } = useStore();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user', // or 'user' based on your needs
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    router.push('/login'); // Redirect to the login page
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Create an Account</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
