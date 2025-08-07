import { Textbook } from '../data/textbooks';
import styles from './TextbookCard.module.css';

interface TextbookCardProps {
  textbook: Textbook;
  onClick?: () => void;
}

export default function TextbookCard({ textbook, onClick }: TextbookCardProps) {
  const conditionColors = {
    'new': 'var(--success)',
    'like-new': '#17a2b8',
    'good': 'var(--warning)',
    'fair': '#fd7e14',
    'poor': 'var(--error)'
  };

  return (
    <div className={`card ${styles.textbookCard}`} onClick={onClick}>
      <div className={styles.imageContainer}>
        <div className={styles.placeholder}>
          📚
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{textbook.title}</h3>
          <div 
            className={styles.condition}
            style={{ backgroundColor: conditionColors[textbook.condition] }}
          >
            {textbook.condition.replace('-', ' ').toUpperCase()}
          </div>
        </div>
        
        <p className={styles.author}>by {textbook.author}</p>
        <p className={styles.course}>{textbook.course}</p>
        <p className={styles.edition}>{textbook.edition}</p>
        
        <div className={styles.footer}>
          <div className={styles.price}>${textbook.price}</div>
          <div className={styles.seller}>Seller: {textbook.seller}</div>
        </div>
      </div>
    </div>
  );
}