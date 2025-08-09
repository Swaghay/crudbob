import { ConditionEnum } from '../types/textbook';

export function getConditionLabel(condition: ConditionEnum): string {
  switch (condition) {
    case ConditionEnum.New: return 'NEW';
    case ConditionEnum.LikeNew: return 'LIKE NEW';
    case ConditionEnum.Good: return 'GOOD';
    case ConditionEnum.Fair: return 'FAIR';
    case ConditionEnum.Poor: return 'POOR';
    default: return 'UNKNOWN';
  }
}