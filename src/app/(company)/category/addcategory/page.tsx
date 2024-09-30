"use client"

import Addcategory from '@/src/component/addcategory/Addcategory'
import Managecategory from '@/src/component/managecategory/ManageCategory';
import React, { useState } from 'react'

// Define the Category type
interface Category {
    id: string;
    name: string;
  }
  
  // Define Props for the page component if needed
  type Props = {
    id: string;
    name: string;
  };
  

const page = (props: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleCategorySelect = (category: Category) => {
      setSelectedCategory(category);
    };
  
    const handleCategoryUpdate = () => {
      setSelectedCategory(null);
    };
  
  return (
    <div>
        <Addcategory category={selectedCategory} onSuccess={handleCategoryUpdate}/>
        <Managecategory onSelect={handleCategorySelect}/>
    </div>
  )
}

export default page