"use client"


import React, { useState, useEffect } from "react";
import useLoad from "../../hooks/useLoad";
import styles from "./Management.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Management = () => {
  const {
    users,
    loading,
    fetchUsers,
    updateUser,
    deleteUser,
  } = useLoad();

  const [selectedUser, setSelectedUser] = useState(null); // User selected for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, [fetchUsers]);

  // Open modal for editing
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleEdit(user)}
                    title="Edit User"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className={styles.iconButton}
                    onClick={() =>
                      deleteUser(user.id, fetchUsers) // Refresh users after deletion
                    }
                    title="Delete User"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit User Modal */}
      {isModalOpen && selectedUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedData = {
                  username: e.target.username.value,
                  password: e.target.password.value,
                };
                updateUser(selectedUser.id, updatedData, () => {
                  fetchUsers(); // Refresh user list
                  setIsModalOpen(false); // Close modal
                });
              }}
            >
              <div className={styles.formGroup}>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  defaultValue={selectedUser.username}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;
