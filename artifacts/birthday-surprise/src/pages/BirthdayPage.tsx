import { useEffect } from 'react';
import BhavanikaExperience from '@/components/BhavanikaExperience';

export default function BirthdayPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <BhavanikaExperience />;
}
