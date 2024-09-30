import { useEffect, useState } from 'react';

const UseStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue;
        } catch (error) {
            console.error('Error retrieving data from local storage:', error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error storing data in local storage:', error);
        }
    }, [key, value]);

    return [value, setValue];
};

export default UseStorage;
