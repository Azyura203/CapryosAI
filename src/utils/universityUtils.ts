import universityData from '../data/universities.json';
import { UniversityDataMap } from '../types/university';

const data = universityData as unknown as UniversityDataMap;

export function getUniversityKey(name: string): string {
  const mapping: { [key: string]: string } = {
    'Auston University Singapore': 'auston_singapore',
    'Auston College Myanmar': 'auston_myanmar',
    'Liverpool John Moores University': 'ljmu_partnership'
  };
  return mapping[name] || '';
}

export function getUniversityInfo(name: string) {
  const key = getUniversityKey(name);
  return data[key];
}