'use client';

import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { university, toggleUniversity } = useTheme();
  const { user, isAuthenticated, signOut } = useAuth();
  
  const universityNames = {
    'umn': 'University of Minnesota',
    'uw-madison': 'University of Wisconsin-Madison'
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <h1>BookBay</h1>
          <span className={styles.subtitle}>{universityNames[university]}</span>
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Browse Books</Link>
          {isAuthenticated && (
            <>
              <Link href="/sell" className={styles.navLink}>Sell</Link>
              <Link href="/my-books" className={styles.navLink}>My Books</Link>
            </>
          )}
        </nav>
        
        <div className={styles.actions}>
          <button 
            onClick={toggleUniversity}
            className={`btn btn-secondary ${styles.themeToggle}`}
          >
            Switch to {university === 'umn' ? 'UW-Madison' : 'UMN'}
          </button>
          
          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <span className={styles.welcomeText}>Hi, {user?.name}</span>
              <button 
                onClick={signOut}
                className="btn btn-secondary"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/sign-in" className={`btn btn-primary ${styles.signInButton}`}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}