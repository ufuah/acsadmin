"use client"

import React, { useState } from "react";
import Styles from "./add.module.css";
import Image from "next/image";
import logo from '../../../public/logo.png';

interface FormData {
  productName: string;
  sku: string;
  quantity: string;
  supplier: string;
  purchaseDate: string;
  costPerUnit: string;
  expirationDate: string;
  img: File | null;
}

const AddStock: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    sku: "",
    quantity: "",
    supplier: "",
    purchaseDate: "",
    costPerUnit: "",
    expirationDate: "",
    img: null,
  });

  const products = [
    { value: "roofing_material", label: "Roofing Material" },
    { value: "water_collector", label: "Water Collector" },
    { value: "solar_panel", label: "Solar Panel" },
    { value: "building_material", label: "Building Material" },
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, productName: e.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, img: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit form logic here (e.g., API call)
    console.log(formData);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.contents}>
        <div className={Styles.thumbnail_pic}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="profilepicture"
          />
          <label htmlFor="profilepicture" className={Styles.profile_upload}>
            <Image
              src={
                formData.img
                  ? URL.createObjectURL(formData.img)
                  : logo
              }
              alt="Uploaded Image Preview"
              width={65}
              height={65}
              className={Styles.previewImage}
            />
          </label>
        </div>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <div className={Styles.formGroup}>
            <label>Product Name</label>
            <select
              name="productName"
              value={formData.productName}
              onChange={handleSelectChange}
              className={Styles.selectInput}
            >
              <option value="" disabled>
                Select a product
              </option>
              {products.map((product) => (
                <option key={product.value} value={product.value}>
                  {product.label}
                </option>
              ))}
            </select>
          </div>
          <div className={Styles.formGroup}>
            <label>SKU/ID</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              placeholder="Enter SKU or ID"
              className={Styles.input}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Quantity Added</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              className={Styles.input}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Supplier</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
              placeholder="Enter supplier name"
              className={Styles.input}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Purchase Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              className={Styles.input}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Cost Per Unit</label>
            <input
              type="number"
              name="costPerUnit"
              value={formData.costPerUnit}
              onChange={handleInputChange}
              placeholder="Enter cost per unit"
              className={Styles.input}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Expiration Date (if applicable)</label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              className={Styles.input}
            />
          </div>
          <button type="submit" className={Styles.upload_btn}>
            Add Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStock;
