import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import '../Styles/CategoryManager.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCategory = {
      categoryName,
      categoryDescription,
    };

    try {
      if (editingId) {
        await api.put(`/categories/update/${editingId}`, newCategory);
        toast.success('Category updated successfully!');
        setEditingId(null);
      } else {
        await api.post('/categories/create', newCategory);
        toast.success('Category created successfully!');
      }

      setCategoryName('');
      setCategoryDescription('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating/updating category:', error);
      toast.error('Failed to create/update category.');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this category?');
    if (confirmed) {
      try {
        await api.delete(`/categories/${id}`);
        toast.success('Category deleted successfully!');
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Failed to delete category.');
      }
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.categoryName);
    setCategoryDescription(category.categoryDescription);
    setEditingId(category.categoryId);
  };

  return (
    <div id="category-manager-container">
      <ToastContainer />
      <h1 className="category-title">Category Manager</h1>

      <form id="category-form" onSubmit={handleSubmit}>
        <div className="category-form-group">
          <label className="category-form-label">Category Name:</label>
          <input
            type="text"
            className="category-form-input"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="category-form-group">
          <label className="category-form-label">Category Description:</label>
          <textarea
            className="category-form-textarea"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          {editingId ? 'Update Category' : 'Create Category'}
        </button>
      </form>

      <h2 className="category-subtitle">All Job Categories</h2>
      <table id="category-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.categoryId}>
              <td>{index + 1}</td>
              <td>{category.categoryName}</td>
              <td>{category.categoryDescription}</td>
              <td>
                <div className="button-container">
                  <button className="edit-button" onClick={() => handleEdit(category)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(category.categoryId)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManager;
