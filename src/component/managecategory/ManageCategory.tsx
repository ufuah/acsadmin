import { useEffect } from 'react';
import useStore from '../../useStore/Store';

interface Category {
  id: string;
  name: string;
}

interface CategoryListProps {
  onSelect: (category: Category) => void;
}

const ManageCategory: React.FC<CategoryListProps> = ({ onSelect }) => {
  // Ensure the store returns typed categories
  const { categories, fetchCategories, deleteCategory } = useStore((state) => ({
    categories: state.categories as Category[],
    fetchCategories: state.fetchCategories,
    deleteCategory: state.deleteCategory
  }));

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Category List</h2>
      <ul>
        {categories.map((category: Category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => onSelect(category)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategory;
