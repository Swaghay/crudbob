'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Textbook } from '../data/textbooks';
import styles from './page.module.css';

export default function Sell() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    condition: 'good' as Textbook['condition'],
    course: '',
    seller: '',
    description: '',
    edition: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        title: '',
        author: '',
        isbn: '',
        price: '',
        condition: 'good',
        course: '',
        seller: '',
        description: '',
        edition: ''
      });
    }, 3000);
  };

  const isFormValid = formData.title && formData.author && formData.price && 
                     formData.course && formData.seller && formData.description;

  if (showSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✅</div>
          <h1>Textbook Listed Successfully!</h1>
          <p>Your textbook "{formData.title}" has been added to the marketplace.</p>
          <p>Students will be able to find and contact you about this book.</p>
          <div className={styles.successActions}>
            <Link href="/" className="btn btn-primary">Browse Books</Link>
            <Link href="/my-books" className="btn btn-secondary">View My Listings</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Sell Your Textbook</h1>
        <p>List your textbook and connect with students who need it</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h2>Book Information</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Book Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Introduction to Algorithms"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="e.g. Thomas H. Cormen"
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                placeholder="e.g. 978-0262033848"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="edition">Edition</label>
              <input
                type="text"
                id="edition"
                name="edition"
                value={formData.edition}
                onChange={handleInputChange}
                placeholder="e.g. 3rd Edition"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="course">Course Code *</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              placeholder="e.g. CSCI 5421, MATH 1271"
              required
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Listing Details</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price (USD) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="75"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="condition">Condition *</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                required
              >
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="seller">Your Name *</label>
            <input
              type="text"
              id="seller"
              name="seller"
              value={formData.seller}
              onChange={handleInputChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the condition, any highlighting, missing pages, etc."
              rows={4}
              required
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Listing Book...' : 'List My Book'}
          </button>
          <Link href="/" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}