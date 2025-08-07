'use client';

import { useState } from 'react';
import styles from './SearchFilters.module.css';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  condition: string[];
  priceRange: [number, number];
  course: string;
}

export default function SearchFilters({ onSearch, onFilterChange }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [courseFilter, setCourseFilter] = useState('');

  const conditions = ['new', 'like-new', 'good', 'fair', 'poor'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleConditionChange = (condition: string) => {
    const updated = selectedConditions.includes(condition)
      ? selectedConditions.filter(c => c !== condition)
      : [...selectedConditions, condition];
    
    setSelectedConditions(updated);
    onFilterChange({
      condition: updated,
      priceRange,
      course: courseFilter
    });
  };

  const handlePriceChange = (index: number, value: number) => {
    const updated: [number, number] = [...priceRange];
    updated[index] = value;
    setPriceRange(updated);
    onFilterChange({
      condition: selectedConditions,
      priceRange: updated,
      course: courseFilter
    });
  };

  const handleCourseChange = (course: string) => {
    setCourseFilter(course);
    onFilterChange({
      condition: selectedConditions,
      priceRange,
      course
    });
  };

  return (
    <div className={styles.filters}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search textbooks, authors, courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      <div className={styles.filterSection}>
        <h3>Filters</h3>
        
        <div className={styles.filterGroup}>
          <label>Course Code</label>
          <input
            type="text"
            placeholder="e.g. CSCI 5421"
            value={courseFilter}
            onChange={(e) => handleCourseChange(e.target.value)}
            className={styles.courseInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Condition</label>
          <div className={styles.checkboxGroup}>
            {conditions.map(condition => (
              <label key={condition} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedConditions.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                />
                <span>{condition.replace('-', ' ').toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Price Range</label>
          <div className={styles.priceInputs}>
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, parseInt(e.target.value) || 0)}
              className={styles.priceInput}
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, parseInt(e.target.value) || 300)}
              className={styles.priceInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}