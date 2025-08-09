'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Textbook } from '../types/textbook';
import TextbookCard from '../components/TextbookCard';
import AuthGuard from '../components/AuthGuard';
import styles from './page.module.css';

// Simulate user's books (subset of dummy data)
const userBooks: Textbook[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0262033848',
    price: 75,
    condition: 'good',
    course: 'CSCI 5421',
    seller: 'Alex Johnson',
    description: 'Comprehensive introduction to algorithms. Great for computer science students.',
    edition: '3rd Edition'
  },
  {
    id: '3',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    isbn: '978-1285741550',
    price: 90,
    condition: 'good',
    course: 'MATH 1271',
    seller: 'Mike Rodriguez',
    description: 'Used for Calc I and II. Some highlighting but all pages present.',
    edition: '8th Edition'
  }
];

export default function MyBooks() {
  const [selectedBook, setSelectedBook] = useState<Textbook | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDeleteBook = (bookId: string) => {
    // In a real app, this would call an API to delete the book
    console.log('Deleting book:', bookId);
    setShowDeleteConfirm(null);
  };

  const handleEditBook = (book: Textbook) => {
    // In a real app, this would navigate to edit form
    console.log('Editing book:', book.id);
  };

  if (selectedBook) {
    return (
      <div className={styles.container}>
        <div className={styles.bookDetail}>
          <button 
            onClick={() => setSelectedBook(null)}
            className="btn btn-secondary"
          >
            ← Back to My Books
          </button>
          
          <div className={styles.detailContent}>
            <div className={styles.detailImage}>
              <div className={styles.detailPlaceholder}>📚</div>
            </div>
            
            <div className={styles.detailInfo}>
              <div className={styles.detailHeader}>
                <h1>{selectedBook.title}</h1>
                <div className={styles.listingStatus}>
                  <span className={styles.statusActive}>● Active Listing</span>
                </div>
              </div>
              
              <p className={styles.detailAuthor}>by {selectedBook.author}</p>
              <p className={styles.detailCourse}>{selectedBook.course}</p>
              <p className={styles.detailEdition}>{selectedBook.edition}</p>
              <p className={styles.detailISBN}>ISBN: {selectedBook.isbn}</p>
              
              <div className={styles.detailCondition}>
                Condition: <span className={styles.conditionBadge}>{selectedBook.condition.replace('-', ' ').toUpperCase()}</span>
              </div>
              
              <div className={styles.detailPrice}>${selectedBook.price}</div>
              
              <div className={styles.detailDescription}>
                <h3>Description</h3>
                <p>{selectedBook.description}</p>
              </div>
              
              <div className={styles.listingStats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Views</span>
                  <span className={styles.statValue}>23</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Inquiries</span>
                  <span className={styles.statValue}>3</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Days Listed</span>
                  <span className={styles.statValue}>5</span>
                </div>
              </div>
              
              <div className={styles.detailActions}>
                <button 
                  onClick={() => handleEditBook(selectedBook)} 
                  className="btn btn-primary"
                >
                  Edit Listing
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(selectedBook.id)}
                  className="btn btn-secondary"
                >
                  Delete Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>My Books</h1>
          <p>Manage your textbook listings</p>
        </div>
        <Link href="/sell" className="btn btn-primary">+ List New Book</Link>
      </div>

      {userBooks.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h2>No Books Listed Yet</h2>
          <p>Start selling your textbooks to connect with students who need them.</p>
          <Link href="/sell" className="btn btn-primary">List Your First Book</Link>
        </div>
      ) : (
        <>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3>Active Listings</h3>
              <div className={styles.statNumber}>{userBooks.length}</div>
            </div>
            <div className={styles.statCard}>
              <h3>Total Views</h3>
              <div className={styles.statNumber}>45</div>
            </div>
            <div className={styles.statCard}>
              <h3>Inquiries</h3>
              <div className={styles.statNumber}>7</div>
            </div>
            <div className={styles.statCard}>
              <h3>Books Sold</h3>
              <div className={styles.statNumber}>2</div>
            </div>
          </div>

          <div className={styles.booksSection}>
            <h2>Your Listings</h2>
            <div className={styles.booksGrid}>
              {userBooks.map(book => (
                <div key={book.id} className={styles.bookWrapper}>
                  <TextbookCard 
                    textbook={book}
                    onClick={() => setSelectedBook(book)}
                  />
                  <div className={styles.bookActions}>
                    <button 
                      onClick={() => handleEditBook(book)}
                      className="btn btn-secondary"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(book.id)}
                      className={`btn btn-secondary ${styles.deleteBtn}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {showDeleteConfirm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Delete Listing</h3>
            <p>Are you sure you want to delete this book listing? This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button 
                onClick={() => handleDeleteBook(showDeleteConfirm)}
                className="btn btn-primary"
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </AuthGuard>
  );
}