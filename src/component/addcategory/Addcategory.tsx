'use client'

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import useStore from '../../useStore/Store';

interface Category {
  id?: string;
  name?: string;
}

interface AddCategoryProps {
  category?: Category | null; // Allow `null` here
  onSuccess: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ category, onSuccess }) => {
  const [name, setName] = useState<string>(category?.name || '');
  const { addCategory, updateCategory } = useStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { name };
    try {
      if (category?.id) {
        await updateCategory(category.id, data);
      } else {
        await addCategory(data);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (category) {
      setName(category.name || '');
    }
  }, [category]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Category Name"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default AddCategory;
