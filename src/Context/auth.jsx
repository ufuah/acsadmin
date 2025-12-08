

// Base URL for API requests
import { axiosInstance } from '../hooks/api/axios';

// Centralized error handling function
const handleError = (error) => {
    console.error("API Error:", error);
    return {
        success: false,
        message: error.response?.data?.message || 'An error occurred. Please try again.',
    };
};

// User login function
export const userLogin = async (inputs) => {
    try {
        const res = await axiosInstance.post(`/api/auth/login`, inputs, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        console.log("userLogin response:", JSON.stringify(res.data));
        return res.status === 200 
            ? { success: true, data: res.data } 
            : { success: false, message: res.data.message || 'Unexpected login issue. Please try again.' };
    } catch (error) {
        return handleError(error);
    }
};

// Store owner login function
export const storeOwnerLogin = async (inputs) => {
    try {
        const res = await axiosInstance.post(`/api/auth/login`, inputs, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        console.log("storeOwnerLogin response:", JSON.stringify(res.data));
        return res.status === 200 
            ? { success: true, data: res.data } 
            : { success: false, message: res.data.message || 'Unexpected login issue. Please try again.' };
    } catch (error) {
        return handleError(error);
    }
};

// Logistics login function
export const logisticsLogin = async (inputs) => {
    try {
        const res = await axiosInstance.post(`/api/auth/login`, inputs, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        console.log("logisticsLogin response:", JSON.stringify(res.data));
        return res.status === 200 
            ? { success: true, data: res.data } 
            : { success: false, message: res.data.message || 'Unexpected login issue. Please try again.' };
    } catch (error) {
        return handleError(error);
    }
};

// Function to add a new item, including image upload
export const addItem = async (itemData, onUploadProgress) => {
    const formData = new FormData();
    for (const key in itemData) {
        formData.append(key, itemData[key]);
    }

    try {
        const res = await axiosInstance.post(`/api/items/add`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress,
        });
        console.log("addItem response:", JSON.stringify(res.data));
        return res.status === 201 ? { success: true, data: res.data } : { success: false, message: res.data.message || 'Unexpected issue adding the item. Please try again.' };
    } catch (error) {
        return handleError(error);
    }
};

// Function to get all items
export const getAllItems = async () => {
    try {
        const res = await axiosInstance.get(`/api/items`);
        console.log("getAllItems response:", JSON.stringify(res.data));
        return res.status === 200 ? { success: true, data: res.data } : { success: false, message: res.data.message || 'Unexpected issue fetching items. Please try again.' };
    } catch (error) {
        return handleError(error);
    }
};

// Function to get an item by ID
export const getItemById = async (id) => {
    try {
        const res = await axiosInstance.get(`/api/items/${id}`);
        console.log("getItemById response:", JSON.stringify(res.data));
        return res.status === 200 ? { success: true, data: res.data } : { success: false, message: res.data.message || 'Unexpected issue fetching the item. Please try again.' };
    } catch (error) {
        return handleError(error);
    }
};

// Function to update an item by ID
export const updateItem = async (id, itemData) => {
    const formData = new FormData();
    for (const key in itemData) {
        formData.append(key, itemData[key]);
    }

    try {
        const res = await axiosInstance.put(`/api/items/update/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log("updateItem response:", JSON.stringify(res.data));
        return res.status === 200 ? { success: true, data: res.data } : { success: false, message: res.data.message || 'Unexpected issue updating the item. Please try again.' };
    } catch (error) {
        return handleError(error);
    }
};

// Function to delete an item by ID
export const deleteItem = async (id) => {
    try {
        const res = await axiosInstance.delete(`/api/items/delete/${id}`);
        console.log("deleteItem response:", JSON.stringify(res.data));
        return res.status === 200 ? { success: true, message: 'Item deleted successfully.' } : { success: false, message: res.data.message || 'Unexpected issue deleting the item. Please try again.' };
    } catch (error) {
        return handleError(error);
    }
};

// Function to validate user authentication
export const validateUser = async () => {
    try {
        const res = await axiosInstance.get(`/api/auth/auth_verify`);
        console.log("validateUser response:", JSON.stringify(res.data));
        return res.status === 200 ? { success: true, user: res.data.user } : { success: false, message: 'User not authenticated.' };
    } catch (error) {
        return handleError(error);
    }
};

