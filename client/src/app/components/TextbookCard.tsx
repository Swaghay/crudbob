import { TextbookListing, ConditionEnum } from '../types/textbook';
import { getConditionLabel } from '../utils/textbookUtils';
import styles from './TextbookCard.module.css';

interface TextbookCardProps {
  textbook: TextbookListing;
  onClick?: () => void;
}

function getConditionColor(condition: ConditionEnum): string {
  switch (condition) {
    case ConditionEnum.New: return 'var(--success)';
    case ConditionEnum.LikeNew: return '#17a2b8';
    case ConditionEnum.Good: return 'var(--warning)';
    case ConditionEnum.Fair: return '#fd7e14';
    case ConditionEnum.Poor: return 'var(--error)';
    default: return '#ccc';
  }
}

export default function TextbookCard({ textbook, onClick }: TextbookCardProps) {
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
            style={{ backgroundColor: getConditionColor(textbook.condition) }}
          >
            {getConditionLabel(textbook.condition)}
          </div>
        </div>
        
        <p className={styles.author}>by {textbook.author}</p>
        <p className={styles.course}>{textbook.course_code}</p>
        <p className={styles.edition}>{textbook.edition}</p>
        
        <div className={styles.footer}>
          <div className={styles.price}>${textbook.price}</div>
          <div className={styles.seller}>Seller: {textbook.seller}</div>
        </div>
      </div>
    </div>
  );
}