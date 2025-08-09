'use client';

import { useState, useMemo, useEffect } from 'react';
import { TextbookListing } from './types/textbook';
import { getConditionLabel } from './utils/textbookUtils';
import TextbookCard from './components/TextbookCard';
import SearchFilters, { FilterOptions } from './components/SearchFilters';
import styles from "./page.module.css";
import { getTextbooks } from './services/textbookServices'; 
import { TailSpin } from 'react-loader-spinner';

export default function Home() {
  const [textbooks, setTextbooks] = useState<TextbookListing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    condition: [],
    priceRange: [0, 300],
    course: ''
  });
  const [selectedTextbook, setSelectedTextbook] = useState<TextbookListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTextbooks()
      .then(data => {
        setTextbooks(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching textbooks:', err);
        setIsLoading(false);
      });
  }, []);

  const filteredTextbooks = useMemo(() => {
    return textbooks.filter(book => {
      const matchesSearch = searchQuery === '' || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.course_code.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCondition = filters.condition.length === 0 || 
        filters.condition.includes(getConditionLabel(book.condition));
      
      const matchesPrice = book.price >= filters.priceRange[0] && 
        book.price <= filters.priceRange[1];
      
      const matchesCourse = filters.course === '' ||
        book.course_code.toLowerCase().includes(filters.course.toLowerCase());
      
      return matchesSearch && matchesCondition && matchesPrice && matchesCourse;
    });
  }, [searchQuery, filters, textbooks]);

  if (selectedTextbook) {
    return (
      <div className={styles.container}>
        <div className={styles.bookDetail}>
          <button 
            onClick={() => setSelectedTextbook(null)}
            className="btn btn-secondary"
          >
            ← Back to Browse
          </button>
          
          <div className={styles.detailContent}>
            <div className={styles.detailImage}>
              <div className={styles.detailPlaceholder}>📚</div>
            </div>
            
            <div className={styles.detailInfo}>
              <h1>{selectedTextbook.title}</h1>
              <p className={styles.detailAuthor}>by {selectedTextbook.author}</p>
              <p className={styles.detailCourse}>{selectedTextbook.course_code}</p>
              <p className={styles.detailEdition}>{selectedTextbook.edition}</p>
              <p className={styles.detailISBN}>ISBN: {selectedTextbook.isbn}</p>
              
              <div className={styles.detailCondition}>
                Condition: <span className={styles.conditionBadge}>{getConditionLabel(selectedTextbook.condition)}</span>
              </div>
              
              <div className={styles.detailPrice}>${selectedTextbook.price}</div>
              
              <div className={styles.detailSeller}>
                <p><strong>Seller:</strong> {selectedTextbook.seller}</p>
              </div>
              
              <div className={styles.detailDescription}>
                <h3>Description</h3>
                <p>{selectedTextbook.description}</p>
              </div>
              
              <div className={styles.detailActions}>
                <button className="btn btn-primary">Contact Seller</button>
                <button className="btn btn-secondary">Add to Watchlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const loadingStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  if (isLoading) {
    return (
      <div style={loadingStyle}>
        <TailSpin /> 
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Find Your Perfect Textbook</h1>
        <p>Buy and sell textbooks with fellow students at your university</p>
      </div>
      
      <SearchFilters 
        onSearch={setSearchQuery}
        onFilterChange={setFilters}
      />
      
      <div className={styles.results}>
        <div className={styles.resultsHeader}>
          <h2>Available Textbooks</h2>
          <span className={styles.resultCount}>{filteredTextbooks.length} books found</span>
        </div>
        
        <div className={styles.textbookGrid}>
          {filteredTextbooks.map(textbook => (
            <TextbookCard 
              key={textbook.listing_id} 
              textbook={textbook}
              onClick={() => setSelectedTextbook(textbook)}
            />
          ))}
        </div>
        
        {filteredTextbooks.length === 0 && (
          <div className={styles.noResults}>
            <p>No textbooks found matching your criteria.</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
